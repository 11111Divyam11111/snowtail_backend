const mongoose = require("mongoose");

const ItinerarySchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  place: {
    type: String,
    required: true,
  },
  location: {
    type: String,
    required: true,
  },
  map: {
    type: String,
    required: true,
  },
  large_img: {
    type: String,
  },
  small_img: {
    type: String,
  },
  banner: {
    type: String,
  },
  description1: {
    type: String,
    required: true,
  },
  description2: [
    {
      type: String,
      required: true,
    },
  ],
  inclusions: [
    {
      type: String,
      required: true,
    },
  ],
  exclusions: [
    {
      type: String,
      required: true,
    },
  ],
  prices: {
    three_star: {
      required: true,
      type: Number,
    },
    four_star: {
      required: true,
      type: Number,
    },
    five_star: {
      required: true,
      type: Number,
    },
  },
  activities: [
    {
      day: {
        type: Number,
        required: true,
      },
      activity: {
        type: String,
        required: true,
      },
    },
  ],
  duration:{
    type:String
  }
});

const Itinerary = mongoose.model('Itinerary', ItinerarySchema);

module.exports = Itinerary;