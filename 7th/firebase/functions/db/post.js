// post table과 상호작용하는 코드
const _ = require('lodash');
const convertSnakeToCamel = require('../lib/convertSnakeToCamel');

const getAllposts = async (client) => {
    const {rows} = await client.query( // query문의 실행 결과를 rows에 삽입
        `
        SELECT * FROM "post" p
        WHERE is_deleted = FALSE
        `, // user은 postgres에서 예약어이기 때문에 따옴표 안에 넣어줘야 함
    );
    return convertSnakeToCamel.keysToCamel(rows);
}

const getPostByID = async(client, postId) => {
    const {rows} = await client.query(
        `
        SELECT * FROM "post" p
        WHERE id = $1
        AND is_deleted = FALSE
        `,
        [postId] // DB와 데이터 타입 불일치 오류 방지하기 위해 이러한 문법 사용, PostgreSQL는 ID를 자동으로 타입캐스팅하기 때문에 신경쓰지 않아도 됨
    )
    return convertSnakeToCamel.keysToCamel(rows[0]); // rows는 배열
}

const updatePost = async(client, postId, title, content) => {
    const {rows: existingRows} = await client.query(
        `
        SELECT * FROM "post" p
        WHERE id = $1
        AND is_deleted = FALSE
        `,
        [postId],
    )

    if (existingRows.length === 0) return false;

    const data = _.merge({}, convertSnakeToCamel.keysToCamel(existingRows[0]), {title, content}) // 왼쪽 객체와 오른쪽 객체 merge (왼쪽 객체 우선)

    const {rows} = await client.query(
        `
        UPDATE "post" p
        SET title = $1, content = $2, edited_at = now()
        WHERE id = $3
        RETURNING * 
        `,
        [data.title, data.content, postId],
   );
   return convertSnakeToCamel.keysToCamel(rows[0]);
};

const deletePost = async(client, postId) => {
    const {rows} = await client.query( // delete 작업 시 WHERE 문 꼭 확인!
        `
        UPDATE "post" p
        SET is_deleted = TRUE, edited_at = now()
        WHERE id = $1
        RETURNING *
        `,
        [postId]
    );
    return convertSnakeToCamel.keysToCamel(rows[0]);
}

const postPost = async(client, user_id, title, content) => {
    const {rows} = await client.query(
        `
        INSERT INTO "post" (user_id, title, content, created_at, edited_at, is_deleted)
        VALUES ($1, $2, $3, now(), now(), false)
        `,
        [user_id, title, content]
    );
    return convertSnakeToCamel.keysToCamel(rows[0]);
}

module.exports = {getAllposts, getPostByID, updatePost, deletePost, postPost}; 