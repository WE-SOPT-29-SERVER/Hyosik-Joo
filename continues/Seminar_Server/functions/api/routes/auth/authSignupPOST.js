const functions = require('firebase-functions');
const admin = require('firebase-admin');
const util = require('../../../lib/util');
const statusCode = require('../../../constants/statusCode');
const responseMessage = require('../../../constants/responseMessage');
const db = require('../../../db/db');
const {userDB} = require('../../../db');
const jwtHandlers = require('../../../lib/jwtHandlers');
const { isAdmin } = require('@firebase/util');

module.exports = async (req, res) => {
  const {email, name, phone, password} = req.body
  
  if (!email || !name || !phone || !password) return res.status(statusCode.BAD_REQUEST).send(util.fail(statusCode.BAD_REQUEST, responseMessage.NULL_VALUE));
  
  let client;
  
  try {
    client = await db.connect(req);

    const userFirebase = await admin // Firebase Authentication을 통해 유저 생성
        .auth()
        .createUser({email, password, name})
        .then((user) => user)
        .catch((e) => {
            console.log(e);
            return {err: true, error: e};
        });

    if (userFirebase.err) { // 에러 검증
        if (userFirebase.error.code === 'auth/email-already-exists') {
            return res.status(statusCode.NOT_FOUND).json(util.fail(statusCode.NOT_FOUND,
                '해당 이메일을 가진 유저가 이미 있습니다.'));
        }
        else if (userFirebase.error.code === 'auth/invalid-password') {
            return res.status(statusCode.NOT_FOUND).json(util.fail(statusCode.NOT_FOUND,
                '비밀번호 형식이 잘못되었습니다. 패스워드는 최소 6자리의 문자열이어야 합니다.'));
        }
        else {
            return res.status(statusCode.INTERNAL_SERVER_ERROR).json(util.fail(statusCode.INTERNAL_SERVER_ERROR, responseMessage.INTERNAL_SERVER_ERROR));
        }
    }

    // RDS DB에 유저 생성
    const idFirebase = userFirebase.uid;
    const user = await userDB.addUser(client, email, name, phone, idFirebase);
    const {accesstoken} = jwtHandlers.sign(user); // JWT 발급

    console.log(user);

    res.status(statusCode.OK).send(util.success(statusCode.OK, responseMessage.CREATED_USER, {user, accesstoken})); // user, JWT를 response로 전송
    } catch (error) {
    console.log(error);
    functions.logger.error(`[EMAIL SIGNUP ERROR] [${req.method.toUpperCase()}]
    ${req.originalUrl}`, `[CONTENT] email:${email} ${error}`);

    res.status(statusCode.INTERNAL_SERVER_ERROR).send(util.fail(statusCode.INTERNAL_SERVER_ERROR, responseMessage.INTERNAL_SERVER_ERROR));
    } finally {
    client.release();
    }
};