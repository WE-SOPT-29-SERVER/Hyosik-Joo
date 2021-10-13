// WE SOPT SERVER Seminar 2 - routes/api/users/signup
// by HYOSITIVE
// 2021.10.14

const express = require("express");
const router = express.Router();

router.get("/", (req, res) => {
    const result = {
        status: 200,
        html: `<!doctype html>
		<html>
		<head>
		  <title>WEB - Signup</title>
		  <meta charset="utf-8">
		</head>
		<body>
            <h1>SIGN UP</h1> 
			<form action="/signup_process" method="post">
                <p> <input type = "text" name = "email" placeholder = "email"></p>
                <p> <input type = "password" name = "pwd" placeholder = "password"></p>
                <p> <input type = "submit" value = "sign up"></p>
            </form>
		</body>
		</html>
		`,
    };
    res.status(200).send(result.html);
})

module.exports = router;