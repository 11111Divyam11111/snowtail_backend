const express = require("express");
const nodemailer = require("nodemailer");
const cors = require("cors");
const bodyParser = require("body-parser");
const dotenv = require("dotenv");
const path = require('path');
const ItineraryRoutes = require('./route/ItineraryRoutes'); // Ensure the correct path
require('./db'); // Ensure this file contains your MongoDB connection logic

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors({
  origin: [process.env.SNOWTAIL_URL, process.env.BASE_URL, 'http://localhost:5173'],
}));
app.use(express.json());
app.use(bodyParser.json());

// Log requests
app.use((req, res, next) => {
  console.log(`${req.method} ${req.url}`);
  next();
});

// Itinerary routes
app.use('/api', ItineraryRoutes);

// Nodemailer setup
const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 465,
  secure: true,
  service: "gmail",
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

// Route for sending email
app.post("/send-email", (req, res) => {
  const { name, email, phone, isd, passengers, date, flexibleYes } = req.body;

  const mailOptions = {
    to: ["divyamraj278@gmail.com"],
    subject: `Message from ${email}`,
    text: `
      Hello Snowtail Escapes, I am ${name}.
      I want to travel on ${date}.
      I am having ${passengers} passengers with me.
      You can contact me by:
        ◆ Phone: ${isd} ${phone}
        ◆ Email: ${email}
      ${flexibleYes ? "Yes, I am flexible with my travel dates" : ""}
    `
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.error('Error sending email:', error);
      return res.status(500).send(error.toString());
    }
    res.status(200).send("Email sent: " + info.response);
  });
});

// Test route for checking server functionality
app.get('/', (req, res) => {
  res.send("hello buradar");
});

app.get("/send-email", (req, res) => {
  res.send("Hello from server");
});

// Serve static files from the React app
app.use(express.static(path.join(__dirname, 'client/build')));

// The "catchall" handler: for any request that doesn't match the above, send back index.html.
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'client/build/index.html'));
});

// Start server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
