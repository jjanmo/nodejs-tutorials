import WebSocket from 'ws'
import { Server } from 'http'
import { ChatMessage } from './types'

export const initializeWebSocket = (server: Server) => {
  const wss = new WebSocket.Server({ server })
  const sockets: WebSocket[] = []
  const messages: ChatMessage[] = []

  wss.on('connection', (socket: WebSocket) => {
    console.log('Connected to Server 🚀')

    sockets.push(socket)
    sendConnectedNumber(sockets)

    socket.on('message', (message: string) => {
      const parsed = JSON.parse(message)
      messages.push(parsed)

      const _message = {
        type: 'messages',
        data: messages,
      }
      sockets.forEach((socket) => socket.send(JSON.stringify(_message)))
    })

    socket.on('close', () => {
      console.log('Disconnected from Browser ✋🏻')
    })
  })
}

function sendConnectedNumber(sockets: WebSocket[]) {
  const _message = {
    type: 'connected',
    data: sockets.length,
  }
  sockets.forEach((socket) => socket.send(JSON.stringify(_message)))
}
