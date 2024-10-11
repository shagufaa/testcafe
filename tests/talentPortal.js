import { Selector } from 'testcafe';

fixture (`Capgemini Talent Page - Timecard Submission`).page `https://talent.capgemini.com/in`;
test('Timecard submission for next week', async t => {
    await t.navigateTo("https://global.replicon.com/!/saml2/Capgemini/sp-sso/post");
    await t.maximizeWindow();
    await t.wait(2000);
    await t.click("#timesheet-card > timesheet-card > div > article > current-timesheet-card-item > div > h3 > button > span.mdc-button__ripple");
    await t.wait(2000);
    const lastCheckBox = Selector('#jqg_grid_1');
    await t.click(lastCheckBox);
    await t.wait(2000);
    await t.click('#grid_wrapperrowheader1 > a');
    await t.wait(2000);
    await t.navigateTo("/Capgemini/my/TimeOff/calendar")
    await t.wait(2000);
    await t.click('#tabContainer > div.tabHead > div > a')
    await t.wait(2000);
    await t.click('#navigationPageBody > div.scrollContainer > div > div > a')
    await t.wait(2000)
    await t.click('#myBookingtab > a')
    await t.wait(2000)
})