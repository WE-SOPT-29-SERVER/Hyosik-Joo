SELECT * FROM post;

/-- post 데이터의 개수 --/
SELECT COUNT(*) FROM "post";

/-- post title만 가져오기 --/
SELECT title FROM "post"

/-- 아무 값이나 INSERT 해보기 --/
INSERT INTO "post" (user_id, title, content) VALUES (1, 'TEST', 'This is a test Insert');

/-- id가 3인 데이터 조회하기 --/
SELECT * FROM "post" WHERE id=3;

/-- id가 2인 post 개체들을 모두 출력하기 --/
SELECT * FROM "post" WHERE id=2;

/-- 선택 ) post.sql 내용을 전부 실행시켰다면 user_id가 4인 post+user 개체를 JOIN으로 출력해보기 --/
SELECT * FROM "post" JOIN "user" ON "user".id = "post".user_id WHERE "post".id = 4;

/-- id가 2인 데이터 날짜 현재로 수정하기 --/
UPDATE "post" SET edited_at=now() WHERE id=2;
SELECT * FROM "post" WHERE id=2;

/-- id가 4인 데이터 지우기 --/
DELETE FROM "post" WHERE id=4;