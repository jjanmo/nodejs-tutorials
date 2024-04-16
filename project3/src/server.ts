import http from 'http'
import app from './app'
import 'dotenv/config'
import { initializeWebSocket } from './socket'

const server = http.createServer(app)

initializeWebSocket(server)

server.listen(process.env.PORT, () =>
  console.log(`Listening on http://localhost:${process.env.PORT}`)
)
