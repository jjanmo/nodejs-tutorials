import { io } from 'https://cdn.socket.io/4.7.5/socket.io.esm.min.js'

const socket = io()

const form = document.querySelector('form')
const createBtn = document.querySelector('.create-btn')
const roomInput = document.querySelector('#room')

const handleSubmit = async (e) => {
  e.preventDefault()
  const roomName = roomInput.value
  if (roomName === '') {
    alert('채팅방을 입력해주세요.')
    return
  }
  socket.emit('create_room', roomName)

  window.location.assign(`/chatroom?room=${roomName}`)
}

const init = () => {
  form.addEventListener('submit', handleSubmit)
  createBtn.addEventListener('click', handleSubmit)
}

init()
