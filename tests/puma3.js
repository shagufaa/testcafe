import { Selector } from 'testcafe';

fixture('Starting TestCafe')
    .page('https://in.puma.com/in/en')
    .skipJsErrors();

test('Check pricing for products below Rs. 10999', async t => {
    const runningShoe = Selector("#image-1541975415305");
    await t.click(runningShoe);

    await t.wait(2000); // Wait for initial products to load

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

    // Count products priced below Rs. 10999
    let productsBelow10999Count = 0;

    for (let i = 0; i < currentProductCount; i++) {
        const product = products.nth(i);
        
        // Adjust the selector for the price based on the actual structure
        const priceElement = product.find('.whitespace-nowrap.override\\:opacity-100.text-base.font-bold');

        // Check if the price element exists
        const priceText = await priceElement.exists ? await priceElement.innerText : '0'; // Default to '0' if not found
        
        // Convert the price to a number
        const priceValue = parseFloat(priceText.replace(/[^0-9.]/g, '')); // Remove non-numeric characters

        // Check if the price is below ₹10,999
        if (priceValue < 10999) {
            productsBelow10999Count++;
        }
    }

    console.log(`Total Products below Rs. 10999: ${productsBelow10999Count}`);
});






// import { Selector } from 'testcafe';
 
// fixture('Starting TestCafe')
//     .page('https://in.puma.com/in/en')
//     .skipJsErrors();
 
// test('Check pricing for products below Rs. 10999', async t => {
//     const runningShoe = Selector("#editable-text-1541975415305");
//     await t.click(runningShoe);
 
//     await t.wait(2000); // Wait for products to load

//     let previousProductCount = 0;
//     let currentProductCount = 0;

//     do {
//         previousProductCount = currentProductCount;

//         // Scroll to the bottom of the page
//         await t.scrollIntoView(Selector('footer'));
//         await t.wait(3000); // Wait for more products to load

//         // Select individual products inside the list
//         const products = Selector('ul').withAttribute('id', 'product-list-items').find('li');
//         currentProductCount = await products.count;

//     } while (currentProductCount > previousProductCount); // Repeat until no more new products are loaded

//     console.log(`Total Products: ${currentProductCount}`);

//     let productsBelow10999Count = 0;

//     for (let i = 0; i < currentProductCount; i++) {
//         const product = products.nth(i);
//         const priceElement = product.find('.price'); // Adjust the selector for the price as needed

//         // Get the price text and convert it to a number
//         const priceText = await priceElement.innerText; // Get the price text
//         const priceValue = parseFloat(priceText.replace(/[^0-9.]/g, '')); // Remove non-numeric characters

//         // Check if the price is below ₹10,999
//         if (priceValue < 10999) {
//             productsBelow10999Count++;
//         }
//     }

//     console.log(`Total Products below Rs. 10999: ${productsBelow10999Count}`);
// });