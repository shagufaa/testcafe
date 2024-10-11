// import { Selector } from 'testcafe';

// fixture (`Luma Website`).page `https://magento.softwaretestingboard.com/`;

// test ('Create an account', async t => {
//     //create an account
//     await t
//     .maximizeWindow()
//     .click('body > div.page-wrapper > header > div.panel.wrapper > div > ul > li:nth-child(3) > a')
//     .typeText('#firstname', 'John')
//     .typeText('#lastname', 'Doe')
//     .typeText('#email_address', 'jhndoe123@gmail.com')
//     .typeText('#password', 'john@123')
//     .typeText('#password-confirmation', 'john@123')
//     .click('#form-validate > div > div.primary > button > span')
//     .wait(2000);
//     let msg = Selector('#maincontent > div.page.messages > div:nth-child(2) > div > div > div').withText('Thank you for registering with Main Website Store.');
//     await t.expect(msg.innerText).contains('Thank you for registering with Main Website Store.');
//     console.log("Thank you for registering with Main Website Store.");
//     // console.log(await Selector('#maincontent > div.page.messages > div:nth-child(2) > div > div > div'));


//     //login
//     await t
//     .takeScreenshot()
//     .click('body > div.page-wrapper > header > div.panel.wrapper > div > ul > li.customer-welcome > span > button')
//     .wait(2000)
//     .click('body > div.page-wrapper > header > div.panel.wrapper > div > ul > li.customer-welcome.active > div > ul > li.authorization-link > a')
//     .wait(7000)
//     .click('body > div.page-wrapper > header > div.panel.wrapper > div > ul > li.authorization-link > a')
//     .typeText('#email', 'jhndoe123@gmail.com')
//     .typeText('#pass', 'john@123')
//     .click('#send2 > span');


//     //validating
//     await t
//     .click('body > div.page-wrapper > header > div.panel.wrapper > div > ul > li.customer-welcome > span > button')
//     .wait(2000)
//     .click('body > div.page-wrapper > header > div.panel.wrapper > div > ul > li.customer-welcome.active > div > ul > li.authorization-link > a')
//     .wait(7000)
//     .click('body > div.page-wrapper > header > div.panel.wrapper > div > ul > li.authorization-link > a')
//     .typeText('#email', 'jhndoe123@gmail.com')
//     .typeText('#pass', 'john123')
//     .click('#send2 > span');

//     // const errorMessage = Selector('#maincontent > div.page.messages > div:nth-child(2) > div > div > div');
//     // const errorMessageText = await errorMessage.innerText;

//     // await t
//     // .expect(errorMessage.exists).ok('Error message not found')
//     // .expect(errorMessageText).contains('The account sign-in was incorrect or your account is disabled temporarily. Please wait and try again later.');

//     let message = Selector('#maincontent > div.page.messages > div:nth-child(2) > div > div > div').withText('The account sign-in was incorrect or your account is disabled temporarily. Please wait and try again later.');
//     await t.expect(message.innerText).contains('The account sign-in was incorrect or your account is disabled temporarily. Please wait and try again later.');
//     console.log("The account sign-in was incorrect or your account is disabled temporarily. Please wait and try again later.");

// });


import { Selector } from "testcafe";
fixture("Getting started with ...").page('https://magento.softwaretestingboard.com/').skipJsErrors()
 
test('Registration',async t=>{
    await t.maximizeWindow()
    const createAccountBtn=Selector('a').withText('Create an Account');
    const firstname=Selector('#firstname');
    const lastname=Selector('#lastname');
    const email=Selector('#email_address');
    const password=Selector('#password');
    const confirmPassword=Selector('#password-confirmation');
    const submitBtn=Selector('.action.submit.primary');
    const registerValidation=Selector('#maincontent > div.page.messages > div:nth-child(2) > div > div > div').innerText;
   
 
    await t
    .click(createAccountBtn)
    .typeText(firstname,'Jane')
    .typeText(lastname,'Smith')
    .typeText(email,'janesmith1@gmail.com')
    .typeText(password,'jane@123')
    .typeText(confirmPassword,'jane@123');
    await t.scroll(0,400)
    .wait(3000)
    .click(submitBtn)
    .wait(5000)
    .takeScreenshot({fullPage:true})
    .expect(registerValidation).contains('Thank you for registering with Main Website Store.')
    .wait(5000)
   
 
})
 
test('sign in with Invalid Credentials',async t=>{
    const signinLink=Selector('a').withText('Sign In');
    const emailInput=Selector('#email')
    const password=Selector('#pass')
    const signinBtn=Selector('#send2');
    const expectedMsg=Selector('#maincontent > div.page.messages > div:nth-child(2) > div > div > div').innerText;
 
    await t
    .click(signinLink)
    .typeText(emailInput,"janesmith1@gmail.com")
    .typeText(password,'sgdy@123')
    .click(signinBtn)
    .wait(3000)
    .takeScreenshot({fullPage:true})
    .expect(expectedMsg).contains('The account sign-in was incorrect')
 
 
})
 
test('sign in with Valid Credentials',async t=>{
    const signinLink=Selector('a').withText('Sign In');
    const emailInput=Selector('#email')
    const password=Selector('#pass')
    const signinBtn=Selector('#send2');
    const user=Selector('span').withAttribute('class','logged-in').innerText
 
    await t
    .click(signinLink)
    .typeText(emailInput,"janesmith1@gmail.com")
    .typeText(password,'jane@123')
    .click(signinBtn)
    .wait(3000)
    .takeScreenshot({fullPage:true})
    .expect(user).contains('Welcome, Jane Smith!')
 
 
 
})