const mongoose = require('mongoose');

const transactionSchema = new mongoose.Schema({
  vehicleId: { type: mongoose.Schema.Types.ObjectId, ref: 'Vehicle', required: true },
  spotId: { type: mongoose.Schema.Types.ObjectId, ref: 'ParkingSpot', required: true },
  entryTime: { type: Date, default: Date.now },
  exitTime: { type: Date },
  fee: { type: Number }
});

module.exports = mongoose.model('Transaction', transactionSchema);