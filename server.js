const express = require("express");
const nodemailer = require("nodemailer");
const cors = require("cors");
const bodyParser = require("body-parser");
const dotenv = require("dotenv");

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(
  cors({
    origin: `${process.env.SNOWTAIL_URL}`,
  })
);
app.use(bodyParser.json());

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

app.post("/send-email", (req, res) => {
  const { name, email, phone, isd, passengers, date, flexibleYes, flexibleNo } = req.body;

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
      ${flexibleYes ? "Yes, I am flexible with my travel dates" : "No, I am not flexible with my travel dates"}`
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.error('Error sending email:', error);
      return res.status(500).send(error.toString());
    }
    res.status(200).send("Email sent: " + info.response);
  });
});


app.get("/send-email", (req, res) => {
  res.send("Hello from server");
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
