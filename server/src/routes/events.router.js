const { Router } = require('express');
const { fetchSchedule } = require('../services/wikiwiki')
const Event = require('../models/Event');

const router = Router()

//TODO validation middleware
//GET api/events?from=yyyy-mm-dd&to=yyyy-mm-dd&name=Full Name
router.get('/', (req, res) => {
  const { from, to, name } = req.query

  const regex = /^\d\d\d\d-\d\d-\d\d$/
  const hasFrom = regex.test(from)
  const hasTo = regex.test(to)
  const query = Event.find()
  if (hasFrom || hasTo) {
    if (hasFrom) query.find({ date: { $gte: new Date(from) } })
    if (hasTo) query.find({ date: { $lt: new Date(to) } })
  }
  if (name) query.find({ feat: { $elemMatch: { $elemMatch: { $in: [name] } } } })

  query.exec((err, events) => {
    res.json(events)
  })
})
//TODO POST add a new event
router.get('/create', (req, res) => {
  res.json(req.query)
})
//POST update the event database
router.post('/update', async (req, res) => {
  const { events } = await fetchSchedule()
  await Event.deleteMany({})
  await Event.insertMany(events)
  res.status(201).json(events)
  console.log('inserted', events.length, 'events');
})
//TODO POST update an event by id
router.get('/update/:id', (req, res) => {
  res.json(req.params)
})
//DELETE clear the collection
router.delete('/delete', async (req, res) => {
  await Event.deleteMany({})
  res.send('deleted')
  console.log('events cleared');
})

module.exports = router