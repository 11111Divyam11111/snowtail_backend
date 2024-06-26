const Itinerary = require("../model/Itinerary");

exports.getAllItinerary = async (req, res) => {
  try {
    const itinerary = await Itinerary.find();
    res.json({itinerary});
    console.log({itinerary})
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
