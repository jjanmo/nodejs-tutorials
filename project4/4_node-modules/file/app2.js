const fs = require('fs').promises;

// read a file
fs.readFile('./sample.txt', 'utf8') // encoding option default : null
  .then(console.log) //
  .catch(console.error);

// write a file
const text = 'hello world my name jjanmo welcome ^@^!!';
fs.writeFile('./file.txt', text) //
  .then(() => {
    // file 내용을 append 한 다음에 파일을 복사하고 싶다면, 반드시 then 이후에 작업이 되도록 코드를 작성해야한다. [순서보장]
    // → 모든 작업이 비동기적으로 처리되기 때문에, then 없이 사용한다면 원하는 결과를 받는다는 보장을 할 수 없다.
    fs.appendFile('./file.txt', '\n' + text + '12345676676') //
      .then(() => {
        fs.copyFile('./file.txt', './file2.txt').catch(console.error);
      })
      .catch(console.error);
  })
  .catch(console.error);

// fs.writeFile('./file.txt', text + '12345676676') //
//   .catch(console.error);
// → 기존 파일에 덥어씀!!

// fs.appendFile('./file.txt', '\n' + text + '12345676676') //
//   .then(() => {
//     // file 내용을 append 한 다음에 파일을 복사하고 싶다면, 반드시 then 이후에 작업이 되도록 코드를 작성해야한다. [순서보장]
//     fs.copyFile('./file.txt', './file2.txt').catch(console.error);
//   })
//   .catch(console.error);
// →  기존 파일 밑에 추가하고 싶을때 append~~

// copy file
// fs.copyFile('./file.txt', './file2.txt') //
//   .catch(console.error);

// folder
fs.mkdir('sub-folder') //
  .catch(console.error);
// → 이미 존재하면 에러!!

// 디렉토리 파일을 읽어서 문자열 배열로 리턴
fs.readdir('./')
  .then(console.log) //
  .catch(console.error);
