// fixture(`API Testing test suite`);
// test('Get todos by id', async t => {
//     const resp = await t.request({
//         // url: 'https://jsonplaceholder.typicode.com/todos/1',
//         // url: 'https://catfact.ninja/',
//         url: 'https://catfact.ninja/#/Facts/getFacts',
//         method: 'GET'
//     });

//     console.log(resp);
//     // await t.expect(resp.status).eql(200);
//     // await t.expect(resp.body.title).eql('delectus aut autem');
// });




// import fetch from 'node-fetch';
import { Selector } from 'testcafe';
import https from 'https';

function getRandomName() {
    const names = ['John', 'Alice', 'Michael', 'Emma', 'Daniel', 'Sophia', 'Chris', 'Olivia', 'David', 'Liam'];
    return names[Math.floor(Math.random() * names.length)];
}


fixture (`Agify API Test`).page `https://agify.io/`;
test('Fetch the age from the Agify', async t => {
    const name = getRandomName();
    const response = await fetch(`https://api.agify.io?name=${name}`);
    const data = await response.json();
    console.log('Actual Age: ', data.age);
    const preage = 30;
    await t.expect(data.age).gt(preage);
    console.log(`Actual age for ${name} is greater than ${preage}`);
});