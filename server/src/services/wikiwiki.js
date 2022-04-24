import fetch from 'node-fetch'
import * as cheerio from 'cheerio'
import fs from 'fs'

/** Main regex
 * [1] - 00時00分
 * [2] - 他 or ？
 * [3] - Participants
 * [4] - Platform
 * [5] - Title
 * [6] - Note
 */
const regex = /^(.+)～ (他|？)? (.+?) at:(.*(?:？|文化放送|bilibili|ツイキャス|YouTube|Twitch|Twitter Live|ニコニコ)(?:チャンネル|生放送)?)([^※\n]+)?(?: ※(.*))?(?:$|\n)/
const dayRegex = /(\d\d) (\d\d?), (\d{4}) (\d\d|？)時(\d\d|？)/
/** Platform regex
 * [1] - Names, 両名 or 各々
 * [2] - の, 以外の, 公式
 * [3] - Platform
 * [4] - Note
 */
const atRegex = /(?:(.*?)(以外の|の|公式))?((?:(?:文化放送|bilibili|ツイキャス|YouTube|Twitch|Twitter Live|ニコニコ)(?:チャンネル|生放送)?、?)+)(\(.+\))?/
const featRegex = /(.*)(?:\(|^)([^\(\)]+)(?:\)|$)/
const LOCALE_OFFSET = new Date().getTimezoneOffset()
const JST_OFFSET = -540 // 9 hours
const OFFSET = JST_OFFSET - LOCALE_OFFSET

const parseListItem = li => {

  const match = li.match(regex)

  if (!match) return { text: li }

  return {
    date: match[1],
    feat: match[3].trim(),
    at: match[4],
    title: match[5],
    note: match[6]
  }
}

const parseBody = body => {

  const events = []

  const $ = cheerio.load(body)

  $('del').remove()

  $('.minicalendar_viewer').each((i, calendar) => {

    const h3 = $(calendar).prev().text()

    $('.list1 > li', calendar).each((j, li) => {
      events.push(h3 + ' ' + $($(li).text()).text())
    })
  })

  return events

}

const get = async (offset = 0, days = 1) => {
  const URI = `https://wikiwiki.jp/nijisanji/?plugin=minicalendar_viewer&file=配信予定&date=${offset}*${days}`
  console.log('GET ' + URI);
  const response = await fetch(URI)
  const body = await response.text()
  return body
}


const wikiwiki = async (interval) => {

  // const body = await get(0, 1)
  // fs.writeFileSync('./public/temp.html', body, (err) => (console.log(err)))
  const body = fs.readFileSync('./public/body.html').toString()

  const unresolved = ['']
  const events = parseBody(body).map(parseListItem).filter(event => { if (!event.text) return true; else unresolved.push(event.text) })
  events.forEach(
    ( event ) => {

      const day = event.date.match(dayRegex).map(val => parseInt(val))
      event.date = new Date(day[3], day[2] - 1, day[1], day[4] || 0, day[5] + OFFSET || 0)

      const at = event.at.replace('チャンネル', '').match(atRegex) ?? [ event.at, 'other' ]

      event.feat = event.feat.match(featRegex)[2].split('＆').reduce((res, cur) => {
        const pov = (
          (!at[1] || at[1] === '各々' || at[1] === '両名') ||
          (at[1].includes(cur) ? at[2] === 'の' : at[2] === '以外の') ||
          (at[2] === '公式' && (res.main = at[1]) && false)
        ) ? at[3] : undefined
        res[cur] = pov
        return res
      }, {})
    }
  )

  console.log(events);

  console.log('unable to parse events: ', unresolved.filter(val => val.length > 11), unresolved.length)

}

wikiwiki(1)

export default wikiwiki
