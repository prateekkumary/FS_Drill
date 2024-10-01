import { createDirThenCreateFilesThenDeleteFiles } from "../problem1.js";
let n=Math.floor((Math.random()*10))+1  // genrate random numbers in range 1-10
console.log(n)
createDirThenCreateFilesThenDeleteFiles("./randomFiles",n)