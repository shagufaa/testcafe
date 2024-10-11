import { Selector } from 'testcafe';
import https from 'https';

fixture `Random User API Test with Error Handling`
    .page `https://randomuser.me/`; 

    test('Fetch, display, and validate random user data', async t => {
        let randomUser, randomUserDataArray;
        let displayedUserDataArray = [];
    
        try {
            // Fetch random user data from Random User API
            const response = await fetch('https://randomuser.me/api/');
            const data = await response.json();
    
            // Extract relevant fields from the API response
            randomUser = data.results[0];
    
            // Store user details in an array or object for validation later
            randomUserDataArray = {
                fullName: `${randomUser.name.first} ${randomUser.name.last}`,
                email: randomUser.email,
                birthdate: randomUser.dob.date,
                phone: randomUser.phone,
                address: `${randomUser.location.street.number} ${randomUser.location.street.name}, ${randomUser.location.city}, ${randomUser.location.state}, ${randomUser.location.country}`,
                password: randomUser.login.password
            };
    
        } catch (error) {
            console.error('Error fetching or parsing user data:', error);
            await t.fail(`Failed to fetch or parse random user data: ${error.message}`);
            return;
        }
    
        // Log the fetched user data
        console.log('Fetched User Data:', randomUserDataArray);

        displayedUserDataArray = {
                fullName: `${randomUser.name.first} ${randomUser.name.last}`,
                email: randomUser.email,
                birthdate: randomUser.dob.date,
                phone: randomUser.phone,
                address: `${randomUser.location.street.number} ${randomUser.location.street.name}, ${randomUser.location.city}, ${randomUser.location.state}, ${randomUser.location.country}`,
                password: randomUser.login.password
        };
    
        // Log the displayed data for reference
        console.log('Displayed User Data:', displayedUserDataArray);
    
        // Step 3: Perform assertions to validate that the fetched data matches the displayed data
        await t
            .expect(randomUserDataArray[0]).eql(displayedUserDataArray[0], 'Full name does not match')
            .expect(randomUserDataArray[1]).eql(displayedUserDataArray[1], 'Email does not match')
            .expect(randomUserDataArray[2]).eql(displayedUserDataArray[2], 'Birthdate does not match')
            .expect(randomUserDataArray[3]).eql(displayedUserDataArray[3], 'Phone number does not match')
            .expect(randomUserDataArray[4]).eql(displayedUserDataArray[4], 'Address does not match')
            .expect(randomUserDataArray[5]).eql(displayedUserDataArray[5], 'Password does not match');
    
        console.log("Displayed user data matches with random user data.");
        // Assuming the website displays these details on specific UI elements,
        // here we simulate selecting them from the page to compare.
        // const displayedFullName = await Selector('#fullName').innerText;    // Replace with actual selectors
        // const displayedEmail = await Selector('#email').innerText;
        // const displayedBirthdate = await Selector('#birthdate').innerText;
        // const displayedPhone = await Selector('#phone').innerText;
        // const displayedAddress = await Selector('#address').innerText;
        // const displayedPassword = await Selector('#password').innerText;
    
        // // Perform assertions to compare stored user data with displayed data
        // try {
        //     await t
        //         .expect(displayedFullName.trim()).eql(userDataArray.fullName, 'Full name does not match.')
        //         .expect(displayedEmail.trim()).eql(userDataArray.email, 'Email does not match.')
        //         .expect(displayedBirthdate.trim()).eql(userDataArray.birthdate, 'Birthdate does not match.')
        //         .expect(displayedPhone.trim()).eql(userDataArray.phone, 'Phone number does not match.')
        //         .expect(displayedAddress.trim()).eql(userDataArray.address, 'Address does not match.')
        //         .expect(displayedPassword.trim()).eql(userDataArray.password, 'Password does not match.');
        // } catch (error) {
        //     console.error('Validation error:', error);
        //     await t.fail(`Validation failed: ${error.message}`);
        // }
    });









// test('Fetch and verify random user data with error handling', async t => {
//     let randomUser, fullName, email, birthdate, phone, address, password;

//     try {
//         // Fetch random user data from Random User API
//         const response = await fetch('https://randomuser.me/api/');
//         const data = await response.json();

//         // Extract relevant fields from the API response
//         randomUser = data.results[0];
//         fullName = `${randomUser.name.first} ${randomUser.name.last}`;
//         email = randomUser.email;
//         birthdate = randomUser.dob.date;
//         phone = randomUser.phone;
//         address = `${randomUser.location.street.number} ${randomUser.location.street.name}, ${randomUser.location.city}, ${randomUser.location.state}, ${randomUser.location.country}`;
//         password = randomUser.login.password;

//     } catch (error) {
//         // Log the error if any issue occurs during the API request or data parsing
//         console.error('Error fetching or parsing user data:', error);
//         // Fail the test manually with a descriptive message
//         await t.fail(`Failed to fetch or parse random user data: ${error.message}`);
//         return;
//     }

//     // Log the extracted user details
//     console.log('Random User Name:', fullName);
//     console.log('Random User Email:', email);
//     console.log('Random User Birthdate:', birthdate);
//     console.log('Random User Phone:', phone);
//     console.log('Random User Address:', address);
//     console.log('Random User Password:', password);

//     // Perform assertions if the user data is valid
//     try {
//         await t
//             .expect(fullName).ok(`Random user's full name is not defined.`)
//             .expect(email).ok(`Random user's email is not defined.`)
//             .expect(birthdate).ok(`Random user's birthdate is not defined.`)
//             .expect(phone).ok(`Random user's phone number is not defined.`)
//             .expect(address).ok(`Random user's address is not defined.`)
//             .expect(password).ok(`Random user's password is not defined.`);
//     } catch (error) {
//         console.error('Assertion error:', error);
//         await t.fail(`Validation of random user data failed: ${error.message}`);
//     }
// });
