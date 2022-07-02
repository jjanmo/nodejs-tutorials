// piping 🚀

const fs = require('fs');
const zlib = require('zlib'); // 압축모듈

const readStream = fs.createReadStream('./file.txt');
const zlibStream = zlib.createGzip();
const writeStream = fs.createWriteStream('./file4.zip');

// const piping = readStream.pipe(writeStream); // 2개만 연결
const piping = readStream.pipe(zlibStream).pipe(writeStream); // 중간에 추가적으로 더 연결이 가능(진짜 파이프같은 ~~)
// → 최종파일 내용이 압축된 상태로 보이는 것을 확인할 수 있다.(압축파일로 변경)

piping.on('finish', () => {
  console.log('done');
});

/*
스트림에 대한 좋은 글
https://jeonghwan-kim.github.io/node/2017/07/03/node-stream-you-need-to-know.html
*/

// piping 예시
const http = require('http');
const server = http.createServer((req, res) => {
  // 1)
  // fs.readFile('file.txt', (err, data) => res.end(data)); // 서버가 켜지고 파일을 다 읽은(read) 후에 메모리의 데이터를 보내준다(send)

  // 2)
  const stream = fs.createReadStream('./file.txt');
  stream.pipe(res); // response에 pipe()로 연결하는 것이 더 좋음 why??
});
server.listen(3000);
