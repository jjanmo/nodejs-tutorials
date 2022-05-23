const text = require('./var');

function checkEvenOrOdd(number) {
  if (number % 2 === 0) return text.even;

  return text.odd;
}

// 🌟 아래 둘의 차이점

// exports.checkEvenOrOdd = checkEvenOrOdd;
// → exports라는 객체 안에 속성으로 함수가 존재
// → 모듈을 받을 때 이미 exports 객체 안에 속성의 키값이 존재하기때문에 이름을 바꿔서 받을 수 없다.

module.exports = checkEvenOrOdd;
// → exports에 새로운 함수를 할당한 것
// → 모듈을 받을 때 exports객체를 내보내지만 이것이 익명으로(?) 나가기때문에 이름을 바꿔서 할당 가능

// 결국 다른 파일에서 모듈을 받을 때는 "exports"를 받는 것
// exports에 무엇인지를 파악하는 것이 모듈 안에 무엇이 들어있는지를 파악하는 것
