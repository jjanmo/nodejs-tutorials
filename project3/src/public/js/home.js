const form = document.querySelector('form')
const enterBtn = document.querySelector('.enter-btn')
const nicknameInput = document.querySelector('.nickname')

const handleSubmit = async (e) => {
  e.preventDefault()
  const nickname = nicknameInput.value
  if (nickname === '') {
    alert('닉네임을 입력해주세요.')
    return
  }

  try {
    const response = await postNickname('/nickname', { nickname })
    const { status } = response
    if (status === 'success') {
      window.location.assign('/chats')
    }
  } catch (e) {
    console.error(e)
  } finally {
    nicknameInput.value = ''
  }
}

async function postNickname(url, data) {
  const response = await fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  })

  return response.json()
}

const init = () => {
  form.addEventListener('submit', handleSubmit)
  enterBtn.addEventListener('submit', handleSubmit)
}

init()
