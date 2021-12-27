// WE SOPT SERVER Seminar 2 - routes/api/blog/post.js
// by HYOSITIVE
// 2021.10.14

const express = require("express");
const router = express.Router();

router.get("/", (req, res) => {
    const result = {
        status: 200,
        message: "Let's post some articles!",
    };
    res.status(200).send(result.message);
});

module.exports = router;