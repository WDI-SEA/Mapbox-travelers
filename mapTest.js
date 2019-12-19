const mbxGeocoding = require('@mapbox/mapbox-sdk/services/geocoding');
const geocoding = mbxGeocoding({ accessToken: 'pk.eyJ1IjoienNoYW5ub24iLCJhIjoiY2s0YWl4ZjhrMDRmYTNscnVtaWQ0cWZjNyJ9.VNsxZv68UNAb-xXHJdxosw' });

geocoding.forwardGeocode({
    query: 'Seattle, WA'
})
.send()
.then(res => {
    let match = res.body;
    console.log(match.features[0].center);
})

geocoding.reverseGeocode({
    query: [ -122.3301, 47.6038 ]
})
.send()
.then(res => {
    
})