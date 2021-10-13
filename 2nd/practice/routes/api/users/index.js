// WE SOPT SERVER Seminar 2 - routes/api/users/index
// by HYOSITIVE
// 2021.10.14

const express = require("express");
const router = express.Router();

router.get("/", (req, res) => {
    const result = {
        status: 200,
        message: "Manage users here",
    };
    res.status(200).send(result.message);
})

router.use("/signup", require("./signup"));
router.use("/login", require("./login"));

module.exports = router;