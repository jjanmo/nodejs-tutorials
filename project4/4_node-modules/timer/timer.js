console.log('code1');
console.time('timeout');
setTimeout(() => {
  console.timeEnd('timeout');
  console.log('setTimeout');
}, 0);

console.log('code2');
console.time('immediate');
setImmediate(() => {
  console.timeEnd('immediate');
  console.log('setImmediate');
});

console.log('code3');
console.time('nextTick');
process.nextTick(() => {
  console.timeEnd('nextTick');
  console.log('nextTick');
});

for (let index = 0; index < 1000; index++) {
  console.log(index);
}

/*
setTimeout vs setImmediate
 - I/O 사이클(즉, 메인 모듈) 내에 있지 않은 경우 : 프로세스 성능에 의해 콜백 실행 순서 결정
 - I/O 사이클(즉, 메인 모듈) 내에 있는 경우 : setImmediate의 콜백이 항상 먼저 실행


 */
