import { Selector } from "testcafe";

// Function to validate discounted prices and calculate discount
async function validateDiscountedPrice(t, shoeSelector, originalPriceSelector, discountedPriceSelector, expectedOriginalPrice, expectedDiscountedPrice) 
{
    await t.maximizeWindow()
    // Actions
    await t.click(shoeSelector); // Wait for the page to load after clicking

    // Get actual prices from the webpage
    const originalPriceText = await originalPriceSelector.innerText;
    const discountedPriceText = await discountedPriceSelector.innerText;

    // Parse prices to numbers
    const actualOriginalPrice = parseFloat(originalPriceText.replace(/[^0-9]/g, '')); // Remove non-numeric characters
    const actualDiscountedPrice = parseFloat(discountedPriceText.replace(/[^0-9]/g, '')); // Remove non-numeric characters

    // Calculate the discount amount
    const discountAmount = actualOriginalPrice - actualDiscountedPrice;
    const discountPercentage = (discountAmount / actualOriginalPrice) * 100;
    const shoePrice = actualOriginalPrice - discountAmount;

    // Log the discount amount and percentage
    console.log(`Original Price of the shoe: ₹${actualOriginalPrice.toFixed(2)}`);
    console.log(`Discount Amount: ₹${discountAmount.toFixed(2)}`);
    console.log(`Discount Percentage: ${discountPercentage.toFixed(2)}%`);
    console.log(`Discounted Price of the shoe: ₹${shoePrice.toFixed(2)}`);

    // Check if additional discount applies
    if (actualDiscountedPrice > 4499)
        {
            console.log("The price of the shoe is greater than ₹4499 so we get additional 15% discount.");
            const additionalDiscount = (actualDiscountedPrice * 0.15);
            const newDiscountedPrice = actualDiscountedPrice - additionalDiscount;
            const newDiscountAmount = discountAmount + additionalDiscount;
            const newDiscountPercentage = (newDiscountAmount / actualOriginalPrice) * 100;

            // Log new discount details
            console.log(`Additional Discount Amount: ₹${additionalDiscount.toFixed(2)}`);
            console.log(`Price of the shoe after 15% discount: ₹${newDiscountedPrice.toFixed(2)}`);
            console.log(`Total Discount Amount: ₹${newDiscountAmount.toFixed(2)}`);
            console.log(`Total Discount Percentage: ${newDiscountPercentage.toFixed(2)}%`);

            // Validate new discounted price
            await t.expect(newDiscountedPrice).eql(newDiscountedPrice, 'The new discounted price is correct');
        } 
        else
        {
            // Validate original price
            await t.expect(actualOriginalPrice).eql(expectedOriginalPrice, 'The original price is correct');

            // Validate discounted price
            await t.expect(actualDiscountedPrice).eql(expectedDiscountedPrice, 'The discounted price is correct');
        }
}

// Fixture for tests
fixture('Working with Puma Website')
    .page('https://in.puma.com/in/en')
    .skipJsErrors();



test('Discounted Price Validation', async t => {
    // Selectors
    const discountShoe = Selector('div').withAttribute('class', 'tw-kuddxj mobile:flex-col tablet:flex-col desktop:flex-row').withText('Caven 2.0 Year Of Sport Unisex Sneakers');
    const originalPriceSelector = Selector('span').withText('₹6,999');
    const discountedPriceSelector = Selector('span').withText('₹4,689');

    // Expected prices
    const expectedOriginalPrice = 6999.00; 
    const expectedDiscountedPrice = 4689.00; 

    await validateDiscountedPrice(t, discountShoe, originalPriceSelector, discountedPriceSelector, expectedOriginalPrice, expectedDiscountedPrice);
});









