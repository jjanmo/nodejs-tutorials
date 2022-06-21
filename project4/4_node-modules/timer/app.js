let num = 0;

const id = setInterval(() => {
  console.log(++num);
}, 1000);

setTimeout(() => {
  clearInterval(id);
  console.log('clear interval');
}, 6000);
