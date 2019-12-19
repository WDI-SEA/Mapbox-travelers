const express = require('express')
const mbxClient = require('@mapbox/mapbox-sdk')
const mbxGeocode = require('@mapbox/mapbox-sdk/services/geocoding')
const router = express.Router()
const db = require('../models')

const mb = mbxClient({ accessToken: 'pk.eyJ1IjoiZHNjaGF3ZWwiLCJhIjoiY2s0YWl3ankwMDRkaTNucnVqZGtvNWVrbCJ9._FgRj_tMA-T2lGsQq-nZRA'})
const geocode = mbxGeocode(mb)

router.get('/search', (req, res) => {
    res.render('cities/search')
})

router.get('/results', (req, res) => {
    geocode.forwardGeocode({
        query: `${req.query.city}, ${req.query.state}`,
        types: ['place'],
        countries: ['us']
    })
    .send()
    .then((result) => {
        let results = result.body.features.map(result => {
            return {
                city: result.place_name,
                state: result.place_name,
                lat: result.center[1],
                long: result.center[0]
            }
        })
        console.log(results)
        res.render('cities/results', { query: req.query, results })
    })
    .catch((err) => {
        console.log(err)
    })
})

router.post('/add', (req, res) => {
    db.place.findOrCreate({
        where: {
            city: req.body.city,
            state: req.body.state
        },
        defaults: {
            lat: req.body.lat,
            long: req.body.long
        }
    })
    .then(({city, create}) => {
        res.redirect('/favorites')
    })
    .catch(err => {
        res.render('404') 
    })
})

router.get('/favorites', (req, res) => {
    db.place.findAll()
    .then ((cities) => {
        res.render('cities/favorites', { cities })
    })
    .catch(err => {
        res.render('404') 
    })
})

module.exports = router