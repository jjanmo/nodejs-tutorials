const form = document.querySelector('form')
const enterBtn = document.querySelector('.enter-btn')
const nicknameInput = document.querySelector('.nickname')

const handleSubmit = (e) => {
  e.preventDefault()
  const nickname = nicknameInput.value
  if (nickname === '') {
    alert('닉네임을 입력해주세요.')
    return
  }

  saveNickname(nickname)
  nicknameInput.value = ''
  window.location.assign('/chat')
}

const saveNickname = (nickname) => {
  const nicknames = getNicknames()
  if (!nicknames.includes(nickname)) {
    nicknames.push(nickname)
    localStorage.setItem('nicknames', JSON.stringify(nicknames))
  }
}

const getNicknames = () => {
  const nicknames = localStorage.getItem('nicknames')
  if (nicknames) {
    const parsedNicknames = JSON.parse(nicknames)
    return parsedNicknames
  }

  return []
}

const init = () => {
  form.addEventListener('submit', handleSubmit)
  enterBtn.addEventListener('submit', handleSubmit)
}

init()
