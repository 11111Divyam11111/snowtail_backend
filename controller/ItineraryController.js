const Itinerary = require('../model/Itinerary');

// Controller function to get all itineraries
exports.getAllItineraries = async (req, res) => {
  try {
    const itineraries = await Itinerary.find();
    res.json({itineraries});
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Controller function to create a new itinerary
exports.createItinerary = async (req, res) => {
  const {
    title,
    place,
    location,
    map,
    large_img,
    small_img,
    banner,
    description1,
    description2,
    inclusions,
    exclusions,
    prices,
    activities,
    duration
  } = req.body;

  const newItinerary = new Itinerary({
    title,
    place,
    location,
    map,
    large_img,
    small_img,
    banner,
    description1,
    description2,
    inclusions,
    exclusions,
    prices,
    activities,
    duration
  });

  try {
    const savedItinerary = await newItinerary.save();
    res.status(201).json(savedItinerary);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};
