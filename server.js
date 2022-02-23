const express = require("express"); // express 패키지 import

const app = express();

// API Key를 별도 관리 : dot(.) env 활용, .env라는 파일에 key를 보관하고, dotenv가 .env파일을 활용해서, process.env 객체에 포함시킴.

const dotenv = require("dotenv");
dotenv.config();

const clientId = process.env.client_id
const clientSecret = process.env.CLIENT_SECRET

//node.js 서버가 또 다른 client가 되어 Naver 서버에 요청을 보내기 위해 사용.
const request = require('request');

// express의 static 미들웨어 활용.
app.use(express.static('public'));

// express의 json 미들웨어 활용.
app.use(express.json());


app.get("/",(req, res) => {
  // root url, 즉 메인 페이지로 접속했을 때 papago의 메인 페이지가 나와야함.
  // public / ~
  res.sendFile(__dirname, 'index.html');
});

app.post("/news", (req, res) => {

  console.log(req.body);
  console.log(typeof req.body); 

  const { text:query} = req.body;

  const url = "https://openapi.naver.com/v1/search/news.json?query=" + encodeURI(query) + "&display=10&start=1&sort=sim";
  //  + encodeURI(query) + "&display=10&start=1&sort=sim";
  
  const options = {
    url: url,
    headers: {
        "X-Naver-Client-Id": clientId,
        "X-Naver-Client-Secret": clientSecret,
    }

  };

  request.get(options, (error, response, body) => { 
    if(!error && response.statusCode == 200){

      res.json(body);
    }else{
      console.log(`error = ${response.statusCode}`);
    }
  });
});




app.listen(3000, () => {
  console.log('http://127.0.0.1:3000/ app listening on port 3000!');
});