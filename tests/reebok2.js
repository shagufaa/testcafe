import { Selector } from "testcafe";
fixture("Getting started with ...").page("https://www.google.com/").skipJsErrors()
 
test("Shopping", async t=>{
    const shoppingLink=Selector(".YmvwI").nth(1);
    const HighToLowPrice=Selector(".YpcDnf.OSrXXb").withText("Price – high to low");
    const brand=Selector('span').withAttribute('title','Reebok');
    let sizeDropdown=Selector('div').withText('Size');
    let size=Selector('li').withAttribute('name','7');
   
    await t
    .maximizeWindow()
    .typeText("#APjFqb","shoes")
    .pressKey("ENTER")
 
    //selecting shopping
    .wait(3000)
    .click(shoppingLink)
 
 
    await t.scroll(0,500)
    await t.click(brand)
    .wait(5000)
 
    .click(".Yf5aUd")
 
    //selecting high to low
    .click(HighToLowPrice)
    .wait(3000)
    await t.scroll(0,2550);
 
    const sellerFilter = Selector('span').withAttribute('title','Tata CLiQ Fashion')
    await t
    .click(sellerFilter)
    .navigateTo('https://luxury.tatacliq.com/reebok-mens-floatride-energy-4-adventure-blue-running-shoes/p-mp000000019033377?srsltid=AfmBOoobD0mRL3dVvuzAX0qqpFGYCAnT5gEPAxipNnwH04fU_LSCeJKp5Tk')
    .wait(5000)
    let addtocart='#myProductDetailInner > div.pdp-module__pdpNwDtlsInnerCon.undefined.NaN > div > div.pdp-module__flxRowNopCol50.pdp-module__padLt10 > button'
    let cart=('#app > div > header > div > div > div > div.headerRight > ul > li.headRgtLinks.bagSec > a > span.icons1.headRgtBagIcon');
    let quantitydropdown=Selector('select').withAttribute('name','quantity');
    let quantity = Selector('option').withAttribute('value','3');
    let closebtn=Selector('.cart-module__crtBoxcloseAct');
    let message = Selector('h3').withText('Your bag is empty');
 
    await t.scroll(0,300)
    .click(addtocart)
    .click(cart)
    .click(quantitydropdown)
    .click(quantity)
    .wait(5000)
    .takeScreenshot({fullPage:true})
    .click(closebtn)
    .takeScreenshot({fullPage:true})
   await t.expect(message.innerText).contains('Your bag is empty')
   
   
 
   
 
 
   
});


