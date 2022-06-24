/*
What is buffer
Fixed-size chunk of memory : 고정된 사이즈의 메모리 덩어리
Array of integers, byte of data → 코드적으로 바라본 버퍼 : 숫자 배열, 바이트 데이터 

버퍼 : 일정한 메모리 공간에 있는 바이트 단위의 데이터
버퍼링 : 버퍼에 데이터를 가득 차게 모아놓는 작업

스트림 : 데이터의 흐름
→ 버퍼에 데이터가 차면 이를 전송하고 새로운 버퍼에 데이터를 채우고 전송하는 작업을 연속으로 하는 것
*/

const buf = Buffer.from('Hello World');
console.log(buf); // 유니코드 형태로 출력
console.log('------------');
console.log(buf.length); // 배열 형태로서 length 존재, index로 접근 가능
console.log(buf[1]); // 이 때에는 아스키코드 형태로 출력  101 => e
console.log(buf[3]); // 108 => l
console.log(buf[5]); // 32 => Space
console.log(buf[6]); // 87 => W
console.log('------------');
console.log(buf.toString()); // 인자로 인코딩 방식 전달 가능 기본값 utf-8
console.log('------------');
// create
const buf2 = Buffer.alloc(2);
// Allocates a new Buffer of size bytes + 초기화
const buf3 = Buffer.allocUnsafe(2);
// Allocates a new Buffer of size bytes + (메모리가 부족한 경우)초기화가 되어있지 않을 수 있다 → but fast
console.log(buf2, buf3);
buf2[0] = 72;
buf2[1] = 105;
console.log('버퍼 할당', buf2);
buf2.copy(buf3);
console.log(buf2.toString());
console.log(buf3.toString());
console.log('------------');
const newBuffer = Buffer.concat([buf, buf2, buf3]);
console.log(newBuffer, newBuffer.toString());
