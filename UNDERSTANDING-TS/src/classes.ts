// Section 5: Classes & Interfaces

// What are Classes? (#058 Objects Vs Classes)

class DepartmentV1 {
  // default: public modifier
  private name: string; // private modifier
  private employees: string[] = []; // private modifier

  constructor(n: string) {
    this.name = n;
  }

  // Without type safety, it will allow us to call 'describe' method on any type of object/instance (NOT restricted to instances of 'Department' class)
  //   describe() {
  //     console.log("Department: " + this.name);
  //   }
  //
  // Workaround - Adding extra type safety by adding 'this' as a dummy parameter
  describe(this: DepartmentV1) {
    // 'this' should refer to an object of type Department
    console.log('Department: ' + this.name);
  }

  addEmployee(employee: string) {
    this.employees.push(employee);
  }

  printEmployeeInformation() {
    // console.log(this.employees.length);
    console.log(this.employees);
  }
}

const accountingV1 = new DepartmentV1('Accounting');
accountingV1.describe(); // Department: Accounting

// Example : When only 'name' remained as a property of 'DepartmentV1' class --->
// const accountingCopy1 = { describe: accounting.describe }; // Property 'name' NOT added to 'accountingCopy1'.

// Without adding any type safety to 'describe' method --->
// accountingCopy1.describe(); // Department: undefined
// As you may observe, this does NOT give any error at compile time. Yet, this leads to an unwanted behaviour at runtime, which can easily be avoided with TypeScript.

// Workaround - Adding extra type safety by writing 'describe' method with 'this' passed as a dummy parameter, and its type set to 'DepartmentV1'.
// accountingCopy1.describe(); // Error
// Now it will give a compile time error, since we are NOT calling 'describe' method on an instance of 'DepartmentV1' --> ... Property 'name' is missing in type '{ describe: (this: DepartmentV1) ....

// Example : When only 'name' remained as a property of 'DepartmentV1' class --->
// const accountingCopy2 = { name: "DUMMY", describe: accounting.describe };
// In this case, TypeScript allows this, because the object 'accountingCopy2' on which 'describe' is called, now has a 'name' property just like expected by 'this'.
// accountingCopy2.describe(); // Department: DUMMY

// Access Modifiers
accountingV1.addEmployee('Roshani');
accountingV1.addEmployee('Malitha');
// accounting.employees[2] = "Lakmali"; // Error : Private and only accessible within class 'Department'
accountingV1.printEmployeeInformation();
console.log(accountingV1); // DepartmentV1 {employees: Array(2), name: 'Accounting'}

// Shorthand Initialization + Access Modifiers + "readonly Properties"
class Department {
  static fiscalYear = 2024; // Make it available without instantiating
  // private readonly id: string;
  // name: string; // public by default
  protected employees: string[] = [];

  /*   
  In a lot of use cases, you often have to write classes where most of the properties/fields are initialized in the constructor.
  private readonly id: string;
  name: string; 

  Therefore, often you might find yourself writing definitions for those fields(private/public) like this at the top, and then just repeat all of them down there in the constructor fuction, just to initialize these values here.

  constructor(id: string, n: string) {
    this.id = id;
    this.name = n;
  } 

  Instead of writing such "double-initialization code"(find field & then store values) as above, you can simply go for "Shorthand Initialization"(#063) as follows. Simply define which arguments the constructor takes, & then for every argument which has an access modifier in front of it, a property of the same name is created, and the value for the argument is stored in that property.

  NOTE: You have to 'explicitly' use "public" as the access modifier of the second parameter 'name', because this is now an explicit instruction for TypeScript, which tells that you want NOT just get these arguments here in the constructor, BUT also you want to create properties for this class, with the exact same names. (have to rename "n" to "name")
  */
  constructor(protected readonly id: string, public name: string) {
    // this.id = id;
    // this.name = n;
    // console.log(this.fiscalYear); // EROOR : Property 'fiscalYear' does not exist on type 'Department'. Did you mean to access the static member 'Department.fiscalYear' instead?
  }

  static createEmployee(name: string) {
    return { name: name };
  }

  describe(this: Department) {
    // this.id = this.name; // Cannot assign to 'id' because it is a read-only property
    console.log(`Department (${this.id}): ${this.name}`);
  }

  addEmployee(employee: string) {
    this.employees.push(employee);
  }

  printEmployeeInformation() {
    // console.log(this.employees.length);
    console.log(this.employees);
  }
}

const department = new Department('d0', 'General');
department.describe(); // Department (d0): General
// department.name = "NEW NAME"; // Allowed
// department.id='d2' // Error : Property 'id' is private and only accessible within class
department.addEmployee('Roshani');
department.addEmployee('Malitha');
department.printEmployeeInformation();
console.log(department); // Department {id: 'd0', name: 'General', employees: Array(2)}

// Inheritance
class ITDepartment extends Department {
  // admins: string[];
  constructor(id: string, public admin: string[]) {
    super(id, 'IT');
    // this.admins = admin;
  }
}

const it = new ITDepartment('d1', ['Max']);
it.describe(); // Department (d1): IT
it.addEmployee('Roshani');
it.addEmployee('Malitha');
it.printEmployeeInformation(); // ['Roshani', 'Malitha']
console.log(it); // ITDepartment {id: 'd1', name: 'IT', employees: Array(2), admin: Array(1)}

// Overriding Properties & the "protected" Modifier
class AccountingDepartment extends Department {
  private lastReport: string;

  get mostRecentReport() {
    if (this.lastReport) {
      return this.lastReport;
    }
    throw new Error('No report found.');
  }
  set mostRecentReport(value: string) {
    if (!value) {
      throw new Error('Please pass in valid value!');
    }
    this.addReport(value);
  }

  constructor(id: string, private reports: string[]) {
    super(id, 'Accounting');
    this.lastReport = reports[0];
  }

  // Overridden 'describe' method in 'Accounting' class.
  describe() {
    // this.id = this.name; // Cannot assign to 'id' because it is a read-only property
    console.log(`Accounting Department - ID: (${this.id})`);
  }

  // Overridden 'addEmployee' method in 'Accounting' class.
  addEmployee(name: string) {
    if (name === 'Kalu') return;
    this.employees.push(name);
  }

  addReport(text: string) {
    this.reports.push(text);
    this.lastReport = text;
  }

  printReports() {
    console.log(this.reports);
  }
}

const accounting = new AccountingDepartment('d2', []);
accounting.describe(); // Accounting Department - ID: (d2)
accounting.addEmployee('Kalu');
accounting.addEmployee('Malitha');
accounting.printEmployeeInformation(); // ['Malitha']
console.log(accounting); // AccountingDepartment {id: 'd2', name: 'Accounting', employees: Array(1), reports: Array(0)}
accounting.addReport('Something went wrong...');
accounting.printReports(); // ['Something went wrong...']

// Getters & Setters
// Getter : A property, where you execute a fuction/method, when you retrieve a value. That allows developer to add more complex logic.
console.log(accounting.mostRecentReport); // Something went wrong...
// accounting.mostRecentReport = ''; // Please pass in valid value!
accounting.mostRecentReport = 'Year End Report';
console.log(accounting.mostRecentReport); // Year End Report
accounting.printReports(); // ['Something went wrong...', 'Year End Report']

// Static Methods & Properties
/*  Allows adding properties and methods to classes which "can be accessed without instantiating the class"(NOT accessed on an instance of the class), but accessed directly on the class itself.

Used for utility/helper functions that you want to group/map to a class logically, OR global constants to be stored in a class.
"Class" will be used as a 'grouping mechanism'.
 */
const employee1 = Department.createEmployee('Max');
console.log(employee1); // {name: 'Max'}
console.log(Department.fiscalYear); // 2024

/* NOTE: When you add static members on a class, you can't access them from inside your non-static parts.

console.log(accounting.fiscalYear); 
ERROR: Property 'fiscalYear' does not exist on type 'AccountingDepartment'. Did you mean to access the static member 'AccountingDepartment.fiscalYear' instead? 
*/

// Inheritance with "Abstract Classes"
/* 
Sometimes you just do NOT want to offer the "option" of overriding a method because that always exists.
You instead want to "force" the devs extending a certain class to override a certain method.

Scenario :-
  * Whenever you wanna "ensure" that a certain method is available in all classes based on some base class, 
  * BUT when you "also" know at the same time that the exact implementation will "depend" on the specific version, 
  * When you "can't" provide a general method("default" implementation) in the base class, 
  * BUT you want to "enforce" that this method "exists", but the inheriting classes will "need" to provide their "own" implementation.
  * 
In such a situation, you might wanna have an "empty" method in your "base class", and now "force" "all inheriting classes" to "add and override" this method.
You can do so by adding the "abstract keyword". If you have "one or more" abstract methods inside the class, you have to add "abstract in front of the class" as well.
*/

abstract class DepartmentAbs {
  static fiscalYear = 2024; // Make it available without instantiating
  protected employees: string[] = [];

  constructor(protected readonly id: string, public name: string) {}

  static createEmployee(name: string) {
    return { name: name };
  }

  // NOTE: Method 'describeAbs' cannot have an implementation because it is marked abstract. Remove curly braces, add a ":", and just add a return type.
  abstract describeAbs(this: Department): void;

  addEmployee(employee: string) {
    this.employees.push(employee);
  }

  printEmployeeInformation() {
    // console.log(this.employees.length);
    console.log(this.employees);
  }
}

// Inheriting Abstract Class
class ITDeptAbs extends DepartmentAbs {
  // admins: string[];
  constructor(id: string, public admin: string[]) {
    super(id, 'IT');
    // this.admins = admin;
  }

  // Implementation for abstract method
  describeAbs(): void {
    console.log(`IT Department - ID: (${this.id})`);
  }
}
const itAbs = new ITDeptAbs('d1Abs', ['Max']);
itAbs.describeAbs(); // IT Department - ID: (d1Abs)

// Inheriting Abstract Class
class AccountingDeptAbs extends DepartmentAbs {
  private lastReport: string;

  get mostRecentReport() {
    if (this.lastReport) {
      return this.lastReport;
    }
    throw new Error('No report found.');
  }
  set mostRecentReport(value: string) {
    if (!value) {
      throw new Error('Please pass in valid value!');
    }
    this.addReport(value);
  }

  constructor(id: string, private reports: string[]) {
    super(id, 'Accounting');
    this.lastReport = reports[0];
  }

  // Implementation for abstract method
  describeAbs() {
    console.log(`Accounting Department - ID: (${this.id})`);
  }

  addEmployee(name: string) {
    if (name === 'Kalu') return;
    this.employees.push(name);
  }
  addReport(text: string) {
    this.reports.push(text);
    this.lastReport = text;
  }
  printReports() {
    console.log(this.reports);
  }
}
const accountingAbs = new AccountingDeptAbs('d2Abs', []);
accountingAbs.describeAbs(); // Accounting Department - ID: (d2Abs)

/* 
So, "abstract" can be very useful; 
  - If you wanna "enforce" that all inheriting classes based on a parent class share some common methods/properties, 
  - BUT, at the same time you wanna make sure that you do NOT have to provide the concrete(default) implementation/value in the base class, and instead the inheriting classes are "forced" to do that.

NOTE: Abstract classes can NOT be instantiated themselves. */

// Singletons & Private Constructors
/*
Singleton Pattern : Ensuring that you always have exactly ONE instance of a certain class.

This can be useful in scenarios where you somehow can NOT use static methods/properties.
*/

// Let's make sure that we can only create exactly ONE accounting department for our company.
// First, make the constructor of the 'AccountingAbs' class into a "private constructor".
class AccountingDeptSingleton extends DepartmentAbs {
  private lastReport: string;

  // Adding static property (accessible within the class itself, but only from inside the class).
  private static instance: AccountingDeptSingleton;

  get mostRecentReport() {
    if (this.lastReport) {
      return this.lastReport;
    }
    throw new Error('No report found.');
  }
  set mostRecentReport(value: string) {
    if (!value) {
      throw new Error('Please pass in valid value!');
    }
    this.addReport(value);
  }

  private constructor(id: string, private reports: string[]) {
    super(id, 'Accounting');
    this.lastReport = reports[0];
  }

  // Adding a static method to instantiate this singleton class.
  static getInstance() {
    // Checks if an instance already exists, If not, returns a new instance.
    if (this.instance) {
      // 'this' keyword within a 'static' method refers to the 'class' itself. (Same as using 'AccountingDeptSingleton.instance')
      return this.instance;
    }
    this.instance = new AccountingDeptSingleton('d2Single', []);
    return this.instance;
  }

  // Implementation for abstract method
  describeAbs() {
    console.log(`Accounting Department - ID: (${this.id})`);
  }
  addEmployee(name: string) {
    if (name === 'Kalu') return;
    this.employees.push(name);
  }
  addReport(text: string) {
    this.reports.push(text);
    this.lastReport = text;
  }
  printReports() {
    console.log(this.reports);
  }
}

// const accountingSingle = new AccountingDeptSingleton('d2Single', []);
// EROOR : Constructor of class 'AccountingDeptSingleton' is private and only accessible within the class declaration.

/* Solution : Static methods/properties
- Add a static method to instantiate the singleton class. ('getInstance') 
- Add a static property called 'instance', which is accessible within the class itself, but only from inside the class. (Type of property 'instance' = 'AccountingDeptSingleton' )
*/
const accountingSingle = AccountingDeptSingleton.getInstance();
const accountingSingle2 = AccountingDeptSingleton.getInstance();

console.log(accountingSingle); // AccountingDeptSingleton {id: 'd2Single', name: 'Accounting', employees: Array(0), reports: Array(0), lastReport: undefined}
console.log(accountingSingle2); // Same output as 'accountingSingle' above
