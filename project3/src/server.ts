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

const server = http.createServer(app)
new WebSocket.Server({ server })

server.listen(PORT, handleListen)
