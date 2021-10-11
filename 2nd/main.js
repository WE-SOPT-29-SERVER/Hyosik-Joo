// WE SOPT SERVER Seminar 2 - Module - Main
// by HYOSITIVE
// 2021.10.09

// Module - Sum
const sum = require("./sum");

const result = sum(1, 3);
console.log("sum result: ", result);

// Module - Calculator
const calculator = require("./calculator");

const addResult = calculator.add(1, 3);
const subractResult = calculator.add(3, 2);
const multiplyResult = calculator.multiply(2, 2);
const divideResult = calculator.divide(10, 5);