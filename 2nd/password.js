// WE SOPT SERVER Seminar 2 - Mission - Password
// by HYOSITIVE
// 2021.10.11

const fs = require("fs");
const crypto = require("crypto");

// Read password from the file
const title = 'password';
const password = fs.readFileSync(`${title}.txt`);

// Encrypt password
const hex = crypto.createHash("sha512").update(password).digest("hex");
const iterations = 100000;
const salt = crypto.randomBytes(32).toString("hex");
const keylen = 64;
const digest = "sha512";
const callback = (err, derivedKey) => {
    if (err) throw err;
    const hashed = derivedKey.toString("hex");
    // Write hashed password to the file
    fs.writeFileSync('hashed.txt', hashed);
    console.log(hashed);
};
crypto.pbkdf2(password, salt, iterations, keylen, digest, callback);