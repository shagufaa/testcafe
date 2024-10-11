import { Selector } from "testcafe";
import { ClientFunction } from "testcafe";
fixture('Started Testcafe').page('https://teststore.automationtesting.co.uk/index.php')
 
const smoothScroll = ClientFunction(() => {
    window.scrollTo({ top: 300, behavior: 'smooth' });
});
 
test('Discount product validation', async t => {
    const clotherLink = Selector('#category-3 > a')
    await t.click(clotherLink);
    const menLink = Selector('#subcategories > ul > li:nth-child(1) > div.subcategory-image > a > picture > img')
    await t.click(menLink);
  //const inStockItem = Selector('#facet_input_13177_0');
 // #facet_input_13177_0
  //#facet_13177 > li > label > a
   
    await smoothScroll();
    //await t.expect(inStockItem.exists).ok();
    await t.navigateTo('#facet_93612 > li > label > a');
    //await t.expect(inStockItem.checked).ok();
 
 
});