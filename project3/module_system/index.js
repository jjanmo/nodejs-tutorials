const { odd, even } = require('./var');
const checkNumber = require('./func');

console.log(checkNumber(10));

function checkStrLength(str) {
  if (str.length % 2 === 0) return even;

  return odd;
}

console.log(checkStrLength('hello world'));
