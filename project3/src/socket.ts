import WebSocket from 'ws'
import { Server } from 'http'
import { ChatMessage, Message } from './types'

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

      const _message: Message<ChatMessage[]> = {
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
  const _message: Message<number> = {
    type: 'connection',
    data: sockets.length,
  }
  sockets.forEach((socket) => socket.send(JSON.stringify(_message)))
}
