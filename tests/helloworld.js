import { Selector } from 'testcafe';
 
fixture (`Hello World Fixture`)
    .page `https://example.com`;
 
test('Hello World Test', async t => {
    await t
        .expect(Selector('h1').innerText).eql('Example Domain');
});