// const {initialize} = require("koalanlp/Util");
// const {Tagger} = require("koalanlp/proc");
// const {EUNJEON} = require("koalanlp/API");
import {initialize} from './node_modules/koalanlp/Util';
import {Tagger} from './node_modules/koalanlp/API';
import {EUNJEON} from './node_modules/koalanlp/API';


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
          const parseJsonToObject = JSON.parse(JSON.parse(responseData));

          console.log(typeof parseJsonToObject, parseJsonToObject);

          // const items = parseJsonToObject['items'][0]['description']; 
          const display = parseJsonToObject['display']; 

          var description;
          for(var i = 0; i < display ; i++){
            description = description + parseJsonToObject['items'][i]['description'];
          }
          
          // console.log(description);
        
          // targetTextArea.value = description;

          //description : 검색 api로 검색한 news의 description들의 값들
          
          //------------------------------------------------지금 부터는 text를 가져와서 KoalaNLP로 명사들 추출 후 빈도수 계산
          
          var arrResult = new Array();
          
          // await initialize({packages: {EUNJEON: 'LATEST'}})  //KMR, ETRI, EUNJEON, ARIRANG, DAON, RHINO, OKT, KKMA, HNN, KHAIII
          initialize({packages: {EUNJEON: 'LATEST'}}).then(() => {
            let tagger = new Tagger(EUNJEON);
            const text = description; 
            // let tagged = await tagger(text);
            
            var arrNumber = new Array();
            var index = 0;
            tagger(text).then((tagged) => {
              tagged.forEach((sent, i) => {
                  console.log(`===== Sentence #${i} =====`);
                  console.log(sent.surfaceString());
          
                  console.log("# Analysis Result");
                  // console.log(sent.singleLineString());
                  sent.forEach((word) => {
                        // console.log(`Word [${word.id}] ${word.surface} = `);
          
                      // word.forEach((morph) => {
                      //     console.log(`${morph.surface}/${morph.tag} `);
                      // });
                      
                      word.forEach((morph) =>{
                        if(morph.tag['tagname'] == 'NNP' || morph.tag['tagname'] == 'NNG'){
                          // console.log(morph.surface);
                          arrNumber[index] = morph.surface;
                          // console.log(index);
                          // console.log(morph.surface);
                          index++;
                        }
                      })
          
                  });
              });
          
              const result = {};
              arrNumber.forEach((x) => { 
                result[x] = (result[x] || 0)+1; 
              });
              
          
              const sortable = Object.entries(result)
              .sort(([, a], [, b]) => b - a)
              .reduce((r, [k, v]) => ({ ...r, [k]: v }), {});
          
              console.log(typeof sortable, sortable);
              
              // console.log(JSON.stringify(sortable));
              
              console.log(Object.keys(sortable));
              
              // console.log(Object.keys.sortable[0])
          
              var index_r = 0;
              for (i of Object.keys(sortable)) {
                arrResult[index_r] = i; 
                index_r++;
              }
          
              console.log('finished!');
            }, (error) => console.error('Error Occurred', error));
            
          }, (error) => console.error('Error Occurred!', error));
          
          
          for(var i = 0; i < 30 ; i++){
            console.log(arrResult[i]);
            targetTextArea.value = arrResult[i];
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

