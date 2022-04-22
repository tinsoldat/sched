import fetch from 'node-fetch'
import * as cheerio from 'cheerio'
import fs from 'fs'


const get = async () => {
  const response = await fetch('https://wikiwiki.jp/nijisanji/?plugin=minicalendar_viewer&file=配信予定&date=0*1')
  const body = await response.text()
  return body
}

/** Main regex
 * [1] - 00時00分
 * [2] - 他
 * [3] - Participants
 * [4] - Platform
 * [5] - Title
 * [6] - Note
 */
const regex = /(.+)～ (他)? (.+?) at:(.*(?:、?(?:ツイキャス|YouTube|Twitch|bilibili|Twitter Live))+(?:チャンネル)?(?:\(.+\))?)(?: (.+[^※])?(※.+)?)?/
const dayRegex = /(\d\d) (\d\d?), (\d{4})/
/** Platform regex
 * [1] - Names or 各々
 * [2] - の, 以外の, 公式
 * [3] - Platform
 * [4] - Note
 */
const platformRegex = /(?:(.*?)(以外の|の|公式))?((?:(?:ツイキャス|YouTube|Twitch|Twitter Live|ニコニコ)(?:チャンネル|生放送)?、?)+)(\(.+\))?/g
const LOCALE_OFFSET = new Date().getTimezoneOffset()
const JST_OFFSET = -540 // 9 hours
const OFFSET = JST_OFFSET - LOCALE_OFFSET
const parse = body => {

  const $ = cheerio.load(body)

  $('del').remove()

  const days = $('.minicalendar_viewer').map((i, calendar) => {

    const h3 = $($(calendar).prev()).text().match(dayRegex)
    const currentDate = new Date(h3[3], h3[2] - 1, h3[1], 0, OFFSET)
    
    return $('.list1 > li', calendar).map((j, li) => {

      const text = $(li).text()
      const match = text.match(regex)

      if (match) {
        let date = new Date(currentDate)
        date.setHours(match[1].slice(0, 2), parseInt(match[1].slice(3,5)) + OFFSET)
        const participants = match[3].trim().split('＆')
        const platformMatch = [...match[4].matchAll(platformRegex)]
        if (platformMatch.length > 1) console.log(platformMatch);
        
        const livers = {}
        for (const elem of platformMatch) {
          const flag = elem[2]
          const site = elem[3].replace('チャンネル', '').replace('、', ', ')
          if (!elem[1]) {
            livers.solo = site
            break
          }
          const names = elem[1].split('、')
          for (const name of names) {
            livers[name] = {}
            switch (flag) {
              case 'の':
                livers[name][site] = true
                break;
              case '以外の':
                livers[name][site] = false
                break;
              case '公式' || 'オフィシャル':
                livers.main = {}
                livers.main[site] = true
                break;
              default:
                console.log('wrong event format: ', date, text)
                break;
            }
          }
        }
        console.log(match[4], livers);


        const title = match[5]
        const note = match[6]
        

        return {
          date,
          participants,
          livers,
          title,
          note
        }
      } else {
        // console.log(j, text)
      }
    })
  })
}

const wikiwiki = async (interval) => {

  // const body = await get()
  // fs.writeFileSync('./public/body.html', body, (err) => (console.log(err)))
  const body = fs.readFileSync('./public/body.html').toString()
  const events = parse(body)


}

wikiwiki(1)

export default wikiwiki

/**
 *  https://wikiwiki.jp/nijisanji/?plugin=minicalendar_viewer&file=配信予定&date=[offset]*[days]&mode=[past|future]
 */