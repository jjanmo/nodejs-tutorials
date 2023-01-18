import express, { Request, Response } from 'express'
import path from 'path'
import { Server } from 'socket.io'

const app = express()
const port = 8080

app.set('view engine', 'pug')
app.set('views', path.join(__dirname, '../views'))
app.use(express.static(path.join(__dirname, '../public')))

app.get('/', (req: Request, res: Response) => {
  res.render('home')
})

const handleListening = () => {
  console.log(`Listening on http://localhost:${port}`)
}

const server = app.listen(port, handleListening)
const io = new Server(server)
