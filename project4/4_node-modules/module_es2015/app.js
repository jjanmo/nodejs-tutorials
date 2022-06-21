import { getCount, increase } from './counter.js';
// import * as counter from './counter.js'
// → const counter = require('./counter/js') 처럼 사용가능

console.log(getCount());
increase();
increase();
increase();
console.log(getCount());
