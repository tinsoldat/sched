const { Schema, model } = require("mongoose")

const schema = new Schema({
  name: {
    type: String,
    required: true
  },
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
    
  }
})

module.exports = model('Liver', schema)

// w.reduce((acc, val) => {
//   let name = val.name
//   let url = val.url
//   let cur
//   let pl = url?.match(/(twitch)|(youtube)|(twitter)|(twitcasting)|(weibo)|(nicovideo)|(tiktok)|(bilibili)/)?.filter((val, i) => {
//       return i > 0 && val
//   })[0]
//   if (!pl) return acc
//   if (acc.every((v) => {
//           if (v.name === name) {
//               cur = v
//               return false
//           } else return true
//       })) acc.push({
//       name: name,
//       urls: {
//           [pl]: url
//       }
//   })
//   else {
//       if (cur.urls[pl]) cur.urls[pl + '2'] = url
//       else cur.urls[pl] = url
//   }
//   return acc
// }, [])