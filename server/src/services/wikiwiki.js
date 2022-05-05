const fetch = require('node-fetch')
const cheerio = require('cheerio')
const fs = require('fs')

/** Main regex
 * [1] - 00時00分
 * [2] - 他 or ？
 * [3] - Participants
 * [4] - Platform
 * [5] - Description
 * [6] - Note
 */
const regex = /^(.+)～ (他|？)? (.+?) at:(.*(?:？|文化放送|bilibili|ツイキャス|YouTube|Twitch|Twitter Live|ニコニコ)(?:チャンネル|生放送)?)([^※\n]+)?(?: ※(.*))?(?:\n|$)/
const dayRegex = /(\d\d) (\d\d?), (\d{4}) (\d\d|？)時(\d\d|？)/
/** Platform regex
 * [1] - Names, 両名 or 各々
 * [2] - の or 以外の
 * [3] - 公式
 * [4] - Platform
 * [5] - Note
 */
const atRegex = /^(?:(.*?)(以外の|の)?(公式)?)((?:(?:文化放送|bilibili|ツイキャス|YouTube|Twitch|Twitter Live|ニコニコ)(?:チャンネル|生放送)?、?)+)(\(.+\))?/
const featRegex = /(.*)(?:\(|^)([^\(\)]+)(?:\)|$)/
const LOCALE_OFFSET = new Date().getTimezoneOffset()
const JST_OFFSET = -540 // 9 hours
const OFFSET = JST_OFFSET - LOCALE_OFFSET

const parseListItem = li => {

  const match = li.match(regex)

  if (!match) return { description: li }

  return {
    date: match[1],
    feat: match[3].trimStart().replaceAll('.', ''),
    at: match[4],
    description: match[5] ? match[5].trimStart() : '',
    note: match[6] ? match[6].trimStart() : ''
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

const get = async (offset = 0, days = 1, mode = 'past') => {
  const URI = `https://wikiwiki.jp/nijisanji/?plugin=minicalendar_viewer&file=配信予定&date=${offset}*${days}&mode=${mode}`
  console.log('GET ' + URI);
  const response = await fetch(URI)
  const body = await response.text()
  return body
}


const fetchWiki = async (offset = 0, days = 1, mode = 'past') => {

  // const body = await get(offset, days, mode)
  // fs.writeFileSync('./public/body.html', body, (err) => (console.log(err)))
  const body = fs.readFileSync('./public/body.html').toString()

  const unresolved = []
  const events = parseBody(body)
    .map(parseListItem)
    .filter(event => {
      if (event.date) return true
      unresolved.push(event.description)
      return false
    })
    .map(({ date, feat, at, description, note }) => {
      const day = date.match(dayRegex).map(val => parseInt(val))
      date = new Date(day[3], day[2] - 1, day[1], day[4] || 0, day[5] + OFFSET || 0)

      let [_input, who, incl, official, platform, atNote] = at.replace('チャンネル', '').match(atRegex) ?? [at, 'other']
      incl = incl && incl === 'の'
      if (platform?.charAt(platform?.length - 1) === '、') platform?.slice(0, -2)

      feat = feat.match(featRegex)[2].split('＆').reduce((acc, cur) => {

        if (
          (official === '公式' || platform === 'ニコニコ生放送' || platform === '文化放送')
          && !acc[0]
        ) {
          acc.unshift(['main', platform])
        } else if (acc[0] && acc[0][0] !== 'main' || !acc[0]) {
          if (
            (who.includes(cur) ? incl : !incl)
            || (who === '両名' || who === '各々')
          )
            acc.push([cur, platform])
          else
            acc.push([cur, ''])
        }
        // !who || who === '各々' || who === '両名' || 
        return acc
      }, [])
      console.log(feat, at);
      return { date, feat, at, description, note }
    })

  // console.log(unresolved, 'unable to parse events:', unresolved.length)

  // console.log(events);
  return { events, unresolved }

}

module.exports = fetchWiki
