import express from 'express'
import path from 'path'

const PORT = 4000
const app = express()

app.set('view engine', 'pug')
app.set('views', process.cwd() + '/src/views')

app.use('/', express.static(path.join(__dirname, 'public')))

app.get('/', (req, res) => res.render('home'))
app.get('/*', (req, res) => res.redirect('/'))

app.listen(PORT, () => console.log(`Listening on http://localhost:${PORT}`))
