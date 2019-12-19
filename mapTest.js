require('dotenv').config()
const express = require('express');
const mbxClient = require('@mapbox/mapbox-sdk');
const mbxGeocode = require('@mapbox/mapbox-sdk/services/geocoding')
const router = express.Router();
const db = require('../models')

const mbxGeocoding = require('@mapbox/mapbox-sdk/services/geocoding');
const geocodingClient = mbxGeocoding({ accessToken: GEOKEY });

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
        //we're actually running the .map method here to take the info from the page and return info from the API
        let results = result.body.features.map(res => {
            return {
                city: res.place_name,
                lat: res.center[1],
                long: res.center[0]
            }
        })
        console.log(results);
        res.render('cities/results', { query: req.query, results })
    })
    .catch((err) => {
        console.log(err);
    })
})

router.post('/add', (req, res) => {
    db.place.findOrCreate({
        where: {
            city: req.body.city
        },
        defaults: {
            lat: req.body.lat,
            long: req.body.long
        }
    })
    .then(([city, created]) => {
        console.log(`${city.city} was ${created ? 'created' : 'found'}`)
        res.redirect('/favorites')
    })
})

router.get('favorites', (req, res) => {
    db.place.findAll()
    .then( (cities) => {
        res.render('cities/favorites', {cities})
    })
})

module.exports = router;