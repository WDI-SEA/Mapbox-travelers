require('dotenv').config()
let express = require('express')
let app = express()
let ejsLayouts = require('express-ejs-layouts')
let methodOverride = require('method-override')
let db = require('./models')
const mbxGeocoding = require('@mapbox/mapbox-sdk/services/geocoding')
const geocodingClient = mbxGeocoding({ accessToken: `${process.env.mapboxToken}`})


app.use(ejsLayouts);
app.set('view engine', 'ejs');
app.use(express.urlencoded({ extended: false }));
app.use('/', express.static("static"));
app.use(methodOverride('_method'))


app.get('/', (req, res)=>{
  res.render('city-search')
})

app.get('/favorites', (req, res) => {
  db.place.findAll()
  .then(favorites => {
    res.render('favorites', {favorites})
  })
})

app.get('/search', (req, res) => {
  geocodingClient.forwardGeocode({
    query: `${req.query.city}, ${req.query.state}`,
    types: ['place'],
    countries: ['us']
  })
  .send()
  .then(data => {
    let results = data.body.features.map(d => {
      console.log(d)
      return {
        name: d.place_name,
        city: d.text,
        state: d.context[0].text,
        lat: d.center[1],
        long: d.center[0]
      }
    })
    res.render('search-results', {results: results, query: req.query})
    console.log(results)
  })
  .catch(err => {
    console.log(err)
    res.send('error')
  })
})


app.post('/add', (req, res) => {
  db.place.findOrCreate( {
    where: {
      lat: req.body.lat
    },
    defaults: {
      city: req.body.city,
      state: req.body.state,
      long: req.body.long
    }
  }).then(([favorite, created]) =>{
      console.log(`${favorite.city} favorite was ${created ? 'created' : 'found'}`)
      res.redirect('/favorites')
  })
  .catch(err => {
    console.log(err)
    res.send('error')
  })
})

app.delete('/remove/:id', (req, res) => {
  db.place.destroy({
    where: {
      id: req.params.id
    }
  })
  .then(p => {
    // console.log('deleted', p)
    res.redirect('/favorites')
  })
  .catch(err => {
    console.log(err)
    res.send('error')
  })
})


app.listen(process.env.PORT || 8000, console.log('🎧 Port 8000 🎧'))