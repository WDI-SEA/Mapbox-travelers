const mbxGeocoding = require('@mapbox/mapbox-sdk/services/geocoding');
const geocodingClient = mbxGeocoding({ accessToken: 'pk.eyJ1IjoiZHNjaGF3ZWwiLCJhIjoiY2s0YWl3ankwMDRkaTNucnVqZGtvNWVrbCJ9._FgRj_tMA-T2lGsQq-nZRA' });

// geocodingClient
//     .reverseGeocode({
//         query: [ -122.3301, 47.6038 ]
//     })
//     .send()
//     .then(response => {
//         const match = response.body;
//         console.log(match);
// });

// geocodingClient
//     .forwardGeocode({
//         query: 'Seattle, WA'
//     })
//     .send()
//     .then(response => {
//         const match = response.body;
//         console.log(match.features[0].center);
// });

geocodingClient
    .forwardGeocode({
        query: 'Seattle, WA'
    })
    .send()
    .then(response => {
        const match = response.body;
        console.log(match);
});