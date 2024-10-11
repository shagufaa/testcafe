import { Selector } from 'testcafe';

fixture `Working with Testcafe`
    .page `https://devexpress.github.io/testcafe/example/`
    .before(async t => {
        //Test setup goes here
        //await runDatabaseRest()
        //await seedTestData()
    })
    .beforeEach(async t => {
        //Runs before each test
        await t.setTestSpeed(1)
        //await t.timeouts(0)

    })
    .after(async t => {
        //Cleaning the test data 
        //logging and sending data to monitoring system

    })
    .afterEach(async t => {
        //Runs after each test
    })

test('My first testcafe test', async t => {
    // await t.wait(3000)
    const name_input = Selector('#developer-name')
    const submit_button = Selector('#submit-button')
    const articleText = Selector('#article-header').innerText

    //await t.takeScreenshot({ fullPage: true })
    //await t.takeElementScreenshot(submit_button)
    await t.typeText(name_input, 'John')
    await t.click(submit_button)
    await t.expect(articleText).contains('John')
});

test.skip('My first testcafe test 1', async t => {
    // await t.wait(3000)
    const name_input = Selector('#developer-name')
    const submit_button = Selector('#submit-button')
    const articleText = Selector('#article-header').innerText

    //await t.takeScreenshot({ fullPage: true })
    //await t.takeElementScreenshot(submit_button)
    await t.typeText(name_input, 'John')
    await t.click(submit_button)
    await t.expect(articleText).contains('John')
});

test.skip('My first testcafe test 2', async t => {
    // await t.wait(3000)
    const name_input = Selector('#developer-name')
    const submit_button = Selector('#submit-button')
    const articleText = Selector('#article-header').innerText

    //await t.takeScreenshot({ fullPage: true })
    //await t.takeElementScreenshot(submit_button)
    await t.typeText(name_input, 'John')
    await t.click(submit_button)
    await t.expect(articleText).contains('John')
});
 