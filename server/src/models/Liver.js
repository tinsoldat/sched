const { Schema, model } = require("mongoose")

const schema = new Schema({
  name: {
    type: String,
    required: true
  },
  color: String,
  units: [String],
  description: String,
  urls: {
    youtube: String,
    youtube2: String,
    twitch: String,
    twitter: String,
    twitter2: String,
    nicovideo: String,
    twitcast: String,
    bilibili: String,
    tiktok: String,
    facebook: String,
    weibo: String,
    
  },
  debut: Date
})

module.exports = model('Liver', schema)
