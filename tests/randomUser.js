import { Selector } from 'testcafe';
import https from 'https';

fixture (`Random User API Test`).page `https://randomuser.me/`;

test('Fetch random user data', async t => {
    const response = await fetch('https://randomuser.me/api/');
    const data = await response.json();

    const randomUser = data.results[0];
    const fullName = `${randomUser.name.first} ${randomUser.name.last}`;
    const email = randomUser.email;
    const birthdate = randomUser.dob.date;
    const address = `${randomUser.location.street.number} ${randomUser.location.street.name}, ${randomUser.location.city}, ${randomUser.location.state}, ${randomUser.location.country}`;
    const phone = randomUser.phone;
    const password = randomUser.login.password;
    

    console.log('Random User Name:', fullName);
    console.log('Random User Email:', email);
    console.log('Random User Birthdate:', birthdate);
    console.log('Random User Address:', address);
    console.log('Random User Phone:', phone);
    console.log('Random User Password:', password);

    await t
        .expect(fullName).ok(`Random user's full name is not defined.`)
        .expect(email).ok(`Random user's email is not defined.`)
        .expect(birthdate).ok(`Random user's birthdate is not defined.`)
        .expect(address).ok(`Random user's address is not defined.`)
        .expect(phone).ok(`Random user's phone number is not defined.`)
        .expect(password).ok(`Random user's password is not defined.`);
})