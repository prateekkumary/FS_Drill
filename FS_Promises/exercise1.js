/*
    1. Print out "Program started" at the start of your code
    2. Create a Promise that resolves after 3 seconds
       and rejects after 2 seconds
    3. Log out the promise while it's pending
    4. Print out "Program in progress..." as well

    5. Print out "Program complete" if the promise fulfills
    6. Print out "Program failure" if the promise rejects

    HINT: Use setTimeout for the delay
*/

console.log("Program started");

const newPromise = new Promise((resolve, reject) => {
    setTimeout(() => console.log("Error: Rejected after 2000 ms"), 2000);
    setTimeout(() => console.log("Resolved after 3000 ms"), 3000);
});

console.log("Promise status : pending");

console.log("Program is in progress");


newPromise.then((massage) => {
    console.log("Program completed:", massage);
}).catch((error) => {
    console.log("Program failed", error);
});