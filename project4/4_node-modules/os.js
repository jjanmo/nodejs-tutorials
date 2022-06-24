const os = require('os');
// console.log(os); os info
// → 서버가 사용하고 있는 운영체제에대한 정보를 얻고자 할 때 해당 모듈을 이용할 수 있다.

// 운영체제 고유의 줄바꿈 문자열
console.log(os.EOL === '\n'); // mac EOL
console.log(os.EOL === '\r\n'); // windoe EOL

console.log(os.totalmem()); // 최종 메모리
console.log(os.freemem()); // 사용가능 메모리
console.log(os.type()); // 운영체제 타입
console.log(os.userInfo()); // 사용자 정보
console.log(os.cpus());
console.log(os.homedir());
console.log(os.hostname());
