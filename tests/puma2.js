import { Selector } from "testcafe";
import xlsx from 'xlsx';
import fs from 'fs';


function calculateDiscount(discountedPrice, originalPrice)
{
    if (!discountedPrice || !originalPrice || originalPrice === discountedPrice) return 0;
        const discount = ((originalPrice - discountedPrice) / originalPrice) * 100;
        return discount.toFixed(2);
}


fixture('Working with Puma Website')
    .page('https://in.puma.com/in/en')
    .skipJsErrors();

    test('Search for caps', async t => {
        await t.maximizeWindow();
        const searchBox = Selector('button').withAttribute('data-test-id','search-button-nav')
        const searchBox1 = Selector('input').withAttribute('type','search')
        await t.click(searchBox)
        await t.typeText(searchBox1, 'cap')
        await t.wait(2000)

        // #\38 15 > div > div > div > span.whitespace-nowrap.text-base.text-puma-red.font-bold
        const productContainer = Selector('a').withAttribute('class', 'font-bold text-inherit cursor-pointer focus:ring-0 focus:text-inherit hover:bg-gradient-to-b from-current to-current bg-no-repeat tw-15tyb9d block hover:bg-none')
        const priceContainer = Selector('div').withAttribute('class', 'flex gap-2 flex-wrap');
        // const originalPrice = Selector('a').withAttribute('class', 'whitespace-nowrap text-base text-puma-red font-bold');
        // const discountedPrice = Selector('a').withAttribute('class', 'whitespace-nowrap text-base line-through opacity-50');
        const productCount = await productContainer.count;
        
        const productArray = [];
        
        for (let i = 0; i < productCount; i++) {
        // Extract product name and price for each product
        const productName = await productContainer.nth(i).find('span').innerText;
        const productDiscountedPrice = await priceContainer.nth(i).find('span').withAttribute('data-test-id', 'item-price').innerText.catch(() => '');
        const productOriginalPrice  = await priceContainer.nth(i).find('span').withAttribute('data-test-id', 'item-price-base').innerText.catch(() => '');
        // const productOriginalPrice = await productContainer.nth(i).find('span').withAttribute('data-test-id', 'item-price').innerText;
        // const productDiscountedPrice = await productContainer.nth(i).find('span').withAttribute('data-test-id', 'item-price-base').innerText;

        // Parse the price to extract the numeric value
        const Discountprice = parseFloat(productDiscountedPrice.replace('₹', '').replace(',', ''));
        const Originalprice = parseFloat(productOriginalPrice.replace('₹', '').replace(',', ''));

        // Calculate discount percentage
        const discountPercentage = calculateDiscount(Discountprice, Originalprice);

        const pair = {
            productName,
            Discountprice,
            Originalprice,
            discountPercentage: discountPercentage + "%" 
        };
        

        // Store the product name and price in an array
        productArray.push(pair);
    }

    console.log(productArray);

    // Create a new Excel workbook and worksheet
    const wb = xlsx.utils.book_new();
    const ws = xlsx.utils.json_to_sheet(productArray);

    // Append worksheet to workbook
    xlsx.utils.book_append_sheet(wb, ws, 'Caps Data');

    // Write to file
    const filePath = './PumaCapsData.xlsx';
    xlsx.writeFile(wb, filePath);

    // Verify that the file is written
    if (fs.existsSync(filePath)) {
        console.log('Excel file successfully written!');
    } else {
        console.log('Failed to write the Excel file.');
    }

    // Read the Excel file to validate the number of products
    const workbook = xlsx.readFile(filePath);
    const worksheet = workbook.Sheets['Caps Data'];
    const excelData = xlsx.utils.sheet_to_json(worksheet);

    // Compare the number of products
    const productCountInExcel = excelData.length; // Count the number of rows in Excel (each row is a product)
    console.log(`Number of products found in website: ${productCount}`);
    console.log(`Number of products in Excel: ${productCountInExcel}`);

    if (productCount === productCountInExcel) {
        console.log('Validation successful: The number of products in the Excel file matches the website.');
    } else {
        console.log('Validation failed: The number of products in the Excel file does not match the website.');
    }


    const capsformen = Selector('a').withAttribute('data-test-id','search-term-list-item')
    await t.click(capsformen)
    await t.wait(2000)

    // Define the products selector
    const products = Selector('ul').withAttribute('id', 'product-list-items').find('li');

    let previousProductCount = 0;
    let currentProductCount = 0;

    // Scroll to the bottom of the page multiple times to load all products
    do {
        previousProductCount = currentProductCount;

        // Scroll to the bottom of the page
        await t.scrollIntoView(Selector('footer'));
        await t.wait(3000); // Wait for more products to load

        currentProductCount = await products.count;

    } while (currentProductCount > previousProductCount); // Repeat until no more new products are loaded

    console.log(`Total Products: ${currentProductCount}`);

    //Special Character present in name
    // for (let i = 0; i < productCount; i++) {
    //     const productName = await productContainer.nth(i).find('span').innerText;
    //     if (/[^a-zA-Z0-9\s]/.test(productName)) {
    //         console.log(`Special character detected in product name at index ${i}: ${productName}`);
    //     }
    // }


    

    })




