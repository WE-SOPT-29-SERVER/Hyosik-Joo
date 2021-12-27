// user table과 상호작용하는 코드
const _ = require('lodash');
const convertSnakeToCamel = require('../lib/convertSnakeToCamel');

const getAllusers = async (client) => {
    const {rows} = await client.query( // query문의 실행 결과를 rows에 삽입
        `
        SELECT * FROM "user" u
        WHERE is_deleted = FALSE
        `, // user은 postgres에서 예약어이기 때문에 따옴표 안에 넣어줘야 함
    );
    return convertSnakeToCamel.keysToCamel(rows);
}

const getUserByID = async(client, userId) => {
    const {rows} = await client.query(
        `
        SELECT * FROM "user" u
        WHERE id = $1
        AND is_deleted = FALSE
        `,
        [userId] // DB와 데이터 타입 불일치 오류 방지하기 위해 이러한 문법 사용, PostgreSQL는 ID를 자동으로 타입캐스팅하기 때문에 신경쓰지 않아도 됨
    )
    return convertSnakeToCamel.keysToCamel(rows[0]); // rows는 배열
}

const updateUser = async(client, userId, username, phone) => {
    const {rows: existingRows} = await client.query(
        `
        SELECT * FROM "user" u
        WHERE id = $1
        AND is_deleted = FALSE
        `,
        [userId],
    )

    if (existingRows.length === 0) return false;

    const data = _.merge({}, convertSnakeToCamel.keysToCamel(existingRows[0]), {username, phone}) // 왼쪽 객체와 오른쪽 객체 merge (왼쪽 객체 우선)

    const {rows} = await client.query(
        `
        UPDATE "user" u
        SET username = $1, phone = $2, updated_at = now()
        WHERE id = $3
        RETURNING * 
        `,
        [data.username, data.phone, userId],
   );
   return convertSnakeToCamel.keysToCamel(rows[0]);
};

const deleteUser = async(client, userId) => {
    const {rows} = await client.query( // delete 작업 시 WHERE 문 꼭 확인!
        `
        UPDATE "user" u
        SET is_deleted = TRUE, updated_at = now()
        WHERE id = $1
        RETURNING *
        `,
        [userId]
    );
    return convertSnakeToCamel.keysToCamel(rows[0]);
}
module.exports = {getAllusers, getUserByID, updateUser, deleteUser}; 