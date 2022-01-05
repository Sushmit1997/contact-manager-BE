const mongoose = require('mongoose')

const contactSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  number: {
    type: Number,
    required: true
  },
  image: {
    type: String,
  },
  address: {
    type: String
  },
  email: {
    type: String
  }
})


module.exports = mongoose.model('Contact', contactSchema)