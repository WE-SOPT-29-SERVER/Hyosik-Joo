// 필요한 모듈들
const functions = require('firebase-functions'); // firebase 콘솔에 로그를 찍기 위해 사용
const { Pool, Query } = require('pg'); // postgres
const dayjs = require('dayjs'); // 날짜 데이터 사용 용이
const dotenv = require('dotenv');
dotenv.config(); // dotenv를 import하고 config()까지 해 줘야 함!

// DB Config (유저, 호스트, DB 이름, 패스워드)를 로딩해줍시다.
const dbConfig = require('../config/dbConfig');

// NODE_ENV라는 글로벌 환경변수를 사용해서, 현재 환경이 어떤 '모드'인지 판별해줍시다.
let devMode = process.env.NODE_ENV === 'development'; // NODE.ENV는 Node.js가 기본적으로 설정해주는 환경변수. 'development'는 로컬에서 사용한다는 뜻

// SQL 쿼리문을 콘솔에 프린트할지 말지 결정해주는 변수를 선언합시다.
const sqlDebug = true; // 편의성을 위한 설정

// 기본 설정에서는 우리가 실행하게 되는 SQL 쿼리문이 콘솔에 찍히지 않기 때문에,
// pg 라이브러리 내부의 함수를 살짝 손봐서 SQL 쿼리문이 콘솔에 찍히게 만들어 줍시다. 크게 이해할 필요는 없음
const submit = Query.prototype.submit;
Query.prototype.submit = function () {
  const text = this.text;
  const values = this.values || [];
  const query = text.replace(/\$([0-9]+)/g, (m, v) => JSON.stringify(values[parseInt(v) - 1]));
  // devMode === true 이면서 sqlDebug === true일 때 SQL 쿼리문을 콘솔에 찍겠다는 분기입니다.
  devMode && sqlDebug && console.log(`\n\n[👻 SQL STATEMENT]\n${query}\n_________\n`);
  submit.apply(this, arguments);
};

// 서버가 실행되면 현재 환경이 개발 모드(로컬)인지 프로덕션 모드(배포)인지 콘솔에 찍어줍시다.
console.log(`[🔥DB] ${process.env.NODE_ENV}`);

// 커넥션 풀을 생성해줍니다.
const pool = new Pool({
  ...dbConfig,
  connectionTimeoutMillis: 60 * 1000,
  idleTimeoutMillis: 60 * 1000,
});

// 위에서 생성한 커넥션 풀에서 커넥션을 빌려오는 함수를 정의합니다.
// 기본적으로 제공되는 pool.connect()와 pool.connect().release() 함수에 디버깅용 메시지를 추가하는 작업입니다.
const connect = async (req) => { // 디버깅에 용이하도록 req 객체를 먹일 수 있게 수정
  const now = dayjs();
  const string =
    !!req && !!req.method
      ? `[${req.method}] ${!!req.user ? `${req.user.id}` : ``} ${req.originalUrl}\n ${!!req.query && `query: ${JSON.stringify(req.query)}`} ${!!req.body && `body: ${JSON.stringify(req.body)}`} ${
          !!req.params && `params ${JSON.stringify(req.params)}`
        }`
      : `request 없음`;
  const callStack = new Error().stack;
  const client = await pool.connect();
  const query = client.query;
  const release = client.release;

  const releaseChecker = setTimeout(() => {
    devMode
      ? console.error('[ERROR] client connection이 15초 동안 릴리즈되지 않았습니다.', { callStack })
      : functions.logger.error('[ERROR] client connection이 15초 동안 릴리즈되지 않았습니다.', { callStack });
    devMode ? console.error(`마지막으로 실행된 쿼리문입니다. ${client.lastQuery}`) : functions.logger.error(`마지막으로 실행된 쿼리문입니다. ${client.lastQuery}`);
  }, 15 * 1000);

  client.query = (...args) => { // 릴리즈가 제대로 일어나지 않았을 때, 마지막 쿼리 반환
    client.lastQuery = args;
    return query.apply(client, args);
  };
  client.release = () => { // 릴리즈가 늦게 일어났을 때, 요청에 대한 정보 출력
    clearTimeout(releaseChecker);
    const time = dayjs().diff(now, 'millisecond');
    if (time > 4000) {
      const message = `[RELEASE] in ${time} | ${string}`;
      devMode && console.log(message);
    }
    client.query = query;
    client.release = release;
    return release.apply(client);
  };
  return client;
};

module.exports = {
  connect,
};