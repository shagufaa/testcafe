import { Selector } from 'testcafe';

fixture (`Capgemini Talent Page - Edit Profile`).page `https://talent.capgemini.com/in`;

test('Search for Capgemini Employees', async t => {
    await t.maximizeWindow()        
    // await t.navigateTo("http://corporatedirectory.capgemini.com/MyDirectory/portals/std/index-portal.jsp?selresource=&resource=myDetails")
    await t.click("#editprofile > span > a")
    await t.wait(1000)

})

// test('Search for Capgemini Employees', async t => {
//     await t.maximizeWindow();
    
//     // Wait for the element to exist in the DOM
//     await t.expect(Selector('#editprofile > span > a').exists).ok({ timeout: 5000 });
    
//     await t.click("#editprofile > span > a");
// });
