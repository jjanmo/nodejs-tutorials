import express from 'express'
import path from 'path'
import http from 'http'
import WebSocket from 'ws'

const PORT = 4000
const app = express()

app.set('view engine', 'pug')
app.set('views', process.cwd() + '/src/views')

app.use('/', express.static(path.join(__dirname, 'public')))

app.get('/', (req, res) => res.render('home'))
app.get('/*', (req, res) => res.redirect('/'))

const handleListen = () => console.log(`Listening on http://localhost:${PORT}`)

const server = http.createServer(app) // create http server
const wss = new WebSocket.Server({ server }) // create websocket server on top of http server

server.listen(PORT, handleListen) // http server & websocket server listen on the same port

wss.on('connection', (socket: WebSocket) => {
  console.log('Connected to Server 🚀')

  socket.on('message', (message: string) => {
    console.log('New Message from Browser: ', message)
  })
  socket.on('close', () => {
    console.log('Disconnected from Browser ✋🏻')
  })

  socket.send('hello from the server')
})
