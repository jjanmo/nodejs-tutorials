const fs = require('fs');

const beforeMem = process.memoryUsage().rss;
// rss : resident set size(상주 세트 크기) : the portion of memory occupied by a process that is held in main memory (RAM)
// 현재 프로세스에서(돌아가는 스레드?) 점유하고 있는 메모리 크기 라고 생각하면 될듯.

fs.readFile('./file.txt', (error, data) => {
  fs.writeFile('./file1.txt', data, () => console.error);

  const afterMem = process.memoryUsage().rss;
  const diff = afterMem - beforeMem;
  const consumed = diff / 1024 / 1024; // beforeMem, afterMem 은 byte단위 → byte * 1024 = KB, KB * 1024 = MB => 이를 역산하는 것
  console.log(`Consumed Memory: ${consumed}MB`); // 결과 : 5MB
  // → 파일 전체를 읽고 쓰는데까지 사용한 메모리
});

// 위 방식은 파일 전체를 읽고 이를 쓰는(write) 방식 : 비효율적
// → 코드상 파일 전체를 다 읽고 난 후에 콜백 함수를 통해서 다음 일(쓰는 작업)이 진행되는 것
// → 버퍼를 이용해서 읽고 쓰고를 반복하는 하면서 순차적으로 처리 : 효율적 → 스트림<app.stream.js 파일>
