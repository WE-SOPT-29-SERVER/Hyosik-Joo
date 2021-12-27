// WE SOPT SERVER Seminar 2 - routes/api/users/login
// by HYOSITIVE
// 2021.10.14

const express = require("express");
const router = express.Router();

router.get("/", (req, res) => {
    const result = {
        status: 200,
        html: `
        <!doctype html>
		<html>
		<head>
		  <title>WEB - Login</title>
		  <meta charset="utf-8">
		</head>
		<body>
            <h1>LOG IN</h1> 
			<form action="/login_process" method="post">
                <p> <input type = "text" name = "email" placeholder = "email"></p>
                <p> <input type = "password" name = "pwd" placeholder = "password"></p>
                <p> <input type = "submit" value = "login"></p>
            </form>
		</body>
		</html>
        `,
    };
    res.status(200).send(result.html);
})

module.exports = router;