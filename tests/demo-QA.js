import { Selector } from 'testcafe';
import xlsx from 'xlsx';
//import path from 'path';

const loadTestData = () => {
    const workbook = xlsx.readFile('C:\\Users\\salihaid\\Downloads\\Testcafe\\tests\\StudentDetails.xlsx');
    const sheetName = workbook.SheetNames[0];
    const sheet = workbook.Sheets[sheetName];
    return xlsx.utils.sheet_to_json(sheet);
};

const testData = loadTestData('./StudentDetails.xlsx');

fixture `Form Automation`.page `https://demoqa.com/automation-practice-form`;

testData.forEach((data, index) => {
    test(`Form Submission Test - User ${index + 1}`, async t => {
        await t.maximizeWindow()
        //first name
        await t.typeText('#firstName', data['First Name']);

        //last name
        await t.typeText('#lastName', data['Last Name']);

        //email
        await t.typeText('#userEmail', data['Email']);

        //gender
        if (data['Gender'].toLowerCase() === 'male') {
            await t.click(Selector('label').withText('Male'));
        } else if (data['Gender'].toLowerCase() === 'female') {
            await t.click(Selector('label').withText('Female'));
        }
        else if (data['Gender'].toLowerCase() === 'other') {
            await t.click(Selector('label').withText('Other'));
        }

        //mobile no
        await t.typeText('#userNumber', data['Mobile No'].toString());

        //subject
        //const subject = Selector('#subjectsContainer > div').withText(data['Subject']);
        await t.typeText('#subjectsContainer > div', data['Subject']);
        //await t.click(Selector('label').withAttribute('for','#subjectsContainer > div'));

        await t.pressKey('enter');

        //hobbies
        const hobbies = data['Hobbies'].split(',').map(hobby => hobby.trim().toLowerCase());

        if (hobbies.includes('sports')) {
            await t.scrollIntoView(Selector('label').withText('Sports'));
            await t.click(Selector('label').withText('Sports'));
        }
        if (hobbies.includes('reading')) {
            await t.scrollIntoView(Selector('label').withText('Reading'));
            await t.click(Selector('label').withText('Reading'));
        }
        if (hobbies.includes('music')) {
            await t.scrollIntoView(Selector('label').withText('Music'));
            await t.click(Selector('label').withText('Music'));
        }

        //upload files
        // let fileUpload = path.resolve('.//tests//StudentDtails.xlsx');
        // await t.setFilesToUpload('#uploadPicture', fileUpload); 
        // const fileInput = Selector('#uploadPicture');
        // if(data.FileName) 
        // {
        //     await t.setFilesToUpload(fileInput, `./data/${data.FileName}`);
        // }
        // await t.setFilesToUpload(fileInput, data['File Name']);
        // const filePath = '"C:\Users\salihaid\OneDrive - Capgemini\Pictures\Screenshots\a.png"';
        // await t.setFilesToUpload('#uploadPicture', filePath);
        // await t.pressKey('enter');
        
        // const fileName = data['File Name'];
        // const filePath = "C:\Users\salihaid\OneDrive - Capgemini\Pictures\Screenshots\a.png";
        // if (fileName && existsSync(filePath)) {
        //     await t.setFilesToUpload('#uploadPicture', filePath);
        // } else {
        //     console.warn(`File not found or missing file name for User ${index + 1}: ${fileName}`);
        // }
        //const fileInput = Selector('#uploadPicture');
        //const fileUpload = path.resolve('C:\Users\salihaid\Downloads\Testcafe\tests\a.png');
        // await t.setFilesToUpload('#uploadPicture', 'C:\Users\salihaid\Downloads\Testcafe\tests\a.png');
        // await t.click('#upload-btn');


        //Address
        await t.typeText('#currentAddress', data['Address']);

        //city
        // await t.click('#state > div > div.css-1hwfws3');



        //submit
        await t.click('#submit');

        //success
        const successMessage = Selector('#example-modal-sizes-title-lg');
        const isSuccessVisible = await successMessage.exists;

        //screenshot
        await t.takeScreenshot(`screenshots/screenshot_${index + 1}.png`);

        // Assert submission was successful
        await t.expect(isSuccessVisible).ok(`Form submission failed for ${data['First Name']} ${data['Last Name']}`);
    })
});



