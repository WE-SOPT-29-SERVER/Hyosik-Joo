// WE SOPT SERVER Seminar 2 - Crypto
// by HYOSITIVE
// 2021.10.09

const crypto = require("crypto");

const password = "qwerty";
const hex = crypto.createHash("sha512").update(password).digest("hex");
const base64 = crypto.createHash("sha512").update(password).digest("base64");

// console.log("hex: ", hex);
// console.log("\n");
// console.log("base64: ", base64);

const salt = crypto.randomBytes(32).toString("hex");
const iterations = 100000;
const keylen = 64;
const digest = "sha512";
const callback = (err, derivedKey) => {
    if (err) throw err;
    console.log(derivedKey.toString("hex"));
}
crypto.pbkdf2(password, salt, iterations, keylen, digest, callback);

const encrypt = (salt, password) => {
    crypto.pbkdf2(password, salt.toString(), 1, 32, "sha512", (err, derivedKey) => {
        if (err) throw err;
        const hashed = derivedKey.toString("hex");
        console.log("salt: ", salt);
        console.log("hashed: ", hashed);
    });
};

const password = "fl0wer";
const salt = crypto.randomBytes(32).toString("hex");s
encrypt(salt, password);