#!/usr/bin/env node
// import * as readline from 'node:readline/promises'a
const readline = require('readline')

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
})

function repeatQuestion(answer: string) {
  console.clear()
  if (answer === '예') {
    console.log('열심히 하세요')
    rl.close()
  } else if (answer === '아니요') {
    console.log('그럼 리액트 공부하세요')
    rl.close()
  } else {
    console.log('예, 아니오 로만 대답할 수 있습니다.')
    rl.question('노드 공부를 해야합니까?!', repeatQuestion)
  }
}

rl.question('노드 공부를 해야합니까?!', repeatQuestion)
