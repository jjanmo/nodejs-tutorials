const $form = document.querySelector('form')
const $input = document.querySelector('input')
const $button = document.querySelector('button')
// const $list = document.querySelector('ul')

const socket = new WebSocket(`ws://${window.location.host}`)

socket.addEventListener('open', () => {
  console.log('Connected to Server 🚀')
})

socket.addEventListener('message', (message) => {
  console.log('New Message: ', message.data)
})

socket.addEventListener('close', () => {
  console.log('Disconnected from Server ✋🏻')
})

const handleSubmit = (event) => {
  event.preventDefault()
  const message = $input?.value || ''
  if (message === '') return

  socket.send(message)
  $input.value = ''
}

$form.addEventListener('submit', handleSubmit)
$button.addEventListener('click', handleSubmit)
