// WE SOPT SERVER Seminar 1 - Assignment LEVEL 1. Function
// by HYOSITIVE
// 2021.10.06

/* -------------------- */
/*  1. 함수 선언식 실습  */
/* -------------------- */

 function add(x, y) {
     return x + y;
 }
 console.log(add(2, 3));


/* -------------------- */
/*  2. 함수 표현식 실습  */
/* -------------------- */

const addStr = function (x, y) {
    return x + y;
};
console.log(addStr("안녕", "하세요"));

/* -------------------- */
/*  3. 함수 표현식 실습  */
/*    - 화살표 함수 -     */
/* -------------------- */

const add = (x, y) => {
    return x + y;
};

const add = x => {
    return x;
};

const add = () => {
    return 1;
};

// 로직이 한 줄일 때 return 문 생략 가능
const add = (x, y) => x + y;

// 매개변수가 하나일 때 매개변수 소괄호 생략 가능
const square = x => x * x;

// 객체를 리턴하고 로직이 한 줄일때는 소괄호 ()로 감싸줘야 함
const person = (name, age) => ({ name: name, age: age});

// 위의 person 화살표 함수는 아래와 동일
const person = function (name, age) {
    return {
        name: name,
        age: age,
    };
};