import { Selector } from 'testcafe';

// Define the URL
const website = 'https://www.apple.com';

// Define the screen sizes
const devices = {
    desktop: { width: 1536, height: 430 },
    tablet: { width: 1099, height: 342 },
    mobile: { width: 400, height: 342 }
};

// Elements to check responsiveness
const navMenu = Selector('nav');
const mainBanner = Selector('section').withAttribute('class', 'hero-section');
const buyButton = Selector('a').withText('Buy');  // Example buy button

fixture(`Apple.com Responsiveness Test`)
    .page(website);

test('Check responsiveness for desktop, tablet, and mobile', async t => {
    // Test for Desktop
    await t
        .resizeWindow(devices.desktop.width, devices.desktop.height)
        .expect(navMenu.visible).ok('Navigation menu is not visible on desktop')
        .expect(mainBanner.exists).ok('Main banner is missing on desktop')
        .expect(buyButton.visible).ok('Buy button is not visible on desktop');

    // Test for Tablet
    await t
        .resizeWindow(devices.tablet.width, devices.tablet.height)
        .expect(navMenu.visible).ok('Navigation menu is not visible on tablet')
        .expect(mainBanner.exists).ok('Main banner is missing on tablet')
        .expect(buyButton.visible).ok('Buy button is not visible on tablet');

    // Test for Mobile
    await t
        .resizeWindow(devices.mobile.width, devices.mobile.height)
        .expect(navMenu.visible).ok('Navigation menu is not visible on mobile')
        .expect(mainBanner.exists).ok('Main banner is missing on mobile')
        .expect(buyButton.visible).ok('Buy button is not visible on mobile');
});
