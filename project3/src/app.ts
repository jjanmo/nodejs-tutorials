import express from 'express'
import path from 'path'
import * as pageController from './controllers'
import * as userController from './controllers/user'

const app = express()

app.set('view engine', 'pug')
app.set('views', process.cwd() + '/src/views')
app.use(express.json()) // express built-in body-parser

app.use('/', express.static(path.join(__dirname, 'public'), { extensions: ['js', 'css'] }))

// TODO router 분리 → routers / controllers flow
app.get('/', pageController.home)
app.get('/chatroom', pageController.chatRoom)
app.get('/chats', pageController.chatList)
app.post('/nickname', userController.postNickname)

app.get('/*', (req, res) => res.redirect('/'))

export default app
