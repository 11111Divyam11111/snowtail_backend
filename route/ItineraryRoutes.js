const express = require('express');
const router = express.Router();
const itineraryController = require('../controller/ItineraryController');

// Route to get all itineraries
router.get('/itineraries', itineraryController.getAllItineraries);

// Route to create a new itinerary
router.post('/itineraries', itineraryController.createItinerary);

module.exports = router;
