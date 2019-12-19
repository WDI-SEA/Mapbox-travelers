let router = require('express').Router()
const db = require('../models')

const mbxGeocoding = require('@mapbox/mapbox-sdk/services/geocoding')
const geocodingClient = mbxGeocoding({ 
    accessToken: 'pk.eyJ1Ijoibmlja3ViZWQiLCJhIjoiY2s0YWl3ZjJ6MDRnYTNrbzV3aTQ1bGlzcyJ9.BB2C_W2tJ5gK3Y_GhkBVSQ'
})

