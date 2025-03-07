const { createVehicle, createTransaction } = require('../services/parkingService');
const { allocateSpot, getAvailableSpots, releaseSpot } = require('../Services_Logic/spotAllocation');
const { calculateFee } = require('../Services_Logic/feeCalculator');
const Transaction = require('../models/Transaction');
const ParkingSpot = require('../models/parkingspot');

async function checkIn(req, res) {
    const { type, licensePlate } = req.body;

    try {
        const vehicle = await createVehicle(type, licensePlate);
        const spot = await allocateSpot(type);
        if (!spot) {
            return res.status(500).json({ message: 'Check-in failed', error: 'No available spots' });
        }
        const transaction = await createTransaction(vehicle._id, spot._id);

        res.status(201).json({ message: 'Check-in successful', transaction });
    } catch (error) {
        if (error.code === 11000) {
            res.status(500).json({ message: 'Check-in failed', error: 'Duplicate license plate' });
        } else {
            res.status(500).json({ message: 'Check-in failed', error: error.message });
        }
    }
}

async function checkOut(req, res) {
    const { transactionId } = req.body;

    try {
        const transaction = await Transaction.findById(transactionId).populate('vehicleId spotId');
        if (!transaction) return res.status(404).json({ message: 'Transaction not found' });

        transaction.exitTime = new Date();
        transaction.fee = calculateFee(transaction.vehicleId.type, transaction.entryTime, transaction.exitTime);
        await transaction.save();

        await releaseSpot(transaction.spotId);

        res.json({ message: 'Check-out successful', transaction });
    } catch (error) {
        if (error.message === 'Transaction not found') {
            res.status(404).json({ message: 'Transaction not found' });
        } else {
            res.status(500).json({ message: 'Check-out failed', error: error.message });
        }
    }
}

async function getAvailability(req, res) {
    try {
        const spots = await getAvailableSpots();
        res.json({ spots });
    } catch (error) {
        res.status(500).json({ message: 'Failed to fetch available spots', error: error.message });
    }
}

module.exports = { checkIn, checkOut, getAvailability };