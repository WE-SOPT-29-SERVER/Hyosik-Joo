// WE SOPT SERVER Seminar 2 - routes/api/blog/index.js
// by HYOSITIVE
// 2021.10.14

const express = require("express");
const router = express.Router();

router.get("/", (req, res) => {
    const result = {
        status: 200,
        message: "Welcome to the blog!",
    };
    res.status(200).send(result.message);
})

router.use("/post", require("./post"));

module.exports = router;