# Smart Parking Lot System

A comprehensive backend solution for managing smart parking facilities built with Node.js and Express.

![Parking Management System](https://via.placeholder.com/800x400?text=Smart+Parking+System)

## Overview

This Smart Parking Lot System efficiently manages vehicle entry and exit, automatic parking space allocation, and fee calculation for multi-level parking facilities. The system tracks real-time parking spot availability and provides a RESTful API for seamless integration with frontend applications or IoT devices.

## Features

- **Automated Parking Spot Allocation**: Intelligently assigns available parking spots based on vehicle size
- **Vehicle Entry/Exit Management**: Records entry and exit times with corresponding spot assignments
- **Dynamic Fee Calculation**: Calculates parking fees based on duration and vehicle type
- **Real-time Availability Updates**: Maintains up-to-date status of all parking spots
- **Multi-floor Support**: Manages parking across multiple floors with different spot configurations
- **Concurrency Handling**: Properly handles multiple simultaneous entries and exits

## Tech Stack

- **Backend**: Node.js, Express.js
- **Database**: MongoDB
- **ODM**: Mongoose
- **API**: RESTful JSON API

## Installation

1. Clone the repository:
```bash
git clone https://github.com/yourusername/smart-parking-system.git
cd smart-parking-system
```

2. Install dependencies:
```bash
npm install
```

3. Set up MongoDB:
   - Ensure MongoDB is installed and running
   - The system will connect to `mongodb://localhost:27017/smartParkingDB` by default
   - To use a different connection string, modify it in the `app.js` file

4. Initialize the parking structure:
```bash
node scripts/initializeParking.js
```

5. Start the server:
```bash
node app.js
```

## Usage

### API Endpoints

#### 1. Vehicle Entry
```
POST /api/parking/entry
```
**Request Body**:
```json
{
  "licensePlate": "ABC123",
  "vehicleType": "CAR"
}
```
**Response**:
```json
{
  "licensePlate": "ABC123",
  "spotId": "F1-C05",
  "floor": 1,
  "entryTime": "2025-03-07T15:30:45.123Z"
}
```

#### 2. Vehicle Exit
```
POST /api/parking/exit
```
**Request Body**:
```json
{
  "licensePlate": "ABC123"
}
```
**Response**:
```json
{
  "licensePlate": "ABC123",
  "entryTime": "2025-03-07T15:30:45.123Z",
  "exitTime": "2025-03-07T17:45:12.456Z",
  "duration": "2.24 hours",
  "fee": 60
}
```

#### 3. Parking Status
```
GET /api/parking/status
```
**Response**:
```json
{
  "totalSpots": 185,
  "availableSpots": 142,
  "occupancyRate": "23.24%",
  "statusByType": [
    {
      "vehicleType": "MOTORCYCLE",
      "total": 50,
      "available": 42,
      "occupancyRate": "16.00%"
    },
    {
      "vehicleType": "CAR",
      "total": 120,
      "available": 93,
      "occupancyRate": "22.50%"
    },
    {
      "vehicleType": "BUS",
      "total": 15,
      "available": 7,
      "occupancyRate": "53.33%"
    }
  ]
}
```

## Data Models

### Parking Spot
- `spotId`: Unique identifier (e.g., "F1-C05")
- `floor`: Floor number
- `type`: Vehicle type (MOTORCYCLE, CAR, BUS)
- `isOccupied`: Occupancy status
- `vehicleId`: Reference to parked vehicle (if occupied)

### Vehicle
- `licensePlate`: Unique vehicle identifier
- `type`: Vehicle type (MOTORCYCLE, CAR, BUS)
- `entryTime`: Time of entry
- `exitTime`: Time of exit
- `isParked`: Current parking status
- `assignedSpot`: Reference to assigned parking spot

### Parking Transaction
- `vehicleId`: Reference to vehicle
- `spotId`: Reference to parking spot
- `entryTime`: Entry timestamp
- `exitTime`: Exit timestamp
- `fee`: Calculated parking fee
- `isPaid`: Payment status

## Parking Fee Structure

The system calculates fees based on hourly rates that vary by vehicle type:

| Vehicle Type | Hourly Rate |
|--------------|-------------|
| MOTORCYCLE   | 10 /-       |
| CAR          | 20 /-       |
| BUS          | 30 /-       |

Fees are calculated by rounding up to the nearest hour and multiplying by the appropriate hourly rate.

## Customization

### Parking Structure Configuration

The parking structure can be customized by modifying the `initializeParking.js` script. The default configuration creates:

- **Floor 1**: 20 motorcycle spots, 30 car spots, 10 bus spots
- **Floor 2**: 20 motorcycle spots, 40 car spots, 5 bus spots
- **Floor 3**: 10 motorcycle spots, 50 car spots, 0 bus spots

### Fee Rates

Fee rates can be adjusted by modifying the `hourlyRates` object in the `parkingService.js` file.

## Error Handling

The system includes robust error handling for common scenarios:
- No available parking spots
- Vehicle already parked
- Vehicle not found during exit
- Invalid input data

## Future Enhancements

- Payment gateway integration
- Reservation system
- Mobile application for users
- License plate recognition integration
- Reporting and analytics dashboard
- Notification system for vehicle owners

## Contributing

1. Fork the repository
2. Create your feature branch: `git checkout -b feature/amazing-feature`
3. Commit your changes: `git commit -m 'Add some amazing feature'`
4. Push to the branch: `git push origin feature/amazing-feature`
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the LICENSE file for details.
