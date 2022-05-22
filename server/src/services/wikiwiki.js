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
const atRegex = /^(?:(.*?)(以外の|の)?(公式)?)((?:(?:？|文化放送|bilibili|ツイキャス|YouTube|Twitch|Twitter Live|ニコニコ)(?:チャンネル|生放送)?、?)+)(\(.+\))?/
const featRegex = /(.*)(?:\(|^)([^\(\)]+)(?:\)|$)/
const LOCALE_OFFSET = new Date().getTimezoneOffset()
const JST_OFFSET = -540 // 9 hours
const OFFSET = JST_OFFSET - LOCALE_OFFSET

const parseEvent = ({ date, feat, at, description, note }) => {
  const day = date.match(dayRegex).map(val => parseInt(val))
  date = new Date(day[3], day[2] - 1, day[1], day[4] || 0, day[5] + OFFSET || 0)

  let [_input, who, incl, official, platform, atNote] = at.replace('チャンネル', '').match(atRegex) ?? [at, 'other']
  if (platform && platform.charAt(platform.length - 1) === '、') platform = platform.slice(0, -1)
  who = who?.split('、')
  incl = incl && incl === 'の'
  official = official || platform === 'ニコニコ生放送' || platform === '文化放送'

  const isSolo = !who && !official
  const atEvery = who.includes('両名') || who.includes('各々')

  feat = feat.match(featRegex)[2].split('＆').reduce((acc, cur) => {

    const isMe = who.includes(cur)

    if (isSolo || atEvery) {
      acc.push([cur, platform])
    } else if (official) {
      acc[0] = ['main', platform]
      acc.push([cur, ''])
    } else if (isMe ? incl : !incl) {
      acc.push([cur, platform])
    } else {
      acc.push([cur, ''])
    }

    return acc
  }, [])
  return { date, feat, at, description, note }
}

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
      events.push(h3 + ' ' + $(li).text().replace(/<.+>/, ''))
    })
  })

  return events

}

const get = async () => {
  const URI = `https://wikiwiki.jp/nijisanji/配信予定リスト`
  console.log('GET ' + URI);
  const response = await fetch(URI)
  const body = await response.text()
  return body
}

/**
 * get schedule
 */
const fetchSchedule = async () => {

  // const body = await get()
  // fs.writeFileSync('public/temp.html', body)
  const body = fs.readFileSync('public/temp.html').toString()

  const unresolved = []
  const events = parseBody(body)
    .map(parseListItem)
    .filter(event => {
      if (event.date) return true
      unresolved.push(event.description)
      return false
    })
    .map(parseEvent)

  console.log(unresolved, 'unable to parse events:', unresolved.length)

  return { events, unresolved }
}

/**
 * get URLs with members channels
 * selectors don't work because of lazy loading
 * open and save with browser first
 */
const fetchMembers = async () => {
  // const URI = `https://wikiwiki.jp/nijisanji/配信ページ ジャンプリスト`
  // console.log('fetching members page GET ' + URI);
  // const response = await fetch(URI)
  // const body = await response.text()
  // fs.writeFileSync('../../public/members.html', body))
  const body = fs.readFileSync('./public/members.html').toString()
  const $ = cheerio.load(body)

  const livers = Object.values(Array.from($('#content img[src^="members_files/face"] + img.ext').map((i, val) => {
    let [name, platform] = val.prev.attribs.title.split(' / ')
    name = name.trim().replace(/\d$/, '')
    platform = platform?.toLowerCase()
      .replace("ツイキャス", 'twitcast')
      .replace("ニコニコ動画", 'nicovideo')
    let url = val.attribs['data-href']
    return {
      name,
      platform,
      url
    }
  })).reduce((acc, {
    name,
    platform,
    url
  }) => {
    if (!acc[name]) acc[name] = {
      urls: {}, name
    }
    if (!acc[name].urls[platform]) acc[name].urls[platform] = url
    else acc[name].urls[platform + '2'] = url
    return acc
  }, {}))

  return { livers }

}
/**
 * Get hex colors for livers
 * URL = https://wikiwiki.jp/nijisanji/カラーコードまとめ
 */
const fetchColors = async () => {

  const URI = `https://wikiwiki.jp/nijisanji/カラーコードまとめ`
  console.log('fetching colors page GET ' + URI);
  const response = await fetch(URI)
  // const body = await response.text()
  // fs.writeFileSync('./public/colors.html', body)
  const body = fs.readFileSync('./public/colors.html').toString()
  const $ = cheerio.load(body)

  const colors = Array.from($('th + td + td + td + td').map((i, val) => {
    let [name, ...rest] = Array.from(val.parent.children.map((val) => {
      let res = val.children && val.children[0]?.data
      if (res === '-') res = undefined
      return res
    }))

    const [own, old, light, strong] = rest.map(val => {
      if (typeof val === 'undefined' || /^#([0-9a-f]{3}){1,2}$/i.test(val)) return val
      else return undefined
    })
    return { name, own, old, light, strong }
  })).reduce((acc, { name, ...rest }) => {
    acc[name] = { ...rest }
    return acc
  }, {})
  
  return { colors }
}

module.exports = { fetchSchedule, fetchMembers, fetchColors }
