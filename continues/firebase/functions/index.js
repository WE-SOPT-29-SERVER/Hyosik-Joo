const admin = require('firebase-admin');
const serviceAccount = require('./wesopt29-29f3e-firebase-adminsdk-hvgq6-57ad4127c1.json'); // 여기에 credential 파일을 집어넣을 것
const dotenv = require('dotenv');

dotenv.config();

let firebase;
if (admin.apps.length === 0) {
    firebase = admin.initializeApp({
        credential: admin.credential.cert(serviceAccount),
    });
} else {
    firebase = admin.app();
}

module.exports =  {
    api: require('./api'),
};