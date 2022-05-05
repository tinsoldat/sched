const { Schema, model } = require("mongoose")

const schema = new Schema({
  date: Date,
  feat: [
    [String, String]
  ],
  description: String,
  note: String
})

module.exports = model('Event', schema)