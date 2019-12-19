let router = require('express').Router()
const db = require('../models')

const mbxGeocoding = require('@mapbox/mapbox-sdk/services/geocoding')
const geocodingClient = mbxGeocoding({ 
    accessToken: 'pk.eyJ1Ijoibmlja3ViZWQiLCJhIjoiY2s0YWl3ZjJ6MDRnYTNrbzV3aTQ1bGlzcyJ9.BB2C_W2tJ5gK3Y_GhkBVSQ'
})

router.get('/', (req, res) => {
    res.render('city-search')
})

router.get('/search', (req, res) => {
    //get coordinates by using values in url
    geocodingClient
    .forwardGeocode({
        query: `${req.query.city}, ${req.query.state}`,
        types: ['place'],
        countries: ['us']
    })
    .send()
    .then(response => {
    let results = response.body.features.map (feature => {
    return {
        name: feature.place_name,
        lat: feature.center[1],
        long: feature.center[0]}
    })
    res.render('search-results', { query: req.query, results })
    })
    .catch( err => {
        console.log(err)
        res.render('404')
    })
})

router.post('/add', (req, res) => {
    db.place.findOrCreate({
        where: {
            city: req.body.city
        },
        defaults: req.body
    })
    .then(([place, created]) => {
        res.redirect('/favorites')
    })
})

router.get('/favorites', (req, res) => {
    db.place.findAll()
    .then(places => {
        res.render('favorites', {places})
    })
})

router.delete('/remove', (req, res) => {
    db.place.destroy({
        where: { city: req.body.city }
    }).then(function() {
        res.redirect('/favorites')
    });
})

module.exports = router