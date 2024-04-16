import WebSocket from 'ws'
import { Server } from 'http'

export const initializeWebSocket = (server: Server) => {
  const wss = new WebSocket.Server({ server })
  const sockets: WebSocket[] = []

  wss.on('connection', (socket: WebSocket) => {
    console.log('Connected to Server 🚀')

    sockets.push(socket)

    socket.on('message', (message: string) => {
      sockets.forEach((socket) => socket.send(`${message.toString()} from server`))
    })

    socket.on('close', () => {
      console.log('Disconnected from Browser ✋🏻')
    })
  })
}
