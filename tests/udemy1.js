//import { Selector } from 'testcafe';
fixture(`Udemy Login Test`)
    .page('https://www.udemy.com');
    test('Login to Udemy with provided credentials', async t => {
       // const driver = await new Builder().forBrowser('chrome').build();
        try{
           // await driver.get('https://www.udemy.com')
            await t.maximizeWindow()
            await t.click('.ud-block-list-item-content')  
            await t.wait(5000)            
            await t.click('#udemy > div.ud-main-content-wrapper > div.ud-main-content > div > div > main > div > div > form > button')
            await t.wait(3000)
        }
        finally{
            //await driver.quit()
        }
    })

