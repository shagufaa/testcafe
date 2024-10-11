import { Selector } from 'testcafe';
fixture (`Google Shopping Search and Sort`)
   .page `https://www.google.com/shopping`;

test('Search for an item and sort by price from low to high', async t => {
    await t
        .typeText('#REsRA', 'shoes')
        .pressKey('enter');

        await t.maximizeWindow();
        const dropDownSelector = Selector('#ow15 > div > div');
        await t.click(dropDownSelector);
        
        const lowToHigh = Selector('#lb > div > g-menu > g-menu-item:nth-child(3) > div');
        await t.click(lowToHigh);

        await t.wait(3000);

        const countItem = Selector('.XrAfOe')
        const totalcount = await countItem.count;
        // let shoecount = 0;
        // for(let i=0; i<totalcount; i++)
        // {
        //     // const currentshoe = countItem.nth(i);
        //     shoecount++;
        // }
        console.log('Total number of shoes is : ', totalcount);

        await t.wait(5000);
});




















// import { Selector } from 'testCafe';
// fixture ('Sort validation').page('https://www.google.com/');
// test('Low to High Sort validation', async t =>{
//     //Type shoes in the Google search box
//     const searchBox = Selector('#APjFqb');
//     await t.typeText(searchBox,'Shoes');
//     //select the Google search button
//     const  searchButton = Selector('.gNO89b');
//     await t.click(searchButton);
//     //click on the shopping link
//     const  shoppingLink = Selector('.gNO89b');
//     await t.click(shoppingLink);
//     //Opening the drop down to select sort option
//     const  dropDownForSort = Selector('.gNO89b');
//     await t.click(dropDownForSort).find ('high to low');
   
// })