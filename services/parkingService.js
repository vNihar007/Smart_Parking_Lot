const Vehicle = require('../models/Vehicle');
const ParkingSpot = require('../models/parkingspot');
const Transaction = require('../models/Transaction');
const { allocateSpot } = require('../Services_Logic/spotAllocation');

async function createVehicle(type, licensePlate) {
    const vehicle = new Vehicle({ type, licensePlate });
    await vehicle.save();
    return vehicle;
}

async function createTransaction(vehicleId, spotId) {
    const transaction = new Transaction({ vehicleId, spotId });
    await transaction.save();
    return transaction;
}


module.exports = { createVehicle, createTransaction };
