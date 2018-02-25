import mongoose, { Schema } from 'mongoose';

const vehicleSchema = new Schema(
  {
    make: String,
    color: String,
    model: String,
    regNumber: {
      type: String,
      required: [true, 'Please name is required'],
    },
    chassisNumber: {
      type: String,
      required: [true, 'Chassis number is required'],
      unique: [true, 'Your chassis number must be unique'],
    },
    purpose: {
      type: String,
      required: [true, 'Purpose of the vehicle is required'],
    },
    insuranceType: {
      type: String,
      required: [true, 'Please provide the insurance type'],
    },
    claims: [
      {
        type: Schema.Types.ObjectId,
        ref: 'Claim',
      },
    ],
  },
  { timestamps: true },
);

export default mongoose.model('Vehicle', vehicleSchema);
