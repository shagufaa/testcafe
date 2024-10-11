import { Selector } from 'testcafe'

fixture `Send forgotten password test`
  .page `http://zero.webappsecurity.com/index.html`

test("User can request new password to be send to his email", async t => {
    const signInButton = Selector('#signIn_button')
    const linkToPassword = Selector('a').withText('Forgot your password ?')
    const emailInput = Selector('#user_email')
    const message = Selector('div')

    await t.click(signInButton)
    await t.click(linkToPassword)
    await t.typeText(emailInput, 'email@random.com', {paste: true})
    await t.pressKey('enter')

    await t.expect(message).contains('email@random.com')
    await t.expect(emailInput.exists).notOk()
})