const mongoose = require('mongoose');
const ParkingSpot = require('../models/parkingspot');
const { getIo } = require('../socket');

async function allocateSpot(vehicleType) {
  const sizeMap = { motorcycle: 'small', car: 'medium', bus: 'large' };
  const size = sizeMap[vehicleType];

  const session = await mongoose.startSession();
  session.startTransaction();

  try {
    const spot = await ParkingSpot.findOneAndUpdate(
      { size, status: 'available' },
      { $set: { status: 'occupied' } },
      { new: true, session }
    );

    if (!spot) {
      throw new Error(`No available spots for ${vehicleType}`);
    }

    await session.commitTransaction();
    session.endSession();

    const io = getIo();
    io.emit('spotStatusUpdate', { spotId: spot._id, status: 'occupied' });

    return spot;
  } catch (error) {
    if (session.inTransaction()) {
      await session.abortTransaction();
    }
    session.endSession();
    throw error;
  }
}

async function releaseSpot(spotId) {
  const spot = await ParkingSpot.findByIdAndUpdate(
    spotId,
    { $set: { status: 'available' } },
    { new: true }
  );

  if (spot) {
    const io = getIo();
    io.emit('spotStatusUpdate', { spotId: spot._id, status: 'available' });
  }

  return spot;
}

async function getAvailableSpots() {
  return await ParkingSpot.find({ status: 'available' });
}

module.exports = { allocateSpot, releaseSpot, getAvailableSpots };
