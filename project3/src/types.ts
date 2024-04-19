export type ChatMessage = {
  nickname: string
  body: string
}
export type MessageType = 'messages' | 'connection' | 'close'
export type Message<T> = {
  type: MessageType
  data: T
}
