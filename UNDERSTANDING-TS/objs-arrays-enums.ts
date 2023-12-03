// Objects -->

// const person = {
//   name: "Roshani",
//   age: 31,
// };
// console.log(person);
// console.log(person.nickname); // undefined
// In IDE TypeScript notifies ---> Property 'nickname' does not exist on type

/*
const person: {
    name: string;
    age: number;
}

This is NOT the javascript object. 
This is just the object type inferred by typescript. 
Here we have key-type pairs, where as javascript has key-value pairs.
*/

// const person: object = {
//   name: "Roshani",
//   age: 31,
// };
// console.log(person.name);

// const person: {} = {};"
// const person: object = {};
// Both above ways we tell typescript that this is 'some' object.

// Let's have specific key-type pairs in that {}, which describes the properties this object would have.
// This is just TypeScript's representation of an object's type that helps TypeScript understand the object. JavaScript does NOT understand it.
// const person: {
//   name: string;
//   age: number;
// } = {<properties ... >}

// Yet, this is the BEST syntax to be used.
const person: {
  // Explicit object type assignment to 'person' object
  name: string;
  age: number;
  hobbies: string[];
  role: [number, string]; // Tells TypeScript that 'role' should be an 'special array', with exactly TWO elements, where the' first element' should be a 'number', and the 'second element' should be a 'string'.
} = {
  // Properties
  name: "Roshani",
  age: 31,
  hobbies: ["Sports", "Cooking"],
  //Type of 'hobbies' array inferred by TypeScript --> hobbies: string[]
  role: [2, "author"],
  // Before adding object type to person, TypeScript inferred this as an arry which might hold even 'strings' OR 'numbers' --> role: (string | number)[]
};
console.log(person.name);

// Of course object types can also be created for nested objects.
// Let's say you have this JavaScript object:
const product = {
  id: "abc1",
  price: 12.99,
  tags: ["great-offer", "hot-and-new"],
  details: {
    title: "Red Carpet",
    description: "A great carpet - almost brand-new!",
  },
};
// This would be the type of such an object:
// {
//   id: string;
//   price: number;
//   tags: string[];
//   details: {
//     title: string;
//     description: string;
//   }
// }
// So you have an object type in an object type so to say.

// Arrays -->
let favoriteActivities1: string[];
// favoriteActivities1 = "Sports"; // Type 'string' is not assignable to type 'string[]'
// favoriteActivities1 = ["Sports", 1]; // Type 'number' is not assignable to type 'string'
favoriteActivities1 = ["Sports"];

let favoriteActivities2: any[]; // Flexible; But you will loose the benifits of TypeScript itself, and will be back in JavaScript world.
favoriteActivities2 = ["Sports", 1]; // OK

// hobbies: ["Sports", "Cooking"] (from 'person' object)
for (let hobby of person.hobbies) {
  hobby = hobby.toUpperCase(); // This is allowed because TypeScript inferres that 'hobbies' is of type 'string array'.
  console.log(hobby);
}

// TypeScript has introduced couple of 'new types', apart from part from 'core types' supported by JavaScript.
// e.g. :- Tuple type, Enum type, Any type

// Tuple type : Fixed-length array -->
// A tuple looks just like an array. BUT actually is a 'fixed length' and 'fixed type' array.
// A 'Tuple' should have exactly TWO elements.

// Downside of above usage -->
// role: [2, "author"] (from 'person' object)
// TypeScript inferred that 'role' is as an arry which might hold even 'strings' OR 'numbers'
// Here(Before assigning explicit object type to person), TypeScript ONLY knows that 'role' should be of type 'string' OR 'number' array.

// So TypeScript used to allow (Before assigning explicit object type to person) -->
// person.role[1] = 10;

// BUT, we actually want this to have exactly the structure like,
// --> 2 elements
// --> Firet element -> A number
// --> Second element -> A string

// FIX -->
// For such a scenario, a 'Tuple' type comes in handy.
// We can tell TypeScript what 'role' should be, BY explicitly setting the type of 'role' as '[number, string]'.
/* So, in person exapmle, we've added an 'explicit object type' for 'person' object instead of 'TypeScript inferrence,
by adding a 'colon' after person, then {} in which we can assign a type,
for the properties of which 'TypeScript inferrence' does not work the way we want. */
/* 
const person: {
  name: string;
  age: number;
  hobbies: string[];
  role: [number, string];
} = {<properies and values>} 
*/

console.log(person.role); // (2) [2, 'author']
// BUT, we are still able to push another element into 'role' array. WHY?
person.role.push("admin"); // Because this is an 'Exception' which is allowed on Tuple, despites 'role' is supposed to have exactlt TWO elements.
console.log(person.role); // (3) [2, 'author', 'admin']

// Enum type -->
// enum { <set of human readable Identifiers> }
// Gives an enumerated list of global constant identifiers.

// 'person1' --> Got gid of explicit object type assignment of 'person', and instead got back to inferrence.
const person1 = {
  name: "Roshani",
  age: 31,
  hobbies: ["Sports", "Cooking"],
  role: "READ ONLY USER", // Added a 'string identifier' to the role
};
// Downside of having 'string identifiers'
if (person1.role === "READ-ONLY-USER") {
  console.log("is read only");
  // Here, we are checking with wrong wordings for the 'role' of 'person1'.
}
// In practice, it's common that we forget what naming covention we first used after some time.
// For such scenarios, it's quite common in 'JavaScript' to define 'global constants'.
/* E.g.
const ADMIN = 0;
const READ_ONLY = 1;
const AUTHOR = 2;

Now, 'role' is inferred to be a 'number'(even one which we don't support). 
In addition, we've defined all these constants which we have to manage.
*/

// FIX : Enum type makes this easier, which assigns labels to numbers.
enum Role {
  ADMIN,
  READ_ONLY,
  AUTHOR,
}
console.log(Role); // {0: 'ADMIN', 1: 'READ_ONLY', 2: 'AUTHOR', ADMIN: 0, READ_ONLY: 1, AUTHOR: 2}
console.log(Role.ADMIN);
console.log(Role.ADMIN);

// In case you don't wanna start with '0'.
enum RoleAlt1 {
  ADMIN = 5,
  READ_ONLY = 100,
  AUTHOR,
}
console.log(RoleAlt1); // {5: 'ADMIN', 100: 'READ_ONLY', 101: 'AUTHOR', ADMIN: 5, READ_ONLY: 100, AUTHOR: 101}

// You're not restricted to numbers. Tey texts as well.
enum RoleAlt2 {
  ADMIN = "ADMIN",
  READ_ONLY = 100,
  AUTHOR,
}
console.log(RoleAlt2); // {100: 'READ_ONLY', 101: 'AUTHOR', ADMIN: 'ADMIN', READ_ONLY: 100, AUTHOR: 101}

const person2 = {
  name: "Roshani",
  age: 31,
  hobbies: ["Sports", "Cooking"],
  role: Role.ADMIN, // Using 'Role' enum instead of 'string identifiers'.
};

// Any type *
// Any kind of value, no specific type assignment
