const { Router } = require('express');
const fetchWiki = require('./services/wikiwiki')
const Event = require('./models/Event')
const router = Router()

router.get('/delete', async (req, res) => {
  await Event.deleteMany({})
  console.log('test collection cleared');
  res.send('deleted')
})

router.get('/update', async (req, res) => {
  const { events } = await fetchWiki()
  res.json(events)
  await Event.insertMany(events)
  console.log('inserted', events.length, 'events');
})

router.get('/today', async (req, res) => {
  const start = new Date(), end = new Date
  start.setHours(0, 0, 0, 0)
  end.setHours(23, 59, 59, 999)
  Event.find({ date: { $gte: new Date('2022-04-28') } }, '', (err, events) => {
    console.log(events);
    res.json(events)
  })//, $lt: new Date('2022-03-27')
})

module.exports = router