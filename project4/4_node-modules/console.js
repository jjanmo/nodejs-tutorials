// log level
console.log('log'); // 개발 ing~~
console.info('info'); // 정보
console.warn('warn'); // 경고
console.error('error'); // 에러 : 사용자 에러 | 시스템 에러

// assert : 첫번째 인자의 값이 true가 아닌 경우에만 메세지를 출력한다.
// → 특정 조건인 경우에만 콘솔을 출력하고 싶을 때 사용할 수 있다. 👍
console.assert(2 === 3, 'wrong');
console.assert(2 === 2, 'correct');
