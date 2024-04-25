import { Request, Response } from 'express'

export const home = (req: Request, res: Response) => {
  res.render('home', { title: 'Home' })
}

export const chatlist = (req: Request, res: Response) => {
  res.render('chatlist', { title: 'Chat List' })
}

export const chat = (req: Request, res: Response) => {
  res.render('chat', { title: 'Chat Room' })
}
