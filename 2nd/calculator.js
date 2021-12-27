// WE SOPT SERVER Seminar 2 - Mission - Module - Calculator
// by HYOSITIVE
// 2021.10.09

function add(a, b) {
    return a + b;
};

function subtract(a, b) {
    return a - b;
};

function multiply(a, b) {
    return a * b;
};

function divide(a, b) {
    return a / b;
};

const calculator = {
    add,
    subtract,
    multiply,
    divide,
};

module.exports = calculator;