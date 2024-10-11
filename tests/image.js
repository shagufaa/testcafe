//visual-test.js

import { Selector } from 'testcafe';

//import { takeSnapshot } from 'testcafe-blink-diff';


fixture`Visual Testing`

    .page`https://google.com`;


test('Visual Testing Google Search Results Page', async t => {

    await t

        .maximizeWindow()

        .typeText('input[name="q"]', 'Browserstack')

        .click('input[type="submit"][value="Google Search"]')

        .expect(Selector('#result-stats').exists).ok({ timeout: 5000 });

        //await takeSnapshot(t, { label: 'google-result-stats',selector:[Selector('#result-stats')]} );

});