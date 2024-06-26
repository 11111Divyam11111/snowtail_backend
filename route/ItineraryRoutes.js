
const express = require('express');
const router = express.Router();
const itineraryController = require('../controller/ItineraryController');

router.get('/itineraries', itineraryController.getAllItinerary);




module.exports = router;
