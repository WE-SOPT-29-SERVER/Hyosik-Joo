const functions = require('firebase-functions');
const util = require('../../../lib/util');
const statusCode = require('../../../constants/statusCode');
const responseMessage = require('../../../constants/responseMessage');
const {firebaseAuth} = require('../../../config/firebaseClient');

module.exports = async(req, res) => {
    const script = 
    `
    // 구글 인증 기능 추가
     var provider = new firebaseAuth.auth.GoogleAuthProvider();

        // 인증하기
        firebaseAuth.auth().signInWithPopup(provider).then(function(result) {
            // This gives you a Google Access Token. You can use it to access the Google API.
            var token = result.credential.accessToken;
            // The signed-in user info.
            var user = result.user;
            
            console.log(user)		// 인증 후 어떤 데이터를 받아오는지 확인해보기 위함.
        }).catch(function(error) {
            // Handle Errors here.
            var errorCode = error.code;
            var errorMessage = error.message;
            // The email of the user's account used.
            var email = error.email;
            // The firebase.auth.AuthCredential type that was used.
            var credential = error.credential;
            // ...
    `;

    var html = 
        `
        <!DOCTYPE html>
        <html>
        <head>
        구글 로그인 테스트
        </head>
        <body>
        파이어베이스 웹서버 입니다.
        <script>
        ${script}
        </script>

        </body>
        </html>
        `;

    res.send(html);
};