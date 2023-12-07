// Union Types -->
function combine(
  input1: number | string,
  input2: number | string,
  resultConversion: "as-number" | "as-text"
) {
  let result;
  // runtime checking for union types
  if (typeof input1 === "number" && typeof input2 === "number") {
    result = input1 + input2;
  } else {
    result = input1.toString() + input2.toString();
  }
  if (resultConversion === "as-number") {
    return +result;
  } else {
    return result.toString();
  }
}

const combinedAgesAsNum = combine(30, 26, "as-number");
console.log(combinedAgesAsNum); // 56
const combinedAgesAsText = combine(30, 26, "as-text");
console.log(combinedAgesAsText); // '56'

const combinedNames = combine("Max", "Anna", "as-text");
console.log(combinedNames); // 'MaxAnna'

const combinedStringAgesAsNum = combine("30", "26", "as-number");
console.log(combinedStringAgesAsNum); // 3026
const combinedStringAgesAsText = combine("30", "26", "as-text");
console.log(combinedStringAgesAsText); // '3026'

const combineMix = combine(30, "Rosh", "as-text");
console.log(combineMix); // '30Rosh'

// Literal Types (on top of union types) -->
/* 
Literal Types are used where you do NOT just say that a certain variable/parameter should hold number/string/etc, BUT you are very clear about the exact value it should hold.

In our 'combine' function above, we expect numbers or strings, and we combine them differently based on what we get. 
But we also want to allow the caller of the function to define 'how the result should be returned', so that we can basically force a conversion from number to string or vice versa.

So we defined a third parameter 'resultConversion' of type string, BUT defined it as a set of 'specific strings' so that any other will NOT be allowed.
    function combine(
        ... ,
        ... ,
        resultConversion: "as-number" | "as-text"
    ) { ... }
*/

// Type Aliases/Custom Types -->
/* 
When working with 'union types', it can be cumbersome to always repeat the union type.
You might want to create a new type which can be replaced with our union type.

FIX: You can create an alias, with 'type' keyword.
*/

type Combinable = number | string; // A re-usable type alias
type ConversionDescriptor = "as-number" | "as-text"; // Alias for literal types

function combine1(
  input1: Combinable,
  input2: Combinable,
  resultConversion: ConversionDescriptor
) {
  let result;
  // runtime checking for union types
  if (typeof input1 === "number" && typeof input2 === "number") {
    result = input1 + input2;
  } else {
    result = input1.toString() + input2.toString();
  }
  if (resultConversion === "as-number") {
    return +result;
  } else {
    return result.toString();
  }
}
// console.log(combine1(30, 26, "as-number"));

// Type Aliases and Object Types -->
/* 
Type aliases can be used to "create" your own types. You're not limited to storing union types though - you can also provide an alias to a (possibly complex) object type.

For example:
type User = { name: string; age: number };
const u1: User = { name: 'Max', age: 30 }; // this works!
This allows you to avoid unnecessary repetition and manage types centrally.

For example, you can simplify this code:
FROM:
function greet(user: { name: string; age: number }) {
  console.log('Hi, I am ' + user.name);
}

function isOlder(user: { name: string; age: number }, checkAge: number) {
  return checkAge > user.age;
}

To:
type User = { name: string; age: number };
 
function greet(user: User) {
  console.log('Hi, I am ' + user.name);
}
 
function isOlder(user: User, checkAge: number) {
  return checkAge > user.age;
}
*/
