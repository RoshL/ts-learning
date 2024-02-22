// Section 2: TypeScript Basics & Basic Types

console.log('Your code goes here...');

function add0(n1: number, n2: number, showResult: boolean, phrase: string) {
  // if(typeof n1 !== 'number'|| typeof n2 !== 'number'){
  //   throw new Error('Incorrect Input')
  // } // JS way of type checking
  const result = n1 + n2;
  if (showResult) console.log(phrase + result);
  else return n1 + n2;
}

const printResult = true;
const resultPhrase = 'Result is';

// TypeScript has a built-in feature called 'Type Inference'.
// e.g. TS understands that 'number1' will always be a type of 'number', because you initialize it with a number.
const number1 = 5; // understands as "const number1: 5"
const number2 = 2.8;
let number3 = 5; // understands as "let number3: number"
let number4: number;
// If creating an unassigned variable, then it's a good practice to tell TypeScript which type of value will eventually be stored in there.
number4 = 10; // understands as "let number4: number"
// number4 = "10"; // Error: Type 'string' is not assignable to type 'number'

add0(number1, number2, printResult, resultPhrase);
// const result = add1(number1, number2, printResult);
// console.log(result);
