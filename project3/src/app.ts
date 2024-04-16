import express from 'express'
import path from 'path'
import * as controller from './controllers'

const app = express()

app.set('view engine', 'pug')
app.set('views', process.cwd() + '/src/views')

app.use('/', express.static(path.join(__dirname, 'public')))

app.get('/', controller.home)
app.get('/chat', controller.chat)
app.get('/*', (req, res) => res.redirect('/'))

export default app
