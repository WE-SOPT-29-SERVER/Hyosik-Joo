// WE SOPT SERVER Seminar 1 - Assignment LEVEL 3. Random Grouping
// by HYOSITIVE
// 2021.10.06

// Original data
const members = [ 
    { name: "강한희", part: "Server", group: "OB" },
    { name: "고성용", part: "Server", group: "OB" },
    { name: "구건모", part: "Server", group: "YB" },
    { name: "권세훈", part: "Server", group: "YB" },
    { name: "김영권", part: "Server", group: "YB" },
    { name: "김은지", part: "Server", group: "YB" },
    { name: "김진욱", part: "Server", group: "YB" },
    { name: "김희빈", part: "Server", group: "OB" },
    { name: "남지윤", part: "Server", group: "YB" },
    { name: "문규원", part: "Server", group: "YB" },
    { name: "박나희", part: "Server", group: "OB" },
    { name: "박정현", part: "Server", group: "YB" },
    { name: "박현지", part: "Server", group: "OB" },
    { name: "변주현", part: "Server", group: "OB" },
    { name: "서호영", part: "Server", group: "OB" },
    { name: "설지원", part: "Server", group: "YB" },
    { name: "손시형", part: "Server", group: "YB" },
    { name: "안준영", part: "Server", group: "OB" },
    { name: "장서현", part: "Server", group: "OB" },
    { name: "오예원", part: "Server", group: "OB" },
    { name: "이다은", part: "Server", group: "OB" },
    { name: "이동근", part: "Server", group: "YB" },
    { name: "이솔", part: "Server", group: "OB" },
    { name: "이승헌", part: "Server", group: "YB" },
    { name: "이정은", part: "Server", group: "YB" },
    { name: "이제준", part: "Server", group: "YB" },
    { name: "정설희", part: "Server", group: "OB" },
    { name: "조윤서", part: "Server", group: "OB" },
    { name: "조재호", part: "Server", group: "YB" },
    { name: "조찬우", part: "Server", group: "YB" },
    { name: "주어진사랑", part: "Server", group: "YB" },
    { name: "주효식", part: "Server", group: "YB" },
    { name: "채정아", part: "Server", group: "OB" },
    { name: "최영재", part: "Server", group: "OB" },
    { name: "최유림", part: "Server", group: "YB" },
    { name: "최진영", part: "Server", group: "YB" },
    { name: "허유정", part: "Server", group: "YB" },
];

// Divide members to YB and OB
let YB = members.filter(member => member.group == 'YB');
let OB = members.filter(member => member.group == 'OB');
let YBctr = YB.length; // # of YB members : 21
let OBctr = OB.length; // # of OB members : 16

// Divide members to 5 groups
let groups = [[], [], [], [], []];

// Get Random number for YB members
let randIndexYB = []
for (i = 0; i < YBctr; i++) {
  let randomNum = Math.floor(Math.random() * YBctr)
  if (randIndexYB.indexOf(randomNum) === -1) {
    randIndexYB.push(randomNum)
  } else {
    i--
  }
}

// Divide YB members to 5 random groups
for (let j = 0; j < YBctr; j++) {
    if (j == 20) { // last one member : assign to random group
        let groupNum = Math.floor(Math.random() * 4);
        groups[groupNum].push(YB[randIndexYB[j]]);
    }
    else {
        groups[j % 5].push(YB[randIndexYB[j]]);
    }
};

// Get Random number for OB members
let randIndexOB = []
for (i = 0; i < OBctr; i++) {
  let randomNum = Math.floor(Math.random() * OBctr)
  if (randIndexOB.indexOf(randomNum) === -1) {
    randIndexOB.push(randomNum)
  } else {
    i--
  }
}

// Divide OB members to 5 random groups
for (let j = 0; j < OBctr; j++) {
    if (j == 15) { // last one member : assign to random group
        let groupNum = Math.floor(Math.random() * 4);
        groups[groupNum].push(OB[randIndexOB[j]]);
    }
    else {
        groups[j % 5].push(OB[randIndexOB[j]]);
    }
};

// Print Groups
for (let k = 0; k < 5; k++) {
    console.log(`Group ${k + 1}: `, groups[k]);
};

/*
Comment : 각 그룹에 동일한 수의 인원 배정 후 남는 인원 처리 자동화할 수 없는지?
*/