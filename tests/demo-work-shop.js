import { Selector } from 'testcafe';
import { ClientFunction } from 'testcafe';
fixture (`Demo Work Shop`).page `https://demowebshop.tricentis.com/`;

// const smoothScroll = ClientFunction(() => {
//     window.scrollTo({ top: 1000, behavior: 'smooth' }); 
// });

const scrollToBottom = ClientFunction(() => {
    window.scrollTo(0, document.body.scrollHeight);
});

const scrollToTop = ClientFunction(() => {
    window.scrollTo(0, 0);
});

test('Some Demo Examples', async t => {
    await t.maximizeWindow();
    await t.typeText('#small-searchterms', 'Health Book');
    await t.wait(1000);
    await t.pressKey('enter');
    await t.wait(1000);
    //await t.click('body > div.master-wrapper-page > div.master-wrapper-content > div.master-wrapper-main > div.center-2 > div > div.page-body > div.search-results > div.product-grid > div > div > div.details > h2 > a');
    //await t.click(1000);
    //await t.click('#add-to-wishlist-button-22')
    await t.click('body > div.master-wrapper-page > div.master-wrapper-content > div.master-wrapper-main > div.center-2 > div > div.page-body > div.search-results > div.product-grid > div > div > div.details > div.add-info > div.buttons > input');
    await t.wait(2000);
    const successMessage = Selector('#bar-notification > p');
    // await t.expect(successMessage.exists).ok('Product added to the cart');
    // await t.wait(2000);
    console.log('Product has been successfully added to the cart.');
    await t.click('body > div.master-wrapper-page > div.master-wrapper-content > div.master-wrapper-main > div.side-2 > div.block.block-category-navigation > div.listbox > ul > li:nth-child(2) > a');
    await t.wait(1000);
    await t.click('body > div.master-wrapper-page > div.master-wrapper-content > div.master-wrapper-main > div.center-2 > div.page.category-page > div.page-body > div.sub-category-grid > div:nth-child(1) > div > div > a > img');
    await t.wait(1000);
    await t.click('#products-orderby');
    await t.wait(1000);
    await t.click('#products-orderby > option:nth-child(3)');
    await t.wait(1000);
    await t.click("#products-viewmode");
    await t.wait(1000);
    await t.click("#products-viewmode > option:nth-child(2)");
    await t.wait(1000);
    await t.click('body > div.master-wrapper-page > div.master-wrapper-content > div.master-wrapper-main > div.center-2 > div.page.category-page > div.page-body > div.product-list > div:nth-child(3) > div > div.picture > a > img')
   // await t.click('body > div.master-wrapper-page > div.master-wrapper-content > div.master-wrapper-main > div.center-2 > div.page.category-page > div.page-body > div.product-grid > div:nth-child(3) > div > div.picture > a > img');
    await t.wait(1000);
    await t.click('#product-details-form > div > div.product-essential > div.overview > div.product-reviews-overview > div.product-review-links > a:nth-child(1)');
    await t.wait(1000);
    // await smoothScroll();
    await scrollToBottom();
    await t.wait(2000);
    await scrollToTop();
    await t.wait(1000);
    await t.typeText('#small-searchterms', '12345');
    await t.wait(1000);
    await t.pressKey('enter');
    await t.wait(1000);
    console.log('No products were found that matched your criteria.');
    await t.click('#topcartlink > a > span.cart-label');
    await t.wait(2000);
    await t.click('#termsofservice');
    await t.click('#checkout');
    await t.wait(1000);
    await t.click('body > div.master-wrapper-page > div.master-wrapper-content > div.master-wrapper-main > div.center-2 > div > div.page-body > div.customer-blocks > div.new-wrapper.checkout-as-guest-or-register-block > div.buttons > input.button-1.register-button');
    await t.wait(1000);
    await t.click('#gender-female');
    await t.typeText('#FirstName', 'Olivia');
    await t.typeText('#LastName', 'Blossom');
    await t.typeText('#Email', 'olivia20blossom@gmail.com');
    await t.typeText('#Password', 'abc123');
    await t.typeText('#ConfirmPassword', 'abc123');
    await t.click('#register-button');
    await t.wait(3000);
    console.log('Your registration completed');
    await t.click('body > div.master-wrapper-page > div.master-wrapper-content > div.header > div.header-links-wrapper > div.header-links > ul > li:nth-child(2) > a');
    await t.wait(1000);
    await t.click('body > div.master-wrapper-page > div.master-wrapper-content > div.header > div.header-links-wrapper > div.header-links > ul > li:nth-child(1) > a');
    await t.click('#gender-female');
    await t.typeText('#FirstName', 'Olivia');
    await t.typeText('#LastName', 'Blossom');
    await t.typeText('#Email', 'olivia20blossom@gmail.com');
    await t.typeText('#Password', 'abc123');
    await t.typeText('#ConfirmPassword', 'abc123');
    await t.click('#register-button');
    await t.wait(2000);
    console.log('The specified email already exists!');
    await t.typeText('#newsletter-email', 'olivia20blossom.com');
    await t.click('#newsletter-subscribe-block > div.buttons');
    console.log('Thank you for signing up! A verification email has been sent. We appreciate your interest.');
    await t.wait(2000);

})