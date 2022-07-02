const fs = require('fs');

const readStream = fs.createReadStream('./file.txt', {
  highWaterMark: 8, // 읽고 쓸때 얼마만큼의 사이즈로 읽고 쓸지를 결정하는 값 <default : 64kbytes>
  encoding: 'utf-8',
});

// 'readStream' 이라는 스트림을 이용해서 데이터를 순차적으로 읽어올 수 있다.
// → stream에 이벤트를 등록할 수 있다.

const data = [];
// 1)
// readStream.on('data', (chunk) => {
//   console.count('data');
//   data.push(chunk);
// });
// readStream.on('end', () => {
//   console.log(data.join(''));
// });
// readStream.on('error', (error) => console.log(error));

// 2)
// on => 자기자신(ReadStream)을 리턴 => 메서드체인가능
// once : 1번만 실행
readStream
  .on('data', (chunk) => {
    console.count('data');
    data.push(chunk);
  })
  .on('end', () => {
    console.log(data.join(''));
  })
  .on('error', (error) => console.log(error));
