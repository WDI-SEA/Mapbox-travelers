require('dotenv').config()
const express = require('express');
const mbxClient = require('@mapbox/mapbox-sdk');
const mbxGeocode = require('@mapbox/mapbox-sdk/services/geocoding')
const layouts = require('express-ejs-layouts')

const db = require('./models')
const app = express();

const mb = mbxClient({ accessToken: process.env.GEOKEY })
const geocode = mbxGeocode(mb)


app.set('view engine', 'ejs');
app.use(express.urlencoded({ extended: false }));
app.use(express.static("static"));
app.use(layouts);


app.get('/', (req, res)=>{
  res.render('home')
})

app.get('/search', (req, res) => {
  res.render('search')
})

app.get('/favorites', (req, res) => {
  db.place.findAll()
  .then( (cities) => {
    console.log(cities)
      res.render('favorites', {cities})
  })
})

app.post('/add', (req, res) => {
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
      res.redirect('favorites')
  })
})


app.get('/results', (req, res) => {
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
      res.render('results', { query: req.query, results })
  })
  .catch((err) => {
      console.log(err);
  })
})

app.delete('/delete', (req, res) => {
  db.place.findByPk(req.params.id)
  .then(id => {
    console.log('Deleted', req.body.city)
    id.destroy
  })
  .then(
    res.send('City removed, woops')
  )
})

app.listen(process.env.PORT || 8000, console.log('🎧 Port 8000 🎧'))
