// Section 2: TypeScript Basics & Basic Types

// Function Return Types and "void" -->
function addFn(n1: number, n2: number): number {
  return n1 + n2;
}
// However, it's good to let TypeScript do its job regarding type inference.
// You should NOT set the type explicitly, unless there is a specific reason to do so.

function printResult1(num: number): void {
  console.log('Result: ' + num);
}
printResult1(addFn(5, 12));
//      Result: 17
// Return type of printResult1 will always be 'void', even if we did NOT define it as above.

// Here, we're not returning anything. So, TypeScript inferres the type of 'printResult1' function as a special type, 'void'.

console.log(printResult1(addFn(5, 12)));
//      Result: 17
//      undefined

// 'undefined' is a valid type in TypeScript.
let someValue: undefined;
// BUT, functions are NOT allowed to return 'undefined'.
// So, you should use 'void' if the function returns nothing.

// Functions as Types -->
// 'Function Types' are types that describe a function regarding its parameters and the return value.

// In JavaScript, we can assign functions to a variable like this.
// let combineValues;
// combineValues = add;
// console.log(combineValues(8, 8)); // 16

// let combineValues;
// combineValues = add;
// combineValues = 5; // Will cause 'TypeError: combineValues is not a function' if tried to execute
// console.log(combineValues(8, 8)); // TypeError: combineValues is not a function

/* 
- From TypeScript perspective, above code snippet has a problem, which is that 'combineValues' is type of 'any'.
- What if we try to assign something which is NOT a function to 'combineValues' as below?

combineValues = 5; 
console.log(combineValues(8, 8)); 

- This will cause 'TypeError: combineValues is not a function' at runtime, as we try to execute 'combineValues' as a function, when it actually is a 'number'.
- To avoid such errors, we need to be clear that 'combineValues' will ALWAYS hold a 'function'. 
*/

// FIX
// let combineValues: Function;
// combineValues = add;

// combineValues = 5; // Complains that type 'number' is not assignable to type 'Function' at compile time itself

// BUT, still we're allowed to assign 'another function'.
// combineValues = printResult1;
// console.log(combineValues(8, 8)); // undefined

// Result is 'undefined' because 'printResult1' function takes only ONE argument
// To FIX that, we've to be 'more precise' regarding how the function should look like that we want to store in combineValues.
// That's where 'function types' come into play.

// FIX with 'Function Types' -->
// 'Function Types' are types that describe a function regarding its parameters and the return value.

let combineValues: (a: number, b: number) => number;
combineValues = addFn;
console.log(combineValues(8, 8)); // 16

// combineValues = printResult1; // NOW it complains about this mismatch at compile time, just as we expect
//  --> Type '(num: number) => void' is not assignable to type '(a: number, b: number) => number'

// Function Types and Callbacks -->

function addAndHandle(n1: number, n2: number, cb: (num: number) => void) {
  const result = n1 + n2;
  cb(result);
}

addAndHandle(10, 20, (result) => {
  console.log(result); // 30
});
