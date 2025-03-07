require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const http = require('http');
const parkingRoutes = require('./routes/parkingRoutes');
const { init } = require('./socket');

const app = express();
const server = http.createServer(app);

const port = process.env.PORT || 3000;

app.use(express.json());
app.use('/api/parking', parkingRoutes);

mongoose.connect(process.env.MONGO_URI)
  .then(() => {
    console.log('Connected to MongoDB');
    init(server); 
    server.listen(port, () => {
      console.log(`Server is running on port ${port}`);
    });
  })
  .catch(error => {
    console.log('Error connecting to MongoDB:', error);
  });

module.exports = { app };
