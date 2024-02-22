// Section 5: Classes & Interfaces

// A First Interface

// An interface describes how an object should look like. (It allows us to define the structure of an object.)
interface Person4 {
  name: string;
  age: number;

  greet(phrase: string): void;
}

// Now, we can use this interface to type-check an object.
let user1: Person4;

user1 = {
  name: 'Malitha',
  age: 31,
  greet(phrase: string) {
    console.log(phrase + ' ' + this.name);
  },
};

user1.greet('Hi there, I am');

// Using Interfaces with Classes (#073)
/*
Why Interfaces ??? 
Wouldn't we have the exact same thing if we would add a 'Custom Type' instead of an 'Interface' like this???
    e.g. 
        type Person = {
          name: string;
          age: number;
        
          greet(phrase: string): void;
        };
Yes indeed, we could replace our interface with a type like this. It will still compile without errors and work as before. 

BUT, 'interfaces' and 'custom types' are NOT exactly the same, even though we can use both interchangeably.
Differences are,
    - Interfaces can ONLY be used to describe the structure of an 'object'.
    - But, inside of a 'custom type' you can also store other things, such as 'union types' etc.
        Custom Types : More flexible
        Interfaces : Clearer
*/

/* An interface can be used as a contract a class can implement, and a class then has to adhere to.

NOTE : You CAN 'implement' MULTIPLE interfaces. BUT, you can 'inherit' only from ONE class.

Interfaces are used to share functionality among different classes,
    NOT regarding their concrete implementation,
    BUT regarding the structure/features a class should have.

Interfaces Vs. Abstract Classes :-
    Interfaces have NO implementation details at all,
    Abstract Classes can be a mixture of both 'concrete implementation parts' & 'abstract methods to be overriden'.
*/

// 'Readonly' Interface Properties(#075) + 'Optional' Parameters & Properties(#078)
interface Named {
  // You can specify an optional property/method by adding a ? after the property name.
  outputName?: string; // Optional property syntax

  readonly name?: string;
  // You can add 'readonly' modifier to make it clear that this property in whatever object built based on this interface must ONLY be set ONCE, and is read-only thereafter.
}

// Inheritance - Extending Interfaces (#076)
interface Greetable extends Named {
  greet(phrase: string): void;
}

// Tell TypeScript that 'Person' class should ADHERE to 'Greetable' interface.
class Person implements Greetable {
  name?: string;
  // outputName = '...'; // It's not a must to initialize 'outputName' here.
  age = 31;

  // We have to provide a default value for optional property 'name', OR make it an optional argument in the constructor.
  constructor(n?: string) {
    // constructor(n: string = 'Anonymous') {
    if (n) {
      this.name = n;
    } // 'name' is defined as an optional property
  }

  greet(phrase: string): void {
    if (this.name) {
      console.log(phrase + ' ' + this.name);
    } else console.log('Hi Anonymous!');
  }
}

/* So, you can use the interface as a 'Type' of some constant/variable which will then actually store another type which in turn is based on the 'Interface Type', because it implements it.

The 'Person' object which we store in 'user2' is based on the 'Greetable' interface. */
let user2: Greetable;
user2 = new Person('Roshi');

user2.greet('Hi there, I am'); // Hi there, I am Roshi
// user2.name = 'Malitha'; // Cannot assign to 'name' because it is a read-only property.

let user3: Greetable;
user3 = new Person(); // To be able to create a Person object without passing a value for a optional property('name'), we have to provide a default value in the constructor.
user3.greet('Hi there, I am'); // Hi Anonymous!

interface Testable {
  testNum: string;
  test(): void;
}
class Person2 implements Greetable, Testable {
  name: string;
  testNum: string;

  constructor(n: string, t: string) {
    this.name = n;
    this.testNum = t;
  }

  greet(phrase: string): void {
    console.log(phrase + ' ' + this.name);
  }

  test(): void {
    console.log('Testing ' + this.testNum);
  }
}

let user4: Greetable;
user4 = new Person2('Roshi', '2');
// user4.test(); // Error: Property 'test' does not exist on type 'Greetable'.
let user5: Testable;
user5 = new Person2('Roshi', '2');
user5.test(); // Testing 2

/*
So, the Interfaces are useful in situations where we know that we wanna have a certain set of functionalities. 
*/

// Interfaces as Function Types (#077)
/* 
Interfaces can also be used to define the structure of a function as well. (as a replacement for function types) . 
*/
// Using custom types
type AddFn1 = (a: number, b: number) => number;
// let add1: AddFn1;
// add1 = (n1: number, n2: number) => n1 + n2;
// console.log(add1(5, 6)); // 11

// Using interface as an alternative to custom types
interface AddFn2 {
  (a: number, b: number): number; // Anonymous function
}
// This is done in the same way we would define methods('greet') in interfaces('Greetable'), BUT with the exception that we're NOT adding a 'method name'.

let add2: AddFn2;
add2 = (n1: number, n2: number) => n1 + n2;
console.log(add2(5, 6)); // 11

// In the end, functions are also just objects. So, you can create function types with interfaces.

// Compiling Interfaces to JavaScript (#079)
// There is no such translation for interfaces in JavaScript.
// It's a pure TypeScript feature, only available during development and compilation.
// Just use it to improve your code with clear structure and following clear rules.
