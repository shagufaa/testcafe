
fixture('Action demo Test')
    .page('https://opensource-demo.orangehrmlive.com/web/index.php/auth/login');
 
    test('Testcafe Action ',async t=>{
                     
        await t.typeText('#app > div.orangehrm-login-layout > div > div.orangehrm-login-container > div > div.orangehrm-login-slot > div.orangehrm-login-form > form > div:nth-child(2) > div > div:nth-child(2) > input','Admin')
        await t.typeText('.oxd-input.oxd-input--active','admin123')
        await t.click('.oxd-button.oxd-button--medium.oxd-button--main.orangehrm-login-button')
        await t.wait(3000)
    })
 
 