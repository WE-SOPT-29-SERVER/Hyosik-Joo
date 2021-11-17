const convertSnakeToCamel = require('../lib/convertSnakeToCamel');

const getAllusers = async (client) => {
    const {rows} = await client.query(
        `
        SELECT * FROM "user" u
        WHERE is_deleted = FALSE
        `,
    );
    return convertSnakeToCamel.keysToCamel(rows);
}

module.exports = {getAllusers};