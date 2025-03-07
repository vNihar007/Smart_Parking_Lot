const rates = { motorcycle: 5, car: 10, bus: 20 };

function calculateFee(vehicleType, entryTime, exitTime) {
    const duration = (exitTime - entryTime) / (1000 * 60 * 60); 
    return rates[vehicleType] * duration;
}

module.exports = { calculateFee };
