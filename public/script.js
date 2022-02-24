// const {initialize} = require("koalanlp/Util");
// const {Tagger} = require("koalanlp/proc");
// const {EUNJEON} = require("koalanlp/API");
// import {initialize} from './node_modules/koalanlp/Util';
// import {Tagger} from './node_modules/koalanlp/API';
// import {EUNJEON} from './node_modules/koalanlp/API';


const textAreaArray = document.querySelectorAll('textarea');
console.log(textAreaArray);

// 변수 네이밍 컨벤션, 도메인과 관련된 용어 정의

// source : 번역할 텍스트와 관련된 명칭
// target : 번역된 결과와 관련된 명칭

const [sourceTextArea, targetTextArea] = textAreaArray;


let debouncer;


sourceTextArea.addEventListener('input', (event) => {

  if(debouncer) { // 값이 있으면 true, 없으면 false
    clearTimeout(debouncer);
  }

  debouncer = setTimeout(()=>{
    const text = event.target.value; // textArea에 입력한 값.

    if(text) {
      const xhr = new XMLHttpRequest();

      const url = '/news';

      xhr.onreadystatechange = () => {
        if (xhr.readyState == 4 & xhr.status == 200) {


          const responseData = xhr.responseText;
          console.log(`responseData: ${responseData}, type: ${typeof responseData}`);
          const parseJsonToObject = JSON.parse(responseData);

          // console.log(typeof parseJsonToObject, parseJsonToObject);

          // const items = parseJsonToObject['items'][0]['description']; 
         
          var arrResult = new Array();
          var index_r = 0;
          for (i of Object.keys(parseJsonToObject)) {
            arrResult[index_r] = i; 
            index_r++;
          }
          
          
          for(var i = 0; i < 30 ; i++){
            console.log(arrResult[i]);
            targetTextArea.value += arrResult[i] + ",";
          }
          
          
        }
      };

      xhr.open("POST", url);

      xhr.setRequestHeader("Content-type", "application/json");
      
      const requestData = { // typeof : object
        text
      };

      // JSON(Javascript Object notation)의 타입은 ? string
      // 내장모듈 JSON 활용.
      // 서버에 보낼 데이터를 문자열화 시킴.
      jsonToString = JSON.stringify(requestData);
      // console.log(typeof jsonToString); // type: string
    
      // xhr : XMLHttpRequest
      xhr.send(jsonToString);

    } else {
      console.log('번역할 텍스트를 입력하세요.');
      // alert('번역할 텍스트를 입력하셔야죠!');
    }
  }, 2000);
});

