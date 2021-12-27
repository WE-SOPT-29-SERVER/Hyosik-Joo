// WE SOPT SERVER Seminar 1 - Assignment LEVEL 1. Array
// by HYOSITIVE
// 2021.10.06

/* -------------------- */
/*     1. 배열 실습     */
/* -------------------- */

let arr1 = [];
console.log(arr1);
console.log(typeof arr1);

let arr2 = new Array(1, 2, 3, 4, 5);
console.log(arr2);
console.log(typeof arr2);

let arr3 = ["김우영", 1, 2, 3, null, {name: "wooyeong", age: 25}];
console.log(arr3);
console.log(typeof arr3);

/* -------------------------- */
/*  2. 배열 prototype 메서드  */
/* -------------------------- */

console.log("**** Array 기본 함수들을 알아보자 ****");
let arr = [1, 2, 3, 4];

// 2-1: length
console.log(`arr의 길이: ${arr.length}`);

// 2-2: push, pop
arr.push("new item");
console.log("arr push:", arr);
arr.pop();
console.log("arr pop:", arr);

// 2-3: shift, unshift
arr.unshift("first item");
console.log("arr unshift:", arr);
arr.shift();
console.log("arr shift:", arr);

// 2-4: includes
console.log("arr.inclueds(4):", arr.includes(4));
console.log("arr.includes(1000):", arr.includes(1000));

// 2-5: indexOf
console.log("arr.indexOf(4):", arr.indexOf(4));
console.log("arr.indexOf(100):", arr.indexOf(100));

// 2-6: concat: 배열을 합쳐줌
let concatArr1 = [1, 2, 3];
let concatArr2 = [4, 5, 6];
let concatArr = concatArr1.concat(concatArr2);
console.log("concatArr1.concat(concatArr2):", concatArr);

// 2-7: join
let location = ["서울", "대전", "대구", "부산"];
console.log(location.join("-> "));

// 2-8: reverse
console.log(location.reverse().join("-> "));

// 2-9: sort
let countries = ["Österreich", "Andorra", "Vietnam"];
console.log(countries.sort((a, b) => (a > b ? 1 : -1))); // Andorra, Vietnam, Österreich (제대로 정렬이 되지 않았습니다.)
console.log(
    countries.sort(function(a, b) {
        return a.localeCompare(b);
    }),
); // Andorra, Österreich, Vietnam (제대로 정렬되었네요!) 유니코드 기준으로 문자 정렬
console.log(
    "오름차순 정렬:",
    concatArr1.sort((a, b) => a - b),
);
console.log(
    "내림차순 정렬:",
    concatArr1.sort(function (a, b) {
        return b - a;
    }),
);

// 2-10: filter: 필터는 배열 요소 전체를 대상으로 조건을 걸어서 그 조건을 충족하는 결과를 새로운 배열로 반환해줌
let number = [100, 234, -125, 1, 23, -637, -123, 99, 2, 3, 4, 5];
let minusNumber = number.filter(item => item < 0);
console.log("minusNumber: ", minusNumber);

// 2-11: map: map은 배열 요소 전체를 대상으로 함수를 호출하고, 그 결과로 새로운 배열을 반환할 때 주로 사용
let mapCountries = ["Österreich", "Andorra", "Vientnam", "Korea", "China"];
let countriesLengths = mapCountries.map(item => item.length);
console.log("countriesLengths: ", countriesLengths);

// 2-12: reduce: map은 배열을 반환할 때 사용했지만 reduce는 값 하나를 반환할 때 주로 사용. 대표적인 예시로 1 ~ n 까지 더하기
let reduceNumber = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
let sum = reduceNumber.reduce((previousValue, currentValue) => {
    console.log(`previousValue: ${previousValue}, currentValue: ${currentValue}`);
    return previousValue + currentValue;
});

console.log("sum = ", sum);

/* -------------------- */
/*     3. 배열 순회     */
/* -------------------- */

let serverPart = [
    "강한희",
    "고성용",
    "구건모",
    "권세훈",
    "김영권",
    "김은지",
    "김진욱",
];
let serverIndexStr = '서버파트 여러분 번호 한번 세겠습니다. "';
let serverPartMemberNameStr = '서버파트 여러분 이름 한번씩만 불러주세요~"';

for (let item in serverPart) {
    serverIndexStr += item + "! ";
}
console.log(serverIndexStr);

for (let item of serverPart) {
    serverPartMemberNameStr += item + "! ";
}
console.log(serverPartMemberNameStr);

serverPart.forEach(item => {
    console.log(item);
});