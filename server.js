// 네이버 검색 API예제는 블로그를 비롯 전문자료까지 호출방법이 동일하므로 blog검색만 대표로 예제를 올렸습니다.
// 네이버 검색 Open API 예제 - 블로그 검색
const ID = "NP7hbgdLPOddcqJJePhg";
const KEY = "6WF9C0H4do";

const express = require('express');
const app = express();

const client_id = ID;
const client_secret = KEY;



const request = require('request');

// express의 static 미들웨어 활용
app.use(express.static('public'));

// express의 json 미들웨어 사용
app.use(express.json());

app.get("/",(req,res)=>{
  res.sendFile( __dirname,'index.html');
});


app.get('/search/blog', function (req, res) {
   var api_url = 'https://openapi.naver.com/v1/search/blog?query=' + encodeURI(req.query.query); // json 결과

   var options = {
       url: api_url,
       headers: {
         'X-Naver-Client-Id':client_id, 
         'X-Naver-Client-Secret': client_secret}
    };
    
   request.get(options, function (error, response, body) {
     if (!error && response.statusCode == 200) {
       res.writeHead(200, {'Content-Type': 'text/json;charset=utf-8'});
       res.end(body);
     } else {
       res.status(response.statusCode).end();
       console.log('error = ' + response.statusCode);
     }
   });
 });
 
 app.listen(3000, function () {
  console.log('http://127.0.0.1:3000/ app listening on port 3000!');
});