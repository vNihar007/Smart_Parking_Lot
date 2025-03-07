const rates = { motorcycle: 10, car: 15, bus: 50 };

function calculateFee(vehicleType, entryTime, exitTime) {
    const duration = (exitTime - entryTime) / (1000 * 60 * 60); 
    return rates[vehicleType] * duration;
}

module.exports = { calculateFee };
