const mongoose = require('mongoose');

const parkingSpotSchema = new mongoose.Schema({
  floor: { type: Number, required: true },
  size: { type: String, enum: ['small', 'medium', 'large'], required: true },
  status: { type: String, enum: ['available', 'occupied'], default: 'available' },
  vehicleId: { type: mongoose.Schema.Types.ObjectId, ref: 'Vehicle' }
})

module.exports = mongoose.model('ParkingSpot', parkingSpotSchema);
