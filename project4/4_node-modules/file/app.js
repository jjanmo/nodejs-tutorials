const fs = require('fs');

/*
모든 API는 3가지 형태로 제공된다.
1. rename( ..., callback(error, data))
→ 기본적으로 비동기 작업

2. renameSync()
→ 작업 영역이 blocking 되기때문에 작업 중에 에러가 발생하면 작업이 멈추게된다(다음 코드 실행 X)
→ 위와 같은 경우 때문에 항상 try ~ catch가 필요
→ try { renameSync() } catch(e) { }

3. promises.rename().then().catch()
*/

// fs.renameSync('./textsd.txt', './new-text.txt'); // ✅ 다음 코드 수행 못함

try {
  // fs.renameSync('./textsd.txt', './new-text.txt');  // error code
  fs.renameSync('./text.txt', './new-text.txt');
} catch (e) {
  console.error(e);
}

console.log('renameSync done 🚀');

// fs.rename('./new-text2.txt', './text-again.txt', (e) => console.error(e)); // error code : 아래 코드가 실행되고 에러 콜백 실행
fs.rename('./new-text.txt', './text-again.txt', (e) => console.error(e)); // error code : 아래 코드가 실행되고 에러 콜백 실행

console.log('rename done 🚀');

fs.promises
  .rename('./text1.txt', 'text1-promise.txt')
  .then(() => console.log('Done'))
  .catch((e) => console.error(e)); // (e) => console.error(e) → catch(console.erro) : 전달하는 인자가 동일한 경우 이런식으로 사용가능

console.log('promises rename done 🚀');
