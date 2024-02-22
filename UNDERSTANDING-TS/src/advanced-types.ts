// Section 6: Advanced Types

/* Advanced Typing Concepts; 
1. Intersection Types
2. Type Guards
3. Discriminated Unions
4. Type Casting
5. Function Overloads
*/

// Intersection Types (#083)
// Allow us to combine other types.
// Intersection operator can be used with any types and it simply builds the intercection of them.
// In case of 'Union Types', the interception is basically the 'types they have in common'.
// In the case of 'Object Types', it's simply the 'combination of all the object properties'.

// For Object Types
type Admin = {
  name: string;
  privileges: string[];
};

type Employee = {
  name: string;
  startDate: Date;
};

// Intersecting Types
type ElevatedEmployee = Admin & Employee;

const e1: ElevatedEmployee = {
  // It's a MUST to have all three properties in this object.
  name: 'Max',
  privileges: ['create-server'],
  startDate: new Date(),
};

// For Union Types
type Combinable = string | number;
type Numeric = number | boolean;
// Let's intersect Combinable & Numeric types
type Universal = Combinable & Numeric; // Now, TypeScript inferrs the type of 'Universal' is type of 'number'.

// More on Type Guards (#084)
/*
'Type Guards' help us with 'union types', to know which exact type you're getting at runtime.

They allows us to utilize the flexibility 'union types' give us, and still 'ensure' that our code runs correctly at runtime. 
*/

// Type Guard 1 :- 'typeof' operator from JS

function addV1(a: Combinable, b: Combinable) {
  //   return a + b; //Error:- Operator '+' cannot be applied to types 'Combinable' and 'Combinable'

  // Type guard ('typeof')
  if (typeof a === 'string' || typeof b === 'string') {
    return a.toString() + b.toString();
  }
  return a + b;
}

// Type Guard 2 :- 'in' operator from JS
type UnknownEmployee = Employee | Admin;

function printEmployeeInformation(emp: UnknownEmployee) {
  console.log('Name: ' + emp.name);

  //   console.log('Privileges: ' + emp.privileges); // Error:- Property 'privileges' does not exist on type 'UnknownEmployee'

  // Fix :- Type guard('in') for 'emp.privileges'
  if ('privileges' in emp) {
    console.log('Privileges: ' + emp.privileges);
  }

  if ('startDate' in emp) {
    console.log('Start Date: ' + emp.startDate);
  }
}

printEmployeeInformation(e1);
/*
Name: Max
Privileges: create-server
Start Date: Sat Feb 17 2024 23:45:14 GMT+0530 (India Standard Time)
*/

printEmployeeInformation({ name: 'Rosh', startDate: new Date() }); // Let's create an object on the fly which does NOT have 'privileges' field.
/*
Name: Rosh
Start Date: Sat Feb 17 2024 23:45:14 GMT+0530 (India Standard Time)
*/

// Type guard 3 :- 'instanceof' operator from JS (only applicable for classes)
class Car {
  drive() {
    console.log('Driving...');
  }
}

class Truck {
  drive() {
    console.log('Driving...');
  }

  loadCargo(amount: number) {
    console.log('Loading cargo... ' + amount);
  }
}

type Vehicle = Car | Truck;

const v1 = new Car();
const v2 = new Truck();

function useVehicle(vehicle: Vehicle) {
  vehicle.drive();

  //   if ('loadCargo' in vehicle) {
  //     vehicle.loadCargo(1000);
  //   }
  // ... An alternative way(more elegant) --> using 'instanceof'
  if (vehicle instanceof Truck) {
    vehicle.loadCargo(1000);
  }
}

useVehicle(v1); // Driving...
useVehicle(v2);
/*
Driving...
Loading cargo... 1000 */

/* In conclusion, "Type Guards" is just a term that describes the idea/approach of checking if a certain property/method exists at compile time, before you try to use it. 

With "Type Guards", you can have the flexibility 'union types' give you and still write code that does one thing or the other based on the exact type you're getting at runtime.
*/

// Comparison : "ElevatedEmployee" Vs "UnknownEmployee"
//
// type ElevatedEmployee = Admin & Employee;
// type UnknownEmployee = Employee | Admin;

const e2: UnknownEmployee = {
  // Unlike 'ElevatedEmployee' type, here it's NOT required to have all three properties in this object.
  name: 'Rosh',
  // privileges: ['create-server'],
  startDate: new Date(),
};

const e3: UnknownEmployee = {
  // Yet, you CAN have all three properties if you really want.
  name: 'Lakmali',
  privileges: ['create-server'],
  startDate: new Date(),
};

console.log(e1); // {name: 'Max', privileges: Array(1), startDate: Sun Feb 18 2024 21:03:04 GMT+0530 (India Standard Time)}
console.log(e2); // {name: 'Rosh', startDate: Sun Feb 18 2024 21:03:30 GMT+0530 (India Standard Time)}

// Discriminated Unions (#085) -> A special type of 'type guards'
/*
It's a very useful pattern, which you can use when working with 'objects' and 'union types' that makes implementing 'type guards' easier.

* In moveAnimal function, it's NOT practical to check existance of every property in all classes/interfaces like this, when there are a number of properties to check.
    if ('flyingSpeed' in animal) {
        console.log('Moving at speed: ' + animal.flyingSpeed);
    }

* It also doesn't allow to use 'instanceof' operator since 'Bird' and 'Horse' are NOT classes, BUT interfaces.

Solution :- Giving an extra property(a "literal Type") to every interface(every object which should be part of the Union). e.g. 'kind', 'type'
    interface Horse {
      type: 'horse';
      runningSpeed: number;
    }

  This is NOT a value for a property named 'type', BUT a 'Literal Type', where 'type' MUST hold a 'string', which MUST be 'bird'.

  This a 'type assignment' where we narrow down the value that may be stored in 'type' property

  NOTE: Literal Types are used where you do NOT just say that a certain variable/parameter should hold number/string/etc, BUT you are very clear about the exact value it should hold.
*/
interface Bird {
  type: 'bird'; // An extra property --> A literal type
  flyingSpeed: number;
}

interface Horse {
  type: 'horse'; // An extra property --> A literal type
  runningSpeed: number;
}

type Animal = Bird | Horse;

function moveAnimal(animal: Animal) {
  // Not practical; Troublesome when there are a number of properties to check like this.
  //   if ('flyingSpeed' in animal) {
  //     console.log('Moving at speed: ' + animal.flyingSpeed);
  //   }

  // As a solution, we've given an extra common property named 'type' to every object that makes up our Union.
  // Then we work with that property we know that exists to check which type of objects we're working with.
  // It even works best with interfaces, because interface forces every object built based on that interface, to have this 'type' property.
  let speed;
  switch (animal.type) {
    case 'bird':
      speed = animal.flyingSpeed;
      break;
    case 'horse':
      speed = animal.runningSpeed;
  }
  console.log('Moving at speed: ' + speed);
}

moveAnimal({ type: 'bird', flyingSpeed: 10 }); // Moving at speed: 10

// Type Casting (#086)
/* 
Tells TypeScript that some value is of a specific type where TypeScript is not able to detect on its own.  
e.g. :- If we get access to something in DOM.
*/

// Let's say we have an empty paragraph in the DOM. <p></p>
// const paragraph = document.querySelector('p');
// For the time being, TS is able to infer the type of paragraph is "HTMLParagraphElement | null"

/* BUT, this changes if we select something else like this. 
    e.g. :- Our paragraph has an ID of "message-output". <p id="message-output"></p>
Now, we know that of course we assigned this ID to our paragraph, but TypeScript doesn't know.
TypeScript does NOT dive into our HTML files and analyze them.
*/
const paragraph = document.getElementById('message-output');
/* In this case, what TypeScript infers is that this is just of type "HTMLElement | null". It does NOT know which specific HTML element that is. 
Now, for a paragraph, that might not matter too much.

BUT what if we actually had an input here ❔ (instead of just a paragraph element)
    <input type="text" id="user-input" />
*/
const userInputElement0 = document.getElementById('user-input')!; // TypeScript does NOT know that here we reach out for an input element, But only knows that this is some HTML element.

// userInputElement0.value = 'Hi there!';
// Error : Property 'value' does not exist on type 'HTMLElement'
/* We get this error because this generic type, which basically any HTML element has as a type, does NOT support properties which are included only for 'specific' HTML elements. 

So, now we need to tell TypeScript that actually what we select here is of type "HTMLInputElement".
That's where 'Type Casting' comes into play.

There are 'TWO equivalent syntaxes' which we can use for 'Type Casting'.

Syntax 1: Angled Brackets
  Adding angled brackets in front of the thing/element which we wanna tell TypeScript the type of. Then between these brackets we mention the 'type' of the thing after the angled brackets like this.
  e.g. :-
      const userInputElement1 = <HTMLInputElement>(
        document.getElementById('user-input')!
      );  

NOTE:
  In React, you also have such an 'angled bracket syntax' inside of JavaScript or TypeScript files where you write JSX code in your React components. 
  In React, the angled brackets are NOT used to pass any information regarding the types you're using, BUT instead they are parsed by some build tools to know what you want to render on screen.
  To avoid clash with that JSX syntax, TypeScript provides an "alternative syntax" to this "angled bracket type casting".

Syntax 2: "as" Keyword
  Using "as" keyword followed by the type to which you wanna cast this. 
  This now tells TypeScript, that the expression in front of the "as" keyword, will yield a value of type mentioned after "as" keyword.
  e.g. :-
      const userInputElement2 = document.getElementById(
        'user-input'
      )! as HTMLInputElement;  
*/

// Syntax 1
const userInputElement1 = <HTMLInputElement>(
  document.getElementById('user-input')!
);

// Syntax 2
const userInputElement2 = document.getElementById(
  'user-input'
)! as HTMLInputElement;

/*
NOTE: We've used "!" to tell TypeScript that expression in front of it will never yield NULL.

Alternative to using "!" :- 
  When you're NOT sure that the expression will not return null, you can use "if" check. 
*/
// Using "if" check instead of "!"
const userInputElement3 = document.getElementById('user-input');

if (userInputElement3) {
  (userInputElement3 as HTMLInputElement).value = 'Hi there!';
}

// Index Properties (#087)
/* A feature that allows us to create objects which are more flexible regarding the properties they might hold.

Let's say you're writing an application where you're validating some user inputs, and depending on what the user enters there and which field that is, you might wanna store and eventually show different error messages. 

e.g. Email fields
  You wanna check whoever it is in the email, and if it is not, then you wanna add a proper error message to the error container(an interface).

  Objects going to constructed based on this error container(interface) should look something like this --> 
        {email: 'Not a valid email...!', username: 'Must start with a character...!'}

  The problem with that is, you do NOT know in advance which exact property names that are going to be there.
  But, this container is supposed to be a flexible container, so that it can be used in any form in our webpage. (different forms with different inputs abd different identifiers)

  So, it should NOT restrict you to just 'email + username' errors in our example.
  In addition, even though we might have just those two inputs, what if ONLY 'email' is invalid and NOT 'username' ❔ 
  Of course we could store NULL as a value for 'username' in this object, BUT what if the requirment is to completely OMIT 'username' without just assigning NULL ❔

  So, we need to have an object which ONLY holds properties for inputs where we actually have an error, so that we can loop through that object with a foreach loop to read all the errors we got.(Here we do NOT have any property which don't actually store an error)  I 

  In a nutshell, we need an object where it's pretty clear regarding the value types, BUT do NOT know how many properties we'll going to have, and the names of those properties.

  Solution :- Index Types
  */

interface ErrorContainer {
  [prop: string]: string; // Index types syntax
  /* 
  This tells TypeScript that, whatever objects we'll construct based on this ErrorContainer interface MUST have property 'Names' which can be interprited as 'Strings', and also the 'Values' of the properties also must be 'Strings'
  */

  // id: string; // Predefined properties
  /* 
  Apart from index typed properties, we still CAN have 'Predefined' properties as well, ONLY IF they're of the 'Same Type'(strings).
      id: number --> So this in NOT allowed.
      Error: Property 'id' of type 'number' is not assignable to 'string' index type 'string' */
}

const errorBag: ErrorContainer = {
  email: 'Not a valid email!',
  username: 'Must start with a capital character!',
};

// So, we've created an 'errorBag' with the help of 'ErrorContainer', which gives us this 'extra flexibility' that we do NOT need to know in advance 'which property names' we want to use, 'how many properties' we need.

// Function Overloads (#088)
/*
A feature that allows us to define multiple function signatures for one and the same function.
Allows us to have multiple possible ways of calling a function with different parameters, to do something inside of that function.

Let's get back to our 'addV1' function from lesson #084.
    type Combinable = string | number;

    function addV1(a: Combinable, b: Combinable) {  
      // Type guard ('typeof')
      if (typeof a === 'string' || typeof b === 'string') {
        return a.toString() + b.toString();
      }
      return a + b;
    }

In above 'addV1' function, TypeScript always infers its return type as 'Combinable' that it returns either string OR number ).
BUT, we know that if we "pass in two numbers" then the "type of the return value" will always be a "number". And if we pass in "at least one string" then the return type will also be a "string".

If we call 'addV1' function like this, can notice that 'result' is of type 'Combinable'.
*/
let result = addV1(1, 5); // Type infered by TypeScript -->  string | number
console.log(typeof result); // Actual return type --> number
/*
Consequence of this is that TypeScript does NOT know whether 'result' is a 'number' OR 'string'.
Now, this might really matter if we're passing in 'strings'.
*/
result = addV1('Roshani', 'Lakmali'); // Type infered by TypeScript -->  string | number
console.log(typeof result); // Actual return type --> string
/*
Consequence :- 
  We can NOT call 'string specific functions'(split, slice, replace, etc) on 'result', 
  Because TypeScript does NOT really exactly know whether type of 'result' is a string or a number. 
  All it knows is that 'result' holds a string or a number('string | number').
*/
// result.split(' '); // Error :- Property 'split' does not exist on type 'string | number'

/*
This is where 'Function Overloads' can help us.

'Function Overloads' are written by simply writing function right above the main function, with the same name, without the {}, with different signatures.

  function add(a: number, b: number): number; // Function Overloads
  function add(a: string, b: string): string; // Function Overloads
  function add(a: string, b: number): string; // Function Overloads
  function add(a: number, b: string): string; // Function Overloads
  function add(a: Combinable, b: Combinable) { ... } // Function Implementation
*/

// Function Overloads Example =>
function addV2(a: number, b: number): number; // Function Overloads
// function add(n: number): number; // This function overload signature is not compatible with its implementation signature.
function addV2(a: string, b: string): string; // Function Overloads
function addV2(a: string, b: number): string; // Function Overloads
function addV2(a: number, b: string): string; // Function Overloads
function addV2(a: Combinable, b: Combinable) {
  // Function Implementation
  if (typeof a === 'string' || typeof b === 'string') {
    return a.toString() + ' ' + b.toString();
  }
  return a + b;
}

const result1 = addV2(1, 5); // Now TypeScript infers the real type correctly -->  number
console.log(result1); // 6

const result2 = addV2('Roshani', 'Lakmali'); // Now TypeScript infers the real type correctly -->  string
console.log(result2); // Roshani Lakmali

// Now that TypeScript exactly knows the type of 'result2' is 'string', it allows us to call 'string specific methods' on 'result2'.
const splitResult2 = result2.split(' ');
console.log(splitResult2); // ['Roshani', 'Lakmali']

// So, 'Function Overloads' can help us in situations like this, where TypeScript would NOT be able to correctly infer the return type on its own.

// Optional Chaining (#089)
/*
Let's say you have an application where you're retrieving data from an external source(Database).
In most of such cases you may NOT know with certainity if a certain property is defined in an object
*/
const fetchedUserData = {
  id: 'u1',
  name: 'Rosh',
  // job: { title: 'CEO', description: 'My own company' },
};

// console.log(fetchUserData.job.title); // Error:- Property 'job' does not exist on type '{ id: string; name: string; }'
// console.log(fetchedUserData?.job?.title);

// Nullish Coalescing (#090)
/*
When you have some data where you don't know with certainity whether it's NULL or Undefined or whether it's actually a valid piece of data.
*/
let userInput1 = null;
let storedData = userInput1 || 'DEFAULT'; // Using a fallback value; with logical OR operator, stores a default value, where the first value is 'null' or 'undefined'(If it's falsy).
console.log(storedData); // DEFAULT

let userInput2 = undefined;
storedData = userInput2 || 'DEFAULT';
console.log(storedData); // DEFAULT
// So far, this classic way is working as expected.

let userInput3 = '';
storedData = userInput3 || 'DEFAULT'; // Now comes the problem with this approach; Even if 'userInput' is NOT 'null' OR 'undefined'(e.g. An empty string), BUT it's still treated as a falsy value here as well.
console.log(storedData); // DEFAULT

// BUT, if you wanna store the exact userInput unless it really is 'null' OR 'undefined', then you need another approach.
// Solution :- Nullish Coalescing Operator => ??
storedData = userInput3 ?? 'DEFAULT';
console.log(storedData); // This time the empty string is stored instead of DEFAULT value.
