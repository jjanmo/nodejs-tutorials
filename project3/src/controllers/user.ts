import { Request, Response } from 'express'
import db from '../db'

export const postNickname = (req: Request, res: Response) => {
  const nickname = req.body.nickname

  const selectQuery = db.prepare('SELECT * FROM user WHERE nickname = ?')
  const user = selectQuery.get(nickname)
  if (!user) {
    const insertQuery = db.prepare('INSERT INTO user (nickname) VALUES (?)')
    const info = insertQuery.run(nickname)

    if (info.changes === 0) {
      res.status(400).send({
        status: 'error',
        message: 'Failed to save nickname',
      })
      return
    }
  }

  res.status(201).send({
    status: 'success',
    message: 'Nickname saved',
  })
}
