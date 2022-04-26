import mongoose from "mongoose"
const { Schema } = mongoose

const eventSchema = new Schema({
  date: Date,
  feat: {
    name: { at: String }
  },
  description: String,
  note: String
})