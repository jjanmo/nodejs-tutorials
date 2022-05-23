// 전역객체
// in 브라우저 : window
// in 노드 : global
// ✅ 마구잡이로 사용하면 항상 전역변수의 오염 문제를 야기할 수 있다!!

const { getMessage } = require('./globalB');

// console.log(global);

global.message = 'Hello JJanmo ~!';
const message = getMessage();

console.log(message);
