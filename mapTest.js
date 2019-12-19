require('dotenv').config()
const mbxGeocoding = require('@mapbox/mapbox-sdk/services/geocoding')
const geocodingClient = mbxGeocoding({ accessToken: `${process.env.mapboxToken}`})

geocodingClient.forwardGeocode({
    query: 'Seattle, WA'
})
.send()
.then(response=> {
    let match = response.body;
    console.log(match.features[0].center)
    geocodingClient.reverseGeocode({
        query: match.features[0].center
    })
    .send()
    .then(response => {
        let reverseMatch = response.body;
        console.log(reverseMatch.features[0].context[3].text)
    }).catch(err => {
        console.log(err)
      })
})