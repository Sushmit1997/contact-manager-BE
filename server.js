const express = require('express')
const app = express()
const cors = require('cors')
require('dotenv').config()


const contactRouter = require('./routes/contacts')
const users = require("./routes/users");
const auth = require("./routes/auth");



const mongoose = require('mongoose')

const port = process.env.PORT || 5000


mongoose.connect(process.env.DATABASE_URL)

const db = mongoose.connection

db.on('error', (error) => console.error(error))
db.once('open', () => console.log('Connected to database'))

app.use(express.json())
app.use(cors({
  origin: 'https://contact-manager-lf-fe.herokuapp.com'
}))



app.use('/contacts', contactRouter)
app.use("/users", users);
app.use("/signin", auth);
app.use('/uploads', express.static('uploads'));



app.listen(port, () => {
  console.log(`Server up at ${port}`)
})