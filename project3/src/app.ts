import express from 'express'
import path from 'path'

const app = express()

app.set('view engine', 'pug')
app.set('views', process.cwd() + '/src/views')

app.use('/', express.static(path.join(__dirname, 'public')))

app.get('/', (req, res) => res.render('home'))
app.get('/chat')
app.get('/*', (req, res) => res.redirect('/'))

export default app
