const dotenv = require('dotenv'); // .env에서 환경변수 파일을 가져오기 위한 모듈
dotenv.config();

module.exports = {
    user: process.env.DB_USER,
    host: process.env.DB_HOST,
    database: process.env.DB_DB,
    password: process.env.DB_PASSWORD
}