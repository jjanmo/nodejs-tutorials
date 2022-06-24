const process = require('process');

console.log(process.execPath); // 현재실행 중인 노드(프로세스)의 실행 경로
console.log(process.version);
console.log(process.pid);
console.log(process.ppid);
console.log(process.platform);
console.log(process.env);
console.log(process.uptime()); // the number of seconds the current Node.js process has been running
console.log(process.cwd()); // 현재 작업 디렉토리를 반환 "cwd : current working directory"
console.log(process.cpuUsage());

setTimeout(() => {
  console.log('setTimeout');
}, 0);

process.nextTick(() => {
  console.log('nextTick1');
});

process.nextTick(() => {
  console.log('nextTick2');
});

// nextTick
// → 콜스택이 비어있을 때, 콜백함수가 실행되는데,
// 이 때 테스크 큐에 이미 다른 콜백함수가 들어있어도 nextTick에서의 콜백함수의 우선순위를 최우선으로 해서 실행하도록 만들어주는 것
// 그래서 출력값이 nextTick → setTimeout 순으로 출력된 것!!
// + nextTick 끼리의 순서를 호출되는 순서에 따르는듯..

for (let index = 0; index < 1000; index++) {
  console.log(index);
}
