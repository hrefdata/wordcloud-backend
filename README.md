# wordcloud-backend

1. 사용한 npm list

   | npm list |
   | -------- |
   | express  |
   | request  |
   | dotenv   |
   | koalanlp |

2. wordcloud-backend 설명

- main : server.js
- server.js -> index.html -> script.js -> server.js -> script.js

> - 입력한 text를 script.js에서 debouncer(2초)를 통한 입력을 받고 server.js로 넘긴 후 Naver api를 이용해서 검색된 값을 긁어 온 후 KoalaNLP로 명사만 추출.
> - 명사의 빈도수를 계산하고, 내림차순 정렬 후의 객체를 script.js로 넘겨서 targetTextArea에 출력.

3. 참고

#### [KoalaNLP](https://github.com/koalanlp/nodejs-support)
