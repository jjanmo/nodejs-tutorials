function logThis() {
  console.log(this === global, this); //
}

class A {
  constructor(number) {
    this.number = number;
  }

  logThis() {
    console.log('----in class A----');
    console.log(this === global, this);
  }
}

logThis();

new A(7).logThis();

console.log('--- global scope ---');
console.log(this); // { } → 'this' is not global object

console.log(this === module.exports); // true

// in browser, this === global
// in node, this !== global, === module.exports
