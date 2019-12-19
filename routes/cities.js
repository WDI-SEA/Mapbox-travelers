require('dotenv').config()
const express = require('express')
const mbxClient = require('@mapbox/mapbox-sdk')
const mbxGeocode = require('@mapbox/mapbox-sdk/services/geocoding')
const app = express()
const router = express.Router()
const db = require('../models')

const mb = mbxClient({ accessToken: process.env.MAPBOX_URL})
const geocode = mbxGeocode(mb)

router.get('/search', (req, res) => {
    res.render('search')
})

router.get('/results', (req, res) => {
    geocode.forwardGeocode({
        query: `${req.query.city}, ${req.query.state}`,
        types: ['place'],
        countries: ['us']
    })
    .send()
    .then((result) => {
        let results = result.body.features.map(result => { //creates array and returns the keys.properties 
            return {
                city: result.place_name,
                lat: result.center[1],
                long: result.center[0]
            }
        })
        res.render('results', {query: req.query, results})
    })
    .catch((err) => {
        console.log('Error', err)
    })
})



module.exports = router