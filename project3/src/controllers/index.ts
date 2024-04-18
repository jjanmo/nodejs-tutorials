import { Request, Response } from 'express'

const dummyMessages = [
  {
    nickname: 'jjanmo',
    body: '안녕하세요',
  },
  {
    nickname: 'leonard',
    body: '하욤!!!',
  },
  {
    nickname: 'jjanmo',
    body: '잘지내니? 오랜만이쿤!!',
  },
  {
    nickname: 'leonard',
    body: '너도 오랜만이구나!!',
  },
]

export const home = (req: Request, res: Response) => {
  res.render('home', { title: 'Home' })
}

export const chat = (req: Request, res: Response) => {
  res.render('chat', { title: 'Chat', messages: dummyMessages })
}
