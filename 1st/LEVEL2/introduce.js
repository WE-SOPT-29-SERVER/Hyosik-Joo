// WE SOPT SERVER Seminar 1 - Assignment LEVEL 2. Introduce Group
// by HYOSITIVE
// 2021.10.06

const group = [
    {name: "주효식", residence: "인천", age: 23, hobby: "헬스"},
    {name: "이동근", residence: "안산", age: 25, hobby: "누워있기"},
    {name: "오예원", residence: "수원", age: 23, hobby: "협곡가기"}
]

group.forEach(person =>
    console.log(
        person.name + 
        " 조원은 " +
        person.residence +
        "에 살고, 나이가 " +
        person.age +
        "세 입니다. 취미는 " +
        person.hobby + 
        "입니다."
    ),
);