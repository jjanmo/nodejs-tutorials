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

  window.location.assign('/chatroom')
}

const init = () => {
  form.addEventListener('submit', handleSubmit)
  createBtn.addEventListener('click', handleSubmit)
}

init()
