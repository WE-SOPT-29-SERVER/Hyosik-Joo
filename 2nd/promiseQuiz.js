// WE SOPT SERVER Seminar 2 - Mission - Promise - PromiseQuiz
// by HYOSITIVE
// 2021.10.11

const members = require("./members");

const getOnline = members => {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            const onlineMembers = members.filter(member => member.location === "online");
            resolve(onlineMembers);
        }, 500);   
    });
};

const getOffline = members => {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            const offlineMembers = members.filter(member => member.location === "offline");
            resolve(offlineMembers);
        }, 500);    
    });
};

const getYB = members => {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            const YBmembers = members.filter(member => member.group === "YB");
            resolve(YBmembers);
        }, 500);    
    });
};

const getOB = members => {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            const OBmembers = members.filter(member => member.group === "OB");
            resolve(OBmembers);
        }, 500)   
    });
};

getOnline(members)
    .then(progress => getOB(progress))
    .then(progress => console.log(progress));
getYB(members).then(getOffline).then(console.log);