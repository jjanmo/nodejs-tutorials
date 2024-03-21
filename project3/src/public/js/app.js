const socket = new WebSocket(`ws://${window.location.host}`) //

socket.addEventListener('open', () => {
  console.log('Connected to Server 🚀')
})

socket.addEventListener('message', (message) => {
  console.log('New Message from Server: ', message.data)
})

socket.addEventListener('close', () => {
  console.log('Disconnected from Server ✋🏻')
})

setTimeout(() => {
  socket.send('Bye from the Browser!')
}, 1000)
