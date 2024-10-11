import { Selector } from 'testcafe';
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
    const searchBox = Selector('button').withAttribute('data-test-id','search-button-nav');
    const searchBox1 = Selector('input').withAttribute('type','search');

    // Assert search elements exist
    await t.expect(searchBox.exists).ok('Search button should exist');
    

    await t.click(searchBox);
    await t.typeText(searchBox1, 'cap');
    await t.wait(2000);
    await t.expect(searchBox1.exists).ok('Search input should exist');

    const productContainer = Selector('a').withAttribute('class', 'font-bold text-inherit cursor-pointer focus:ring-0 focus:text-inherit hover:bg-gradient-to-b from-current to-current bg-no-repeat tw-15tyb9d block hover:bg-none');
    const priceContainer = Selector('div').withAttribute('class', 'flex gap-2 flex-wrap');

    const productCount = await productContainer.count;
    
    // Assert at least one product is found
    await t.expect(productCount).gt(0, 'There should be at least one product found');

    const productArray = [];
    
    for (let i = 0; i < productCount; i++) {
        const productName = await productContainer.nth(i).find('span').innerText;
        const productDiscountedPrice = await priceContainer.nth(i).find('span').withAttribute('data-test-id', 'item-price').innerText.catch(() => '0');
        const productOriginalPrice  = await priceContainer.nth(i).find('span').withAttribute('data-test-id', 'item-price-base').innerText.catch(() => '0');


        // const Discountprice = parseFloat(productDiscountedPrice.replace('₹', '').replace(',', ''));
        // const Originalprice = parseFloat(productOriginalPrice.replace('₹', '').replace(',', ''));
        const Discountprice = productDiscountedPrice ? parseFloat(productDiscountedPrice.replace('₹', '').replace(',', '')) : 0;
        const Originalprice = productOriginalPrice ? parseFloat(productOriginalPrice.replace('₹', '').replace(',', '')) : Discountprice;

        // Check if original and discounted prices exist
        if (!productDiscountedPrice || !productOriginalPrice) {
            console.warn(`Skipping product ${productName}: Missing price information.`);
            continue;  // Skip this product if price information is missing
        }


        // Assert price parsing
        await t.expect(isNaN(Discountprice)).notOk('Discounted price should be a valid number');
        await t.expect(isNaN(Originalprice)).notOk('Original price should be a valid number');

        const discountPercentage = calculateDiscount(Discountprice, Originalprice);

        const pair = {
            productName,
            Discountprice,
            Originalprice,
            discountPercentage: discountPercentage + "%"
        };

        productArray.push(pair);
    }

    console.log(productArray);

    // const productsWithDiscount = productArray.filter(product => parseFloat(product.discountPercentage) >= 30);

    // console.log("Products with 30% or more discount:");
    // productsWithDiscount.forEach(product => {
    //     console.log(`Product: ${product.productName}, Discounted Price: ${product.Discountprice}, Original Price: ${product.Originalprice}, Discount: ${product.discountPercentage}`);
    // });

    const wb = xlsx.utils.book_new();
    const ws = xlsx.utils.json_to_sheet(productArray);
    xlsx.utils.book_append_sheet(wb, ws, 'Caps Data');

    const filePath = './PumaCapsData2.xlsx';
    xlsx.writeFile(wb, filePath);

    // Assert the file was written successfully
    await t.expect(fs.existsSync(filePath)).ok('Excel file should be written successfully');

    const workbook = xlsx.readFile(filePath);
    const worksheet = workbook.Sheets['Caps Data'];
    const excelData = xlsx.utils.sheet_to_json(worksheet);

    const productCountInExcel = excelData.length;

    // Assert the number of products matches
    await t.expect(productCountInExcel).eql(productCount, 'The number of products in Excel should match the website');

    const capsformen = Selector('a').withAttribute('data-test-id','search-term-list-item');
    await t.click(capsformen);
    await t.wait(2000);

    const products = Selector('ul').withAttribute('id', 'product-list-items').find('li');
    let previousProductCount = 0;
    let currentProductCount = 0;

    do {
        previousProductCount = currentProductCount;

        await t.scrollIntoView(Selector('footer'));
        await t.wait(3000);

        currentProductCount = await products.count;

        // Assert that more products are loaded after scrolling
        await t.expect(currentProductCount).gte(previousProductCount, 'More products should load when scrolling');
    } while (currentProductCount > previousProductCount);

    console.log(`Total Products: ${currentProductCount}`);
});
