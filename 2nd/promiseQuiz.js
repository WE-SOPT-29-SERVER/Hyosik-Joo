// WE SOPT SERVER Seminar 2 - Mission - Promise - PromiseQuiz
// by HYOSITIVE
// 2021.10.09

const members = require("./members");

const getOnline = members => {
    return new Promise((resolve, reject) => {
        const online = members.filter(member => members.location = 'online');
        resolve(online);
    }, 5000);
};

const getOffline = members => {
    return new Promise((resolve, reject) => {
        const offline = members.filter
    })
}

const getYB = members => {

};

const getOB = members => {

};

getOnline().then().then();
getYB.then().then();