const express = require('express')
const app = express()
const cors = require('cors')
require('dotenv').config()



const mongoose = require('mongoose')


mongoose.connect(process.env.DATABASE_URL)

const db = mongoose.connection

db.on('error', (error) => console.error(error))
db.once('open', () => console.log('Connected to database'))

app.use(express.json())
app.use(cors({
  origin: 'http://localhost:3000'
}))


const contactRouter = require('./routes/contacts')
app.use('/contacts', contactRouter)
app.get('/posts', (req, res) => {
  console.log(req.body)
  res.json(({ status: 'ok' }))
})

app.listen(5000, () => {
  console.log('Server up at 5000')
})