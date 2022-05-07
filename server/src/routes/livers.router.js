const { Router } = require('express');
const Liver = require('../models/Liver');
const { fetchMembers } = require('../services/wikiwiki');

const router = Router()

//GET api/livers/
router.get('/', (req, res) => {

  Liver.find({}, (err, livers) => {
    res.json(livers)
  })
})

router.get('/update', async (req, res) => {
  const { livers } = await fetchMembers()
  console.log(livers);
  await Liver.insertMany(livers)
  res.status(201).json(livers)
  console.log('inserted', livers.length, 'events');
})

module.exports = router