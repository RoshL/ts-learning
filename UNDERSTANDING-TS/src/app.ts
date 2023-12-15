let test = 0;

// Using Watch Mode -->

// Let's get rid of having to rerun command 'tsc .\app.ts' mannualy, after every code change we do.
// We need to tell TypeScript to watch a file, so that the file will be recompiled whenever that file changes.
// Command to turn "watch mode" on ----> tsc app.ts --watch / tsc app.ts -w
console.log("You can change this string to check watch mode recompillation...");

// Compilling the Entire Project / Multiple Files -->
/* 
What if we have more than one TypeScript file to compile ❔
Let's say we have to compile analytics.ts as well.

- All we need to do is just run 'tsc' command without pointing at a file.
- Then it watches the entire project folder and recompile any TypeScript file that might change.

- To be able to globally run 'tsc' like that, first we need to tell TypeScript that this is one project that should be managed with TypeScript. 
    Command ---> tsc --init
- It will initialize this project in which you run this command, as a TypeScript project.
- That means, it will tell TypeScript that everything in the folder where you run the command.
- This will create tsconfig.json file, the indicator for TypeScript.
- Then we can run 'tsc' and tell TypeScript to compile all TypeScript files it can find in project folder. 
    Command ---> tsc -w ( Now "watch mode" will be applied for all TypeScript files. )
*/

// Including and Excluding Files -->
/* 
"exclude" property of tsconfig.json file --> 
    e.g. "exclude": ["basics.ts"]
         "exclude": ["*.dev.ts"] (Can use wildcard patterns as well.)
         "exclude": ["node_modules"] (The most common usage)
If you don't specify the "exclude" option at all, node_modules is automatically excluded as a default setting.
The 'exclude' property only affects the files included via the 'include' property and not the 'files' property 

"include" property of tsconfig.json file --> 
    e.g. "include": ["app.ts", "analytics.ts"]
"include" holds the files we wanna compile.
However, if "exclude" is also set alongst "include", it wil filter down files in "include".
It will be basically ('include' - 'exclude').

"files" option of tsconfig.json file --> 
Allows us to point at individual files, but we can't specify whole folders, unlike "includes".
*/

// Setting a Compilation Target
/* 
- In previous section we specified WHAT are the files, which we managed using options such as 'include','exclude','files'. 
- From this section onwards we're discussing about "compilerOptions" option.

"Compiler Options" : This allows us to control HOW our TypeScript code is compiled, using different properties/options in 'compilerOptions' object.
e.g. "target", "module", "lib"

Setting a Compilation Target --> 
    e.g. "target": "es2016" 
"target" option :- The JavaScript language version for emitted JavaScript and include compatible library declarations.
*/

// Understanding TypeScript Core Libs
/* 
"lib" option :- Allows you to specify which default objects and features TypeScript knows.

- When you write TypeScript code, you don't necessarily write it for the browser.
- It could be even for a NodeJs application using TypeScript.
- So we have to use "lib" option to tell TypeScript about the default objects/features it can use.
- However, in case if "lib" option is not set(commented out), then some defaults are assumed depending on your JavaScript "target" option (If "target" is set to ES6 or later version).
- But, if we add a "lib" option to tsconfig file, then the default settings will not be there anymore. So, we have to specify them ourselves.
    "lib": [
      "DOM",
      "ES6",
      "DOM.Iterable",
      "ScriptHost"
    ]
- When adding "lib" option as above, it would unlock all the core JavaScript features. 
    BTW this is the exact default set-up we get when you set "target" to ES6(or later) anyways.

*/
// Test code for adding "lib"
const button = document.querySelector("button")!; // As a workaround, we use exclamation mark at the end to avoid typescript complaining "'button' is possibly 'null'"
button.addEventListener("click", () => {
  console.log("Clicked!");
});

// However, it is quite better to avoid using "!" mark like that. Instead, it's better wrapping the whole code into a if block an check id button has a 'truthy' value while "strict" option is enabled.
/* 
const button = document.querySelector("button");
if (button) {
  button.addEventListener("click", () => {
    console.log("Clicked!");
  });
}
*/

// More Configuration and Compilation Options
/*
"allowJs" :- Allow JavaScript files to be a part of your program.(make JS files compiled by TypeScript)
"checkJs" :- Enable error reporting in type-checked JavaScript files.
*/

// Working with Source Maps
/*
"sourceMap" :- Helps us with debugging and development. 
            - If set to "true" and compiled, then a '.js.map' file will be generated for each TypeScript file.
            - '.js.map' files act as a bridge which is understood by modern browsers and their dev tools to connect javascript files to the input/source files.
            - After generating these sourceMap files, it allows us to see both TypeScript files as well as JavaScript files in sources(dev tools).
            - Now we can even place breakpoints in the typescript files.
*/

// rootDir and outDir
/*
"outDir" :- Specify an output folder for all emitted files(e.g. javascript files).  
         Move typescript files to ./src folder
         "outDir": "./dist" 
         Update index.html --> <script src="dist/app.js" defer></script>
         Now javascript files would go into 'dist' folder. 
         Even if we had sub-folders in 'src', the folder structure of 'src' would also be replicated in 'dist' as well.

"rootDir" :- Specify the root folder within your source files.(where your input files live)
        "rootDir": "./src"
         Makes sure that the typescript compiler only looks in this specific folder where all the source files are stored in. (can be done using "include" as well)
         Apart from looking only in the given source folder, it also makes sure that the project structure is kept in the 'dist' folder. Now, even if we have other folders with typescript files apart from 'src' in the root level, they would NOT be included in 'dist' folder.
*/

// Stop Emiting Files on Compilation Errors
/*
"noEmitOnError" :- Disable emitting files if any type checking errors are reported. 
*/

// Strict Compilation
/*
"strict" :- Enables all strict type-checking options

Enabling "strict" option is equivalant to enabling other type-checking options all at once.

"noImplicitAny" :- Enable error reporting for expressions and declarations with an implied 'any' type. Ensures that we have to be clear about our parameters we're working with
E.g. :- 'sendAnalytics' function in analytics.js

"strictNullChecks" :- Tell TypeScript to take into account 'null' and 'undefined' when type-checking.
E.g. :- const button = document.querySelector("button")! 
    - This button element MIGHT be null.
    - Earlier, we used ! mark at the line ending like this to get rid of typescript complaining 'button' is possibly 'null'.
    - We can do the same by setting "strictNullChecks" option to 'false'.
    - However, it is quite better to avoid doing both. Instead, wrap the whole code into a if block.
*/

// "strictBindCallApply" :- Check that the arguments for 'bind', 'call', and 'apply' methods match the original function.
function clickHandler(message: string) {
  console.log("Clicked! " + message);
}
if (button) {
  // button.addEventListener("click", clickHandler.bind(null)); // This will NOT give errors if "strictBindCallApply" is set to 'false'.
  button.addEventListener("click", clickHandler.bind(null, "You're welcome"));
}

// Code Quality Options
/*
"noUnusedLocals" :- Enable error reporting when local variables aren't read.
"noUnusedParameters" :- Raise an error when a function parameter isn't read.
"noImplicitReturns" :- Enable error reporting for codepaths that do not explicitly return in a function.
*/

// Debugging with Visual Studio Code (Lecture #045)
/*
Enable "sourceMap".(if using browser dev tools)
Place breakpoints.
Go to 'Run' --> 'Start Debugging'(F5)
Select environment(for the time being, let's use Chrome)
It will redirect to 'launch.json' file. Configure it.
  Set "url" : "http://localhost:3000" (That's where our development server is running)
Run 'Start Debugging'(F5)
*/
