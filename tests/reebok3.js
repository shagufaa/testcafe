import { Selector } from "testcafe";
import * as XLSX from 'xlsx';

fixture('Sorting')
.page('https://www.google.com/').skipJsErrors();
test('Finding second highest and third lowest item', async t => {
    await t.maximizeWindow();

    //searching for shoes
    const searchBoxText = Selector('#APjFqb');
    await t.typeText(searchBoxText, 'Shoes');

    //selecting the search option
    await t.pressKey('enter');

    //selecting the shopping link
    const shoppingLink = Selector('div').withAttribute('class', 'YmvwI').withText('Shopping');
    await t.click(shoppingLink);
    await t.wait(1000);

    //Opening the Drop down
    const openingDropDdown = Selector('.Yf5aUd');
    await t.click(openingDropDdown);
    //Selectig the low to high value
    const highToLow = Selector('div').withAttribute('class', 'YpcDnf OSrXXb').withText('Price – high to low');
    await t.click(highToLow);
 
    const allProducts = Selector('.kHxwFf')
    const allProductsName = Selector('.tAxDx')
    const allBrands = Selector('.aULzUe.IuHnof')
    const productCount = await allProducts.count
    const allProductsNamecount = await allProductsName.count
    const allBrandsCount = await allBrands.count
    const productArray = [];
 
    for (let i = 0; i < productCount; i++) {
        const productText = await allProducts.nth(i).innerText;
        const price = parseFloat((productText).replace('₹', '').replace(',', ''));
            const ProductsName = await allProductsName.nth(i).innerText;
            const brand = await allBrands.nth(i).innerText;
            const pair = { ProductsName, brand ,price }
            productArray.push(pair);
            }
 
 
    console.log(productArray);
    console.log("Second highest elemet is", productArray[1]);
    console.log("Second lowest element is", productArray[productArray.length - 2]);


    const worksheet = XLSX.utils.json_to_sheet(productArray);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, 'Products');

    // Define the file path (this may need to be adjusted based on your environment)
    const filePath = 'products.xlsx';

    // Writing the workbook to a file
    XLSX.writeFile(workbook, filePath);
 
});