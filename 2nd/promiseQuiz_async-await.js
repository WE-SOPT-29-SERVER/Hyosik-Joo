// WE SOPT SERVER Seminar 2 - Async-Await
// by HYOSITIVE
// 2021.10.11

const members = require("./members");

const getOnline = members => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const data = members.filter(o => o.location === "online");
      resolve(data);
    }, 500);
  });
};

const getOffline = members => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const data = members.filter(o => o.location === "offline");
      resolve(data);
    }, 500);
  });
};

const getYB = members => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const data = members.filter(o => o.group === "YB");
      resolve(data);
    }, 500);
  });
};

const getOB = members => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const data = members.filter(o => o.group === "OB");
      resolve(data);
    }, 500);
  });
};

const OnlineOB = async(members) => {
    const Online = await getOnline(members);
    const OnlineOB = await getOB(Online);
    console.log(OnlineOB);
}
const OfflineYB = async(members) => {
    const Offline = await getOffline(members);
    const OfflineYB = await getYB(Offline);
    console.log(OfflineYB);
}

OnlineOB(members);
OfflineYB(members);