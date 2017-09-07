const mongoose = require('mongoose')
const Schema = mongoose.Schema

const recordSchema = new Schema({
  email: {
    type: String,
    require: true
  },
  data: {
    success: Boolean,
    skip: Boolean,
    repeat: Number,
    word: String,
    data: {
      type: Date,
      default: Date.now
    }
  }
})

const Record = mongoose.model('Record', recordSchema)

module.exports = Record
