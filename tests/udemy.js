import { Selector } from 'testcafe';
const udemyLogin = 'https://www.udemy.com/join/login-popup/';

const emailInput = "form-group--1";
const passwordInput = Selector('input[name="password"]');
const loginButton = Selector('input[type="submit"]');

fixture(`Udemy Login Test`)
    .page(udemyLogin);

test('Login to Udemy with provided credentials', async t => {
    const username = 'shagufa.ali-haider@capgemini.com';  
    const pass = 'Udemy@123';                             
    
    await t
        .typeText(emailInput, username)                   
        .typeText(passwordInput, pass)                   
        .click(loginButton);                             

    // Optionally, verify successful login by checking for the user menu
    const loggedInUser = Selector('span[data-purpose="user-menu--toggle"]');
    await t.expect(loggedInUser.exists).ok('Login successful');
});
