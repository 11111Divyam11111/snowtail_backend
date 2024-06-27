const mongoose = require('mongoose');

const ItinerarySchema = new mongoose.Schema({
  title: { type: String, required: true },
  place: { type: String, required: true },
  location: { type: String, required: true },
  map: { type: String },
  large_img: { type: String },
  small_img: { type: String },
  banner: { type: String },
  description1: { type: String },
  description2: { type: String },
  inclusions: [{ type: String }],
  exclusions: [{ type: String }],
  prices: {
    three_star: { type: Number, required: true },
    four_star: { type: Number, required: true },
    five_star: { type: Number, required: true },
  },
  activities: [{ day: { type: Number }, activity: { type: String } }],
  duration: { type: String }
});

const Itinerary = mongoose.model('Itinerary', ItinerarySchema);

module.exports = Itinerary;
