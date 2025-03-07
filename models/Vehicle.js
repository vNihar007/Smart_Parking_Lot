const mongoose = require('mongoose');

const vehicleSchema = new mongoose.Schema({
  type: { type: String, enum: ['motorcycle', 'car', 'bus'], required: true },
  licensePlate: { type: String, required: true, unique: true }
});

module.exports = mongoose.model('Vehicle', vehicleSchema);