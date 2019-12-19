const express = require('express');
const router = express.Router();
const mbxClient = require('@mapbox/mapbox-sdk');
const mbxGeocode = require('@mapbox/mapbox-sdk/services/geocoding');
const db = require('../models');

const mb = mbxClient({ accessToken: 'pk.eyJ1IjoienNoYW5ub24iLCJhIjoiY2s0YWl4ZjhrMDRmYTNscnVtaWQ0cWZjNyJ9.VNsxZv68UNAb-xXHJdxosw' })
const geocode = mbxGeocode(mb);

// The version Gavin slacked out
// const mbxGeocoding = require('@mapbox/mapbox-sdk/services/geocoding');
// const geocodingClient = mbxGeocoding({ accessToken: 'pk.eyJ1IjoienNoYW5ub24iLCJhIjoiY2s0YWl4ZjhrMDRmYTNscnVtaWQ0cWZjNyJ9.VNsxZv68UNAb-xXHJdxosw' });

router.get('/search', function(req, res) {
    res.render('cities/search');
});

router.get('/results', (req, res) => {
    geocode.forwardGeocode({
        query: `${req.query.city}, ${req.query.state}`,
        types: ['place'],
        countries: ['us']
    })
    .send()
    .then( result => {
        let results = result.body.features.map( res2 => {
            return {
                name: res2.place_name,
                lat: res2.center[1],
                long: res2.center[0],
            }
        })
        res.render('cities/results', { query: req.query, results });
    })
    .catch( error => {
        console.log(error);
    })
})

router.post('/add', (req, res) => {
    db.place.findOrCreate({
        where: {
            name: req.body.city
        },
        defaults: {
            lat: req.body.lat,
            long: req.body.long
        }
    })
    .then(([city, created]) => {
        console.log(`${city} was ${created ? 'created' : 'found'}`);
        res.redirect('/favorites');
    })
});

router.get('favorites', (req, res) => {
    db.place.findAll()
    .then( cities => {
        res.render('cities/favorites', { cities })
    })
});

module.exports = router;