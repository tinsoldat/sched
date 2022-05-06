const { Router } = require('express');
const fetchWiki = require('../services/wikiwiki')
const Liver = require('../models/Liver');

const router = Router()

//GET api/livers/
router.get('/', (req, res) => {

  Liver.find({}, (err, livers) => {
    res.json(livers)
  })
})

module.exports = router