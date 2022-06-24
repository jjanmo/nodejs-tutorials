const fs = require('fs');
/*
global object in browser 
→ window

global object in node
→ global itself
*/

console.log(global);

global.greeting = () => {
  console.log('hello world');
};

greeting();

//
