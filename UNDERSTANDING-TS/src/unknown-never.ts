// Section 2: TypeScript Basics & Basic Types

// The "unknown" Type -->
let userInput: unknown;
let userName: string;

userInput = 5;
userInput = "Rosh";
// userName = userInput; // Type 'unknown' is NOT assignable to type 'string'
// So, we need an extra type check to be able to assign a unknown value to a value with a fixed type.
if (userInput === "string") {
  userName = userInput;
}
// So, "unknown" is better than "any".

// The "never" Type -->
function generateError(message: string, code: number): never {
  throw { message: message, errorCode: code };
}
const result = generateError("An error occured!", 500);

// This 'generateError' function does NOT just return "void".
// What it actually returns is "never".
// Because an error is thrown, this essentially crashes our script always.
// So, it does NOT produce a return value.

console.log(result); // Won't reach here. So, will NOT log anything to console.
