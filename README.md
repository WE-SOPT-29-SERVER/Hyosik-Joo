# Hyosik-Joo

![github_주효식_ver1](https://user-images.githubusercontent.com/29723695/135609765-8aaba93b-0ee2-4198-880f-9c1660581030.png)

------
   
|    일자    |    차수    |                             주제                             | 복습 / LEVEL 1 | LEVEL 2 | LEVEL 3 |
| :--------: | :----------: | :----------------------------------------------------------: | :------------: | :-----: | ------- |
| 2021.10.02 | 1차 세미나 |                   JavaScript, NodeJs, Git                    |       ✅        |    ✅    | ✅       |
| 2021.10.09 | 2차 세미나 |                비동기 흐름제어, 모듈, Express                |       ✅        |    ✅    | ✅       |
| 2021.10.23 | 3차 세미나 |             HTTP, CRUD, Firebase Cloud Functions             |       ✅        |    ✅    | ✅       |
| 2021.10.30 | 4차 세미나 |                  DB, SQL, NodeJS 연동, RDS                   |       ✅        |         |         |
| 2021.11.13 | 5차 세미나 |       NodeJS 연동, 유저 인증, ERD, REST API, API 문서        |       ✅        |         |         |
| 2021.11.20 | 6차 세미나 |                 클라이언트-서버 합동 세미나                  |       ✅        |         |         |
| 2021.11.27 | 7차 세미나 | Firebase Authentication (회원가입, 로그인, 인증), Firebase Storage (이미지 업로드), API 제작 실전 |       ✅        |    ✅    |         |
| 2021.12.18 | 8차 세미나 |                 컨벤션, 디버깅, 커뮤니케이션                 |       ✅        |         |         |
   
------
   
7주차 과제

LEVEL 2 - 이미지 리사이징
![resizing1](https://firebasestorage.googleapis.com/v0/b/wesopt29-29f3e.appspot.com/o/resizing1.png?alt=media&token=dae1e456-7bbc-479a-8edd-6168b079bb63)
<img src="https://firebasestorage.googleapis.com/v0/b/wesopt29-29f3e.appspot.com/o/resizing2.png?alt=media&token=dae1e456-7bbc-479a-8edd-6168b079bb63" width="30%" height="30%">

LEVEL 3 - JWT 생성 로직에서의 Refresh Token

Access Token만을 사용하는 기존의 인증 방식은 토큰을 제 3자에게 탈취당할 경우 보안에 취약하다는 단점이 존재한다. 이를 해결하기 위해 토큰의 유효기간을 짧게 할 경우, 사용자에게 요구되는 로그인 횟수가 늘어나 번거롭고, 유효기간을 길게 할 경우 탈취당했을 때의 취약성이 더욱 커진다. 이를 해결하기 위해 고안된 방법이 바로 Refresh Token과 Access Token을 함께 사용하는 것이다.

사용자가 최초 로그인을 완료했을 경우, Access Token과 Refresh Token이 동시에 발급되는데, 일반적으로 Access Token은 1시간, Refresh Token은 2주 정도의 유효 기간을 가진다. Access Token이 만료되더라도, Refresh Token이 만료되지 않았을 경우, 이를 통해 Access Token을 재발급받을 수 있다. 이를 통해 Access Token 탈취에 의한 보안 취약점을 극복하면서, 사용자의 재로그인에 따른 번거로움도 해결할 수 있다.

하지만 이 방법에는 구현이 복잡하고, Access Token을 재발급할 때마다 HTTP 요청이 계속 발생해 서버의 자원 낭비가 심해진다는 단점도 존재한다. Refresh Token마저 탈취당하는 경우가 발생하지는 않을까? 라는 의문을 가지기도 했는데, Refresh Token은 서버 측에 보관하기 때문에 Access Token보다는 더 안전하다고 한다. 
