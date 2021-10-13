// WE SOPT SERVER Seminar 2 - routes/api/index.js
// by HYOSITIVE
// 2021.10.14

const express = require("express"); // express 모듈 불러오기
const router = express.Router(); // Router() 미들웨어 불러오기

router.get("/", (req, res) => { // Get method api/ 요청이 들어온다
    const result = {
        status: 200,
        message: "api~!",
    };
    res.status(200).send(result);
});

router.use("/blog", require("./blog"));
router.use("/users", require("./users"));

module.exports = router; // 생성한 router 객체를 모듈로 반환