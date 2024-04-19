import { WebSocket } from 'ws'

export type ChatMessage = {
  nickname: string
  body: string
}
export type MessageType = 'messages' | 'connection' | 'close' // client → server 로 보낼 때 메시지 타입
export type Message<T> = {
  type: MessageType
  data: T
}

export type Sockets = {
  [key: string]: WebSocket
}
