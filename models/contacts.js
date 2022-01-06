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
    required: true
  },
  address: {
    type: String
  },
  email: {
    type: String
  },
  isFavourite: {
    type: Boolean
  },
  createdBy: {
    type: String,
    required: true
  }
})


module.exports = mongoose.model('Contact', contactSchema)