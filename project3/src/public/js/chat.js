import { io } from 'https://cdn.socket.io/4.7.5/socket.io.esm.min.js'

// const chatForm = document.querySelector('.chat-form')
// const input = chatForm.querySelector('input')
// const button = chatForm.querySelector('button')
const socket = io()

console.log('socket', socket)

// socket.addEventListener('open', () => {
//   console.log('Connected to Server 🚀')

//   const nickname = getNickname()
//   const _message = {
//     type: 'connection',
//     data: nickname,
//   }
//   socket.send(JSON.stringify(_message))
// })

// socket.addEventListener('close', () => {
//   console.log('Disconnected from Server ✋🏻')

//   const nickname = getNickname()
//   const _message = {
//     type: 'close',
//     data: nickname,
//   }
//   socket.send(JSON.stringify(_message))
// })

// socket.addEventListener('message', (message) => {
//   const { data, type } = JSON.parse(message.data)

//   switch (type) {
//     case 'connection':
//       renderConnectedNumber(data)
//       break
//     case 'messages':
//       renderMessages(data || [])
//       break
//     case 'close':
//       break
//   }
// })

// const handleSubmit = (event) => {
//   event.preventDefault()
//   const message = input?.value || ''
//   if (message === '') return

//   const nickname = getNickname()
//   const _message = {
//     type: 'message',
//     data: { nickname, body: message },
//   }
//   socket.send(JSON.stringify(_message))
//   input.value = ''
// }

// chatForm.addEventListener('submit', handleSubmit)
// button.addEventListener('click', handleSubmit)

// function renderMessages(messages) {
//   const chatList = document.querySelector('.chat-list')

//   const messageElems = messages.map((message) => {
//     const li = document.createElement('li')
//     li.className = 'message'
//     const nickname = document.createElement('div')
//     nickname.className = 'nickname'
//     nickname.textContent = message.nickname
//     const body = document.createElement('div')
//     body.className = 'body'
//     body.textContent = message.body
//     li.append(nickname, body)
//     return li
//   })

//   chatList.append(...messageElems)
// }

// function renderConnectedNumber(data = 0) {
//   const userCount = document.querySelector('.user-count')
//   userCount.textContent = `현재 접속자 수: ${data}`
// }

// function getNickname() {
//   return JSON.parse(localStorage.getItem('nicknames')).at(-1)
// }
