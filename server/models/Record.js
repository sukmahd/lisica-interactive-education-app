const mongoose = require('mongoose')
const Schema = mongoose.Schema

const recordSchema = new Schema({
  email: {
    type: String,
    required: true
  },
  success: {
    type: Boolean,
    required: true
  },
  repeat: {
    type: Number,
    required: true
  },
  word: {
    type: String,
    required: true
  },
  date: {
    type: Date,
    default: Date.now
  }
})

const Record = mongoose.model('Record', recordSchema)

module.exports = Record
