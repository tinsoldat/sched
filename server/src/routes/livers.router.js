const { Router } = require('express');
const Liver = require('../models/Liver');
const { fetchMembers, fetchColors } = require('../services/wikiwiki');

const router = Router()

//GET api/livers/
router.get('/', (req, res) => {

  Liver.find({ active: true }, 'name units color', (err, livers) => {
    res.json(livers)
  })
})
//POST update livers
router.get('/update', async (req, res) => {
  const { livers } = await fetchMembers()
  await Liver.insertMany(livers)
  res.status(201).json(livers)
  console.log('inserted', livers.length, 'events');
})
//PUT update colors for livers
router.get('/update/colors', async (req, res) => {
  const { colors } = await fetchColors()
  await Liver.bulkWrite(Object.entries(colors).map(val => {
    const name = val[0]
    const colors = val[1]
    return ({
      updateOne: {
        filter: { name: name },
        update: { colors: colors }
      }
    })
  }))
  res.status(201).json(colors)
})

module.exports = router