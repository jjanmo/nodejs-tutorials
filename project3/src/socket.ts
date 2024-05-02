import { Server } from 'http'
import { Socket, Server as SocketServer } from 'socket.io'

export const initializeWebSocket = (server: Server) => {
  const io = new SocketServer(server)

  io.on('connection', (socket: Socket) => {
    console.log('Connected to Server 🚀')

    socket.on('create_room', (message: string) => {
      console.log(message)

      socket.broadcast.emit('enter', 'Welcome to the chat room!')
    })
  })

  io.on('close', () => {
    console.log('Disconnected from Browser ✋🏻')
  })

  // const sockets: Sockets = {}
  // const messages: ChatMessage[] = []

  // wss.on('connection', (socket: WebSocket) => {
  //   console.log('Connected to Server 🚀')

  //   socket.on('message', (message: string) => {
  //     const { type, data } = JSON.parse(message)

  //     switch (type) {
  //       case 'connection': {
  //         const nickname = data
  //         setSocket(sockets, socket, nickname)

  //         const connectedMessage: Message<number> = {
  //           type: 'connection',
  //           data: Object.keys(sockets).length,
  //         }
  //         boardcastMessage<Message<number>>(sockets, connectedMessage)

  //         // 시차 문제 해결 필요 → 좀 더 수정 필요
  //         // const _message: Message<ChatMessage[]> = {
  //         //   type: 'messages',
  //         //   data: messages,
  //         // }
  //         // boardcastMessage<Message<ChatMessage[]>>(sockets, _message)
  //         break
  //       }
  //       case 'message': {
  //         const _message: Message<ChatMessage[]> = {
  //           type: 'messages',
  //           data: [...messages, data],
  //         }
  //         // messages.push(data) // TODO 시차 문제 해결 필요
  //         boardcastMessage<Message<ChatMessage[]>>(sockets, _message)
  //         break
  //       }
  //       case 'close': {
  //         const nickname = data
  //         deleteSocket(sockets, nickname)
  //         break
  //       }
  //       default:
  //     }
  //   })

  //   socket.on('close', () => {
  //     console.log('Disconnected from Browser ✋🏻')
  //   })
  // })
}

// function boardcastMessage<T>(sockets: Sockets, message: T) {
//   const socketArray = Object.values(sockets)
//   socketArray.forEach((socket) => socket.send(JSON.stringify(message)))
// }
// function setSocket(sockets: Sockets, socket: WebSocket, key: string) {
//   sockets[key] = socket
// }
// function deleteSocket(sockets: Sockets, key: string) {
//   delete sockets[key]
// }
