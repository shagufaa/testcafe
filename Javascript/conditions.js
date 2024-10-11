// let role = 'guest';
// switch (role)
// {
//     case 'guest':
//         console.log('Guest User');
//         break;

//     case 'moderator':
//         console.log('Moderator User');
//         break;

//     default:
//         console.log('Unknown User');
// }

// for-in
const person = {
    name: 'Mosh',
    age: 30
};
for (let key in person)
    console.log(key, person[key]);

const colors = ['red', 'green', 'blue'];

for (let index in colors)
    console.log(index, colors[index]);

// for-of
for (let c of colors)
    console.log(c);