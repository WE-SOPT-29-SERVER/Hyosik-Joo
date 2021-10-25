// WE SOPT SERVER Seminar 3 - CRUD - User data
// by HYOSITIVE
// 2021.10.09

const express = require('express');
const router = express.Router();
const users = require("../dbMockup/user.js");
const util = require("../lib/util.js");
const responseMessage = require("../constants/responseMessage");
const statusCode = require("../constants/statusCode");
const { response } = require('express');

router.post("/signup", (req, res) => {
    // 일반 할당
    // const email = req.body.email;
    // const name = req.body.name;
    // const password = req.body.password;

    // destructuring assignment (비구조화 할당)
    const {email, name, password} = req.body;

    // request body가 잘못됐을 때
    if (!email || !name || !password) {
        return res
            .status(statusCode.BAD_REQUEST)
            .send(
                util.fail(
                    statusCode.BAD_REQUEST,
                    responseMessage.NULL_VALUE
                ));
    }

    // 해당 email을 가진 유저가 이미 있을 때
    const existingUser = users.filter(object => object.email === email).length > 0;
    if (existingUser) {
        return res
            .status(statusCode.BAD_REQUEST)
            .send(
                util.fail(
                    statusCode.BAD_REQUEST,
                    responseMessage.ALREADY_EMAIL
                ));
    }

    const newUser = { 
        id: users.length + 1,
        name:name,
        password:password,
        email:email
    };
    res.status(statusCode.OK).send(
        util.success(
            statusCode.OK,
            responseMessage.LOGIN_SUCCESS,
            newUser
        )
    );


});

router.post("/login", async (req, res) => {
    // request body에서 데이터 가져오기
    const {email, password} = req.body;

    // request data 확인 - 없다면 Null Value 반환
    if (!email || !password) {
        return res
            .status(statuscode.BAD_REQUEST)
            .send(
                util.fail(
                    statusCode.BAD_REQUEST,
                    responseMessage.NULL_VALUE
            ));
    }

    // 존재하는 유저인지 확인 - 없다면 No user 반환
    const user = users.filter(user => user.email === email)[0];
    if (!user) {
        return res
            .status(statusCode.BAD_REQUEST)
            .send(
                util.fail(
                    statusCode.BAD_REQUEST,
                    responseMessage.NO_USER
                )
            );
    }

    // 비밀번호 확인 - 틀렸다면 Missmatch password 반환
    if (user.password !== password) {
        return res
            .status(statusCode.BAD_REQUEST)
            .send(
                util.fail(
                    statusCode.BAD_REQUEST,
                    responseMessage.MISS_MATCH_PW,
                )
            );
    }

    // 성공 - login success와 함께 비밀번호를 제외한 유저 정보 반환
    res.status(statusCode.OK)
        .send(
            util.success(statusCode.OK, responseMessage.LOGIN_SUCCESS, {
                user: {
                    id: user.id,
                    email: user.email,
                    name: user.name
                }
            })
        );
})

// 프로필 조회 구현하기
router.get("/profile/:id", async (req, res) => {
    // request params에서 데이터 가져오기
    const id = req.params.id;

    // 존재하는 아이디인지 확인 - 없다면 No user 반환
    const user = users.filter(user => user.id === Number(id))[0];
    if (!user) {
        return res
            .status(statusCode.BAD_REQUEST)
            .send(
                util.fail(statusCode.BAD_REQUEST, responseMessage.NO_USER)
            )
    }

    // 성공 - login success와 함께 userId 반환
    if (user) {
        return res
            .status(statusCode.OK)
            .send(
                util.success(statusCode.OK, responseMessage.LOGIN_SUCCESS, {
                    user: {
                        id: user.id
                    }
                })
            )
    }
})
module.exports = router;