const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const cookieParser = require('cookie-parser');
const useragent = require('express-useragent');
// Import routes
const apiRoutes = require('./api-routes/api-routes');

// set port, listen for requests
const PORT = process.env.PORT || 3000;

// Initialise the app
const app = express();

const corsOptions = {
  origin: 'http://localhost:3000',
};

app.use(cors(corsOptions));

// parse requests of content-type - application/json
app.use(express.json());
app.use(useragent.express());
app.use(cookieParser());

// parse requests of content-type - application/x-www-form-urlencoded
app.use(express.urlencoded({extended: false}));

// Connect to Mongoose and set connection variable
const {url} = require('./config/db.config');
try {
  mongoose.connect(url, {useNewUrlParser: true, useUnifiedTopology: true});
  console.log('Database connected successfully!');
} catch (error) {
  console.log('Error connecting db');
}

// Send message for default '/' URL
app.get('/', function(req, res) {
  res.send(req.useragent);
});

app.get('/', (req, res) => res.send(`<h1>Welcome To Admin Panel!</h1>`));

// Use Api routes in the App
app.use('/api', apiRoutes);

// Handle invalid OR 404 request
app.use((req, res) => {
  res.status(404).json({
    success: false,
    message: 'Invalid Request',
  });
});

// Launch app to listen to specified port
app.listen(PORT, () => {
  console.log(`Admin Panel server is running on Port: ${PORT}`);
});
