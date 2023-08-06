import express from 'express'

const PORT = 4000
const app = express()

app.listen(PORT, () => console.log(`Listening on http://localhost:${PORT}`))
