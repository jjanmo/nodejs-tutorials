import express from 'express'
import path from 'path'
import * as pageController from './controllers'
import * as userController from './controllers/user'

const app = express()

app.set('view engine', 'pug')
app.set('views', process.cwd() + '/src/views')
app.use(express.json()) // express built-in body-parser

app.use('/', express.static(path.join(__dirname, 'public')))

app.get('/', pageController.home)
app.get('/chat', pageController.chat)
app.post('/nickname', userController.postNickname)

app.get('/*', (req, res) => res.redirect('/'))

export default app
