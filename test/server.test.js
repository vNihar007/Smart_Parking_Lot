const request = require('supertest');
const { app } = require('../app');
const mongoose = require('mongoose');
const ParkingSpot = require('../models/parkingspot');
const Transaction = require('../models/Transaction');
const Vehicle = require('../models/Vehicle');

beforeAll(async () => {
  await mongoose.connect(process.env.MONGO_URI);
});

afterAll(async () => {
  await mongoose.disconnect();
});

describe('Parking API Endpoints', () => {
  let vehicle;
  let transactionId;

  test('POST /api/parking/checkin - success', async () => {
    const res = await request(app)
      .post('/api/parking/checkin')
      .send({ type: 'car', licensePlate: 'TEST-1234' });

    expect(res.status).toBe(201);
    expect(res.body.message).toBe('Check-in successful');
    expect(res.body.transaction).toHaveProperty('vehicleId');
    expect(res.body.transaction).toHaveProperty('spotId');

    transactionId = res.body.transaction._id;
  });

  test('POST /api/parking/checkin - failure (no available spots)', async () => {
    await ParkingSpot.updateMany({ status: 'available' }, { $set: { status: 'occupied' } });

    const res = await request(app)
      .post('/api/parking/checkin')
      .send({ type: 'car', licensePlate: 'FULL-9999' });

    expect(res.status).toBe(500);
    expect(res.body.message).toBe('Check-in failed');
    expect(res.body.error).toMatch(/No available spots/);
  });

  test('POST /api/parking/checkout - success', async () => {
    const res = await request(app)
      .post('/api/parking/checkout')
      .send({ transactionId });

    expect(res.status).toBe(200);
    expect(res.body.message).toBe('Check-out successful');
    expect(res.body.transaction).toHaveProperty('exitTime');
    expect(res.body.transaction).toHaveProperty('fee');
  });

  test('POST /api/parking/checkout - failure (invalid transaction)', async () => {
    const res = await request(app)
      .post('/api/parking/checkout')
      .send({ transactionId: 'invalidtransactionid' });

    expect(res.status).toBe(404);
    expect(res.body.message).toBe('Transaction not found');
  });

  test('GET /api/parking/availability - success', async () => {
    const res = await request(app).get('/api/parking/availability');

    expect(res.status).toBe(200);
    expect(res.body.spots).toBeInstanceOf(Array);
  });
});
