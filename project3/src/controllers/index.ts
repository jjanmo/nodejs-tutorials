import { Request, Response } from 'express'

export const home = (req: Request, res: Response) => {
  res.render('home', { title: 'Home' })
}

export const chatList = (req: Request, res: Response) => {
  res.render('chats', { title: 'Chat List' })
}

export const chatRoom = (req: Request, res: Response) => {
  const roomName = req.query.roomName as string

  res.render('chatroom', { title: `[Room] ${roomName}` })
}
