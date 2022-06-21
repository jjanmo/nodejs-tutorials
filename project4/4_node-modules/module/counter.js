let count = 0;

const getCount = () => count;
const increase = () => count++;

module.exports.getCount = getCount;
module.exports.increase = increase;

/*
module.exports === exports(앞에 module 생략 가능)

module.exports.getCount 코드의 의미는, 
exports(정확히는 객체의 참고값)의 객체 안에 메소드를 등록하는 과정

그렇기때문에 exports = { ... }  이런 식으로 객체를 새롭게 할당해버리면
기본 exports를 날리고 재할당하는 과정이기때문에 문제가 생길수 있다.

⭐️ 무엇이 어떻게 다른지를 알아야한다.
*/
