const express = require('express');
const router = express.Router();
const util = require("../lib/util.js");
const responseMessage = require("../constants/responseMessage");
const statusCode = require("../constants/statusCode");
const users = require("../dbMockup/user.js");

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
    const {email, name, password} = req.body;

    if (!email || !name || !password) {
        return res
            .status(statuscode.BAD_REQUEST)
            .send(
                util.fail(
                    statusCode.BAD_REQUEST,
                    responseMessage.NULL_VALUE
            ));
    }

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

    res.status(statusCode.OK)
        .send(
            util.success(statusCode.OK, responseMessage.LOGIN_SUCCESS, user)
        );
})

module.exports = router;