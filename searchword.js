// 네이버 검색 API예제는 블로그를 비롯 전문자료까지 호출방법이 동일하므로 blog검색만 대표로 예제를 올렸습니다.
// 네이버 검색 Open API 예제 - 블로그 검색
var express = require('express');
var app = express();
var client_id = 'ON3loCSF2CLvnJMjKwAC';
var client_secret = 'JFIaAlfp5B';

var news_api_url = 'https://openapi.naver.com/v1/search/news?query=' + encodeURI('대선') + '&display=5&start=1&sort=sim'; // json news 결과
var news_api_des = 'https://openapi.naver.com/v1/search/blog?query=' + encodeURI('대선') + '&display=5&start=1&sort=sim&items=description'; // json news 결과
var blog_api_url = 'https://openapi.naver.com/v1/search/blog?query=' + encodeURI('대선') + '&display=5&start=1&sort=sim'; // json blog 결과
var webkr_api_url = 'https://openapi.naver.com/v1/search/webkr?query=' + encodeURI('대선') + '&display=5&start=1&sort=sim'; // json news 결과

const urls = [news_api_url, blog_api_url, webkr_api_url];


app.get('/search/blog', function (req, res) {
  var request = require('request');
  var options = {
      url: news_api_url,
      headers: {'X-Naver-Client-Id':client_id, 'X-Naver-Client-Secret': client_secret}
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
   console.log('http://127.0.0.1:3000/search/blog?query=검색어 app listening on port 3000!');
 });