const { Schema, model } = require("mongoose")

const schema = new Schema({
  date: Date,
  feat: {
    type: Map,
    of: String
  },
  description: String,
  note: String
})

module.exports = model('Event', schema)