const fs = require('fs');

const writeStream = fs.createWriteStream('./file3.txt');
writeStream.on('finish', () => console.log('finished'));

writeStream.write('hello world');
writeStream.write('my name is jjanmo');
writeStream.end(); // 이 메소드를 붙여줘야 스트림이 끝나게 된다!!
