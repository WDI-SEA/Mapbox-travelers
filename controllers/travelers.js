let express = require('express')
let router = express.Router()
let db = require('../models')

router.get('/travelers', (req, res)=>{
  // TODO query the db for all travelers, render it on a page
  db.traveler.findAll()
  .then(travelers=>{
    res.render('travelers/index', { travelers })
  })
  .catch(err=>{
    console.log(err)
    res.render(404)
  })
})

router.get('/travelers/new', (req, res)=>{
  res.render('travelers/new')
})

router.post('/travelers', (req, res)=>{
  db.traveler.create(req.body)
  .then(createdTraveler=>{
    console.log(`Created ${createdTraveler.firstname}`)
    res.redirect('/travelers')
  })
})

module.exports = router