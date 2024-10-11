import { Selector } from "testcafe";

const testData = [
    { 
        firstName: 'John', lastName: 'Doe', email: 'john.doe@example.com', 
        gender: 'Male', mobile: '9876132500', dob: '17 Sep 2001', 
        subject: 'Student', hobbies: ['Sports', 'Reading'], 
        filePath: 'C:\Users\salihaid\OneDrive - Capgemini\Pictures\Screenshots\a.png',
        address: 'Bangalore, India', state: 'NCR', city: 'Delhi'
    },
    { 
        firstName: 'Jane', lastName: 'Smith', email: 'jane.smith@example.com', 
        gender: 'Female', mobile: '9864290051', dob: '17 Jan 2001', 
        subject: 'Student', hobbies: ['Music', 'Sports'], 
        filePath: 'C:\Users\salihaid\OneDrive - Capgemini\Pictures\Screenshots\b.png',
        address: 'Delhi, India', state: 'Uttar Pradesh', city: 'Lucknow'
    }
];

testData.forEach(data => {
    fixture (`Demo QA Website`).page `https://demoqa.com/automation-practice-form`;
    test('Some Demo Examples', async t => {
        // await t.maximizeWindow();
        await t.typeText('#firstName', data.firstName);
        await t.typeText('#lastName', data.lastName);
        await t.typeText('#userEmail', data.email);
        const gender = Selector('#genterWrapper > div.col-md-3.col-sm-12').withAttribute('value', data.gender);
        await t.click(gender);
        await t.typeText('#userNumber', data.mobile);
        await t.typeText('#dateOfBirthInput', data.dob);
        await t.typeText('#subjectsContainer > div', data.subject);
        for (const hobby of data.hobbies) {
            const hobbySelector = Selector('#hobbiesWrapper').withText(hobby);
            await t.click(hobbySelector);
        }
        await t.setFilesToUpload('#uploadPicture', data.filePath);
        await t.typeText('', data.address);
        await t.click('#state > div > div.css-1wy0on6');
        await t.click('#state > div > div.css-1hwfws3');
        await t.click('#city');
        await t.click('#city > div > div.css-1hwfws3');
        await t.click('#submit');
        });
});