import * as XLSX from 'xlsx';
import fs from 'fs';
import AccountPage from 'C:/Users/salihaid/Downloads/Testcafe/tests/pages/accountPage.js'; 
import ProductPage from 'C:/Users/salihaid/Downloads/Testcafe/tests/pages/productPage.js';


const users = [
    {
        firstName: 'Shagufa',
        lastName: 'Ali',
        email: `shagufaali${Math.floor(Math.random() * 1000)}@gmail.com`,
        company: 'Capgemini',
        password: 'Password123',
        address1: '123 Main St',
        address2: 'Bellandur',
        city: 'Bangalore',
        state: 'Karnataka',
        zipCode: '56001',
        phone: '1234567890'
    },
    {
        firstName: 'Haider',
        lastName: 'Ali',
        email: `haiderali${Math.floor(Math.random() * 1000)}@gmail.com`,
        company: 'Capgemini',
        password: 'Password123',
        address1: '456 Main St',
        address2: 'Bellandur',
        city: 'Bangalore',
        state: 'Karnataka',
        zipCode: '56001',
        phone: '0987654321'
    },
    
];


// Helper functions for Excel handling
function readProductsFromExcel(filePath) {
    const workbook = XLSX.readFile(filePath);
    const sheet = workbook.Sheets[workbook.SheetNames[0]];
    return XLSX.utils.sheet_to_json(sheet);
}

function writeProductsToExcel(filePath, products) {
    const worksheet = XLSX.utils.json_to_sheet(products);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, 'Products');
    XLSX.writeFile(workbook, filePath);
}

function compareProducts(websiteProducts, excelProducts) {
    const discrepancies = [];

    excelProducts.forEach((excelProduct) => {
        const matchingProduct = websiteProducts.find(
            (websiteProduct) => 
                websiteProduct.productName.trim() === excelProduct.productName.trim() && 
                websiteProduct.price === parseFloat(excelProduct.price)
        );
        
        if (!matchingProduct) {
            discrepancies.push({
                productName: excelProduct.productName,
                price: excelProduct.price
            });
        }
    });

    return discrepancies;
}

// Add new products to the existing Excel file
function addNewProductsToExistingExcel(filePath) {
    // New products to add
    const newProducts = [
        { productName: 'T-Shirts', price: 300 },
        { productName: 'Jackets', price: 1200 },
        { productName: 'Shoes', price: 800 }
    ];

    // Check if the Excel file exists and read the existing data
    let existingProducts = [];
    if (fs.existsSync(filePath)) {
        existingProducts = readProductsFromExcel(filePath);
    }

    // Combine existing products with new products
    const allProducts = existingProducts.concat(newProducts);

    // Write the updated product list back to the Excel file
    writeProductsToExcel(filePath, allProducts);
    console.log('New products added to Excel.');
}


// Define the tests
fixture(`Automation Demo`).page(`https://automationexercise.com/`).skipJsErrors();

users.forEach(user => {
    test(`Excel and website Product Verification for ${user.firstName}`, async t => {
        // Step 1: Create an account
        await AccountPage.createAccount(t, user);

        // Step 2: Extract products from the website
        const websiteProducts = await ProductPage.extractProductsFromWebsite(t);
        console.log("Website Products: ", websiteProducts);

        // Step 3: Create an Excel file with website products
        const filePath = 'automationProducts3.xlsx';
        writeProductsToExcel(filePath, websiteProducts);

        addNewProductsToExistingExcel(filePath);

        // Step 4: Check if the file exists before reading
        if (fs.existsSync(filePath)) {
            const excelProducts = readProductsFromExcel(filePath);

            // Step 5: Compare the number of products
            if (websiteProducts.length === excelProducts.length) {
                console.log(`Product count matches. Both Excel and Website have ${websiteProducts.length} products.`);
            } else {
                console.log(`Product count mismatch! Website has ${websiteProducts.length} products, while Excel has ${excelProducts.length} products.`);
            }

            // Step 6: Compare the products from the website and Excel file
            const discrepancies = compareProducts(websiteProducts, excelProducts);

            if (discrepancies.length > 0) {
                console.log('Discrepancies found:');
                discrepancies.forEach(discrepancy => {
                    console.log(`Product: ${discrepancy.productName}, Price: ${discrepancy.price} is not available on the website`);
                });
            } else {
                console.log('All products from Excel are available on the website.');
            }
        } else {
            console.log(`Excel file not found at path: ${filePath}`);
        }
    });
});

