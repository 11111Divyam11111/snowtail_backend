const mongoose = require('mongoose');
const dotenv = require('dotenv');

dotenv.config();

const uri = 'mongodb+srv://divyamrajpandey220:12345678910@cluster0.nyjkapg.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0'

mongoose.connect(uri)
.then(() => console.log('MongoDB connected...'))
.catch(err => console.log('MongoDB connection error:', err));
