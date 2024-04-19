import WebSocket from 'ws'
import { Server } from 'http'
import { ChatMessage, Message, Sockets } from './types'

export const initializeWebSocket = (server: Server) => {
  const wss = new WebSocket.Server({ server })
  const sockets: Sockets = {}
  const messages: ChatMessage[] = []

  wss.on('connection', (socket: WebSocket) => {
    console.log('Connected to Server 🚀')

    socket.on('message', (message: string) => {
      const { type, data } = JSON.parse(message)

      switch (type) {
        case 'connection': {
          const nickname = data
          setSocket(sockets, socket, nickname)

          const _message: Message<number> = {
            type: 'connection',
            data: Object.keys(sockets).length,
          }
          boardcastMessage<Message<number>>(sockets, _message)
          break
        }
        case 'message': {
          const _message: Message<ChatMessage[]> = {
            type: 'messages',
            data: [...messages, data],
          }
          boardcastMessage<Message<ChatMessage[]>>(sockets, _message)
          break
        }
        case 'close': {
          const nickname = data
          deleteSocket(sockets, nickname)
          break
        }
        default:
      }
    })

    socket.on('close', () => {
      console.log('Disconnected from Browser ✋🏻')
    })
  })
}

function boardcastMessage<T>(sockets: Sockets, message: T) {
  const socketArray = Object.values(sockets)
  socketArray.forEach((socket) => socket.send(JSON.stringify(message)))
}
function setSocket(sockets: Sockets, socket: WebSocket, key: string) {
  sockets[key] = socket
}
function deleteSocket(sockets: Sockets, key: string) {
  delete sockets[key]
}
