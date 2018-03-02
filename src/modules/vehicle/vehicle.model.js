import mongoose, { Schema } from 'mongoose';
import ClaimSchema from '../claims/claims.model'

const vehicleSchema = new Schema (
  {
    make: String,
    color: String,
    model: String,
    modelYear: Number,
    NumberOfSeats: Number,
    NumberOfDoors: Number,
    regNumber: {
      type: String,
      required: [true, 'Please name is required'],
      trim: true
    },
    company: {
      type: String,
      required: [true, 'Company is required']
    },
    chassisNumber: {
      type: String,
      required: [true, 'Chassis number is required'],
      trim: true
    },
    purpose: {
      type: String,
      required: [true, 'Purpose of the vehicle is required'],
    },
    insuranceType: {
      type: String,
      required: [true, 'Please provide the insurance type'],
    },
    policyNumber: {
      type: String,
      required: [true, 'Policy number is required'],
      trim: true
    },
    claims: [ClaimSchema],
  },
  { timestamps: true },
);

export default mongoose.model('Vehicle', vehicleSchema);
