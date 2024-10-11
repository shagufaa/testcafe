// Creating single-line strings
let first = "David";
let last = "Tucker";
let title = "Engineering";
title = 'CTO';

// Strings concatenation with the plus operator
let fullname = first + " " + last;

// String concatenation with template literals
fullname = `${first} ${last}`;
console.log(fullname);


// Creating multi-line strings with \n
let bio = "Line 1\nLine 2\nLine 3";
console.log(bio);

// Creating multi-line strings with backticks
bio = `About David Tucker:
He is the current CTO of Globomantics.`
console.log(bio);

// Escaping characters
let quote1 = "David said, \'JavaScript is great.'";
console.log(quote1);
let quote2 = `JS can use 'single' and "double" quotes.`;
console.log(quote2);
let quote3 = `In JS, you must escape the \\ character`;
console.log(quote3);


// String length
let length = quote1.length;
console.log(`Quote1 Length: ${length}`);


// Accessing specific characters
let secondChar = quote1[1];
console.log(secondChar);


// Changing case
console.log(fullname.toUpperCase());
console.log(fullname.toLowerCase());


//Finding a substring
let idx1 = fullname.indexOf("Dav");
console.log(`Index 1: ${idx1}`);
let idx2 = fullname.indexOf("ker");
console.log(`Index 2: ${idx2}`);
let idx3 = fullname.indexOf("xyz");
console.log(`Index 3: ${idx3}`);

// Does a string contain a substring
let doescontain = fullname.includes("Dav");
console.log(doescontain);