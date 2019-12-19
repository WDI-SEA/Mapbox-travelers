require('dotenv').config()
const express = require('express')
const mbxClient = require('@mapbox/mapbox-sdk')
const mbxGeocode = require('@mapbox/mapbox-sdk/services/geocoding')
const router = express.Router()
const db = require('../models')

const mb = mbxClient({ accessToken: MAPBOX_URL})
const geocode = mbxGeocode(mb)