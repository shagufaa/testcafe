// let radius = 1;
// let x = 1;
// let y = 1;

//OOPs
// const circle = {
//     radius: 1,
//     location: {
//         x: 1,
//         y: 1
//     },
//     isVisible: true,
//     draw: function() {
//         console.log('draw');
//     }
// };

// Factory function
// function createCircle(radius) {
//     return {
//         radius,
//         draw()
//         {
//             console.log('draw');
//         }
//     };
// }

// const circle1 = createCircle(1);
// console.log(circle1);


// Constructor Function
// function Circle(radius)
// {
//     this.radius = radius;
//     this.draw = function()
//     {
//         console.log('draw');
//     }
// }

// const circle = new Circle(2);
// console.log(circle);



//Cloning an Object
// const circle = {
//     radius: 1,
//     draw() {
//         console.log('draw');
//     }
// };

// const another = { ...circle };
// console.log(another);


//Exercise 1
// let address = {
//     street: 'a',
//     city: 'b',
//     zipCode: 'c'
// };

// function showAddress(address)
// {
//     for (let key in address)
//         console.log(key, address[key]);
// }
// showAddress(address);

//Exercise 2 (Factory and Constructor function)
let address = new Address('a', 'b', 'c');
console.log(address);

//Factory func
function createAddress(street, city, zipCode)
{
    return {
        street,
        city,
        zipCode
    };
}

//Constructor func
function Address(street, city, zipCode)
{
    this.street = street;
    this.city = city;
    this.zipCode = zipCode;
}