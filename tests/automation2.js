import { Selector } from 'testcafe';
import * as XLSX from 'xlsx';
import fs from 'fs';  


const data = {
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
    phone: '1234567890',
    cardNumber: '50000010003333',
    cardCvc: '123',
    cardExpMonth: '12',
    cardExpYear: '2025'
};

// Helper function to read data from Excel
function readProductsFromExcel(filePath) {
    const workbook = XLSX.readFile(filePath);
    const sheet = workbook.Sheets[workbook.SheetNames[0]];
    return XLSX.utils.sheet_to_json(sheet);
}

// Helper function to write updated products to Excel
function writeProductsToExcel(filePath, products) {
    const worksheet = XLSX.utils.json_to_sheet(products);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, 'Products');
    XLSX.writeFile(workbook, filePath);
}

// Helper function to compare website products with Excel data
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

// Helper function for account creation
async function createAccount(t) {
    await t
        .click(Selector('a').withText('Signup / Login'))
        .typeText('#form > div > div > div:nth-child(3) > div > form > input[type=text]:nth-child(2)', data.firstName)
        .typeText('#form > div > div > div:nth-child(3) > div > form > input[type=email]:nth-child(3)', data.email)
        .click('#form > div > div > div:nth-child(3) > div > form > button')
        .wait(2000)
        .click('#id_gender2')
        .typeText('#password', data.password)
        .click('#days')
        .click('#days > option:nth-child(6)')
        .click('#months')
        .click('#months > option:nth-child(3)')
        .click('#years')
        .click('#years > option:nth-child(17)')
        .click('#newsletter')
        .click('#optin')
        .typeText('#first_name', data.firstName)
        .typeText('#last_name', data.lastName)
        .typeText('#company', data.company)
        .typeText('#address1', data.address1)
        .typeText('#address2', data.address2)
        .typeText('#state', data.state)
        .typeText('#city', data.city)
        .typeText('#zipcode', data.zipCode)
        .typeText('#mobile_number', data.phone)
        .click('#form > div > div > div > div.login-form > form > button');
    
    await t.expect(Selector('#form > div > div > div > h2 > b').innerText).contains('ACCOUNT CREATED!');
    await t.click('#form > div > div > div > div > a');
    console.log('Account created successfully!');
}

// Helper function to create an excel file
async function createexcelfile(t, websiteProducts) {
    const worksheet = XLSX.utils.json_to_sheet(websiteProducts);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, 'Products');

    // Define the file path
    const filePath = 'automationProducts2.xlsx';

    // Writing the workbook to a file
    XLSX.writeFile(workbook, filePath);
}

// Helper function to extract products from the website
async function extractProductsFromWebsite(t) {
    const productContainer = Selector('.productinfo');
    const productCount = await productContainer.count;
    const websiteProducts = [];

    for (let i = 0; i < productCount; i++) {
        const productName = await productContainer.nth(i).find('p').innerText;
        const productPrice = await productContainer.nth(i).find('h2').innerText;

        // Parse the price to extract the numeric value
        const price = parseFloat(productPrice.replace('Rs.', ''));

        // Store the product name and price in an array
        websiteProducts.push({ productName, price });
    }

    return websiteProducts;
}

// Add new products to the existing Excel file
function addNewProductsToExistingExcel(filePath) {
    // New products to add
    const newProducts = [
        { productName: 'shirts for women', price: 500 },
        { productName: 'shirts for men', price: 400 },
        { productName: 'Cargos', price: 800 },
        { productName: 'shirts for kids', price: 350 },
        { productName: 'Graphic tees', price: 200 }
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

fixture(`Automation Demo`).page(`https://automationexercise.com/`).skipJsErrors();

test('Excel and website Product Verification', async t => {
    // Step 1: Create an account
    await createAccount(t);

    // Step 2: Extract products from the website
    const websiteProducts = await extractProductsFromWebsite(t);
    console.log("Website Products: ", websiteProducts);

    // Step 3: Create an Excel file with website products
    await createexcelfile(t, websiteProducts);

    // Step 4: Path to the Excel file containing product data
    const filePath = 'automationProducts2.xlsx';

    // Step 5: Add new products to the existing Excel file
    addNewProductsToExistingExcel(filePath);

    // Step 6: Check if the file exists before reading
    if (fs.existsSync(filePath)) {
        const excelProducts = readProductsFromExcel(filePath);

        // Step 7: Compare the products from the website and Excel file
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
