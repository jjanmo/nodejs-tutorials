import express from 'express'
import path from 'path'
import * as pageController from './controllers'
import * as userController from './controllers/user'

const app = express()

app.set('view engine', 'pug')
app.set('views', process.cwd() + '/src/views')
app.use(express.json()) // express built-in body-parser

app.use('/', express.static(path.join(__dirname, 'public'), { extensions: ['js', 'css'] }))

// TODO1 router 분리 → routers / controllers flow
// TODO2 dynamic routing을 사용하면 script를 못불러온다 why?
app.get('/', pageController.home)
app.get('/chats', pageController.chatList)
app.get('/chatroom', pageController.chatRoom)
app.post('/nickname', userController.postNickname)

app.get('/*', (req, res) => res.redirect('/'))

export default app
