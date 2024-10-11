import { Selector } from 'testcafe';
import { ClientFunction } from 'testcafe';

const smoothScroll = ClientFunction(() => {
    window.scrollTo({ top: 2400, behavior: 'smooth' }); 
});

fixture (`Google Shopping - Buy Reebok Shoes`).page`https://www.google.com/`;

test('Buy the most expensive Reebok shoe and add to bag', async t => {
    await t
        .maximizeWindow()
        .typeText('#APjFqb', 'shoes')
        .pressKey('enter')
        .click('#hdtb-sc > div > div.qogDvd > div.crJ18e > div > div:nth-child(2) > a > div');
        // .click('#rcnt > div.ynJMRd > div > div > div:nth-child(5) > div.RhVG3d > div > div > div > span:nth-child(4) > div > a > span.nZbkuc')
        // .wait(2000);
    // await smoothScroll();
    // await t
    //     .wait(2000)
    //     .click('#rcnt > div.ynJMRd > div > div > div:nth-child(15) > div.RhVG3d > div > div > div > span:nth-child(6) > div > a > span.nZbkuc')
    //     .wait(2000);
    
    const brandFilter = Selector('a').withText('Reebok');
    await t.click(brandFilter);

    await t.click('#ow15 > div.CcNe6e > div');
    await t.wait(1000);
    await t.click('#lb > div > g-menu > g-menu-item:nth-child(4) > div');
    await t.wait(2000);

    const sellerFilter = Selector('span').withAttribute('title','SporTipTop')
    await t
    .click(sellerFilter);

    // await smoothScroll();
    // const reebok2 = Selector('#rcnt > div.ynJMRd > div > div > div:nth-child(16) > div.RhVG3d > div > div > div > span:nth-child(5) > div > a > span.lg3aE');
    // await t.click(reebok2);
    // const sellerFilterContainer = Selector('#rcnt > div.ynJMRd > div > div > div:nth-child(16) > div.RhVG3d'); // Replace with a higher-level container class
    // const reebokSeller = sellerFilterContainer.find('a').withText('Reebok'); // Find "Reebok" link inside the container
    // await t.click(reebokSeller);

    
    // const selectSeller = Selector('span.nZbkuc').withText('Reebok');
    // await t.click(selectSeller);
    // await t.wait(2000);

    // await t.click('#rso > div.sh-sr__shop-result-group.Qlx7of > div:nth-child(2) > div > div:nth-child(3) > div.i0X6df > div.sh-dgr__content > div.zLPF4b > span > div.sh-dgr__offer-content > div > a:nth-child(1)');
    // await t.wait(2000);











    // await smoothScroll();
    // const reebokSeller = Selector('#rcnt > div.ynJMRd > div > div > div:nth-child(15) > div.RhVG3d > div > div > div > span:nth-child(5) > div > a > span.lg3aE > span');
    // await t.click(reebokSeller);
    // await t.click('#rcnt > div.ynJMRd > div > div > div:nth-child(15) > div.RhVG3d > div > div > div > span:nth-child(6) > div > a > span.nZbkuc');
    // await t.wait(2000);
    // const element = Selector('span').withText('Reebok');
    // await t
    //     .expect(element.visible).ok('Element is not visible')
    //     .click(element);

    // const sellerFilter = Selector('#rcnt > div.ynJMRd > div > div > div:nth-child(16) > div.RhVG3d').withText('Reebok');
    //await t.expect(sellerFilter.exists).ok('Reebok seller filter does not exist');
    //await t.expect(sellerFilter.visible).ok('Reebok seller filter is not visible');
    // await t.click(sellerFilter);
    // await t.wait(2000);
    // await t.click(sellerFilter);
    // await t.wait(4000);

    // await t.click('#ow15 > div.CcNe6e > div');
    // await t.wait(2000);
    // await t.click('#lb > div > g-menu > g-menu-item.kH0Dhc.EpPYLd.GZnQqe.WtV5nd.CjiZvb > div');
    // await t.wait(2000);
});



































// import { Selector } from "testcafe";
// fixture('Starting Testcafe').page('https://www.google.com/').skipJsErrors();
// test('Reebok shoe selection', async t => {
//     //searching for shoes
//     const searchBoxText = Selector('#APjFqb');
//     await t.typeText(searchBoxText, 'Shoes');
//     //selecting the search option
//     const searchBoxclick = Selector('.gNO89b');
//     await t.click(searchBoxclick);
//         //selecting the shopping link
//     const shoppingLink = Selector('#hdtb-sc > div > div > div.crJ18e > div > div:nth-child(2) > a > div');
//     await t.click(shoppingLink);
//     await t.wait(1000);
//     //clicking the reebok brand
//     const brandFilter = Selector('a').withText('Reebok'); 
//     await t.click(brandFilter);
//     //Select Reebok selleer
//     const reebokSeller = Selector('#rcnt > div.ynJMRd > div > div > div:nth-child(15) > div.RhVG3d > div > div > div > span:nth-child(5) > div > a > span.lg3aE > span');
//     await t.click(reebokSeller);
//     //Opening the Drop down
//     const openingDropDdown = Selector('.Yf5aUd');
//     await t.click(openingDropDdown);
//     //Selectig the low to high value
//     const lowToHighSort = Selector('div').withAttribute('class', 'YpcDnf OSrXXb').withText('Price – high to low');
//     await t.click(lowToHighSort);
 
   
 
 
// });