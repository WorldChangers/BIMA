import mongoose, { Schema } from 'mongoose';

const vehicleSchema = new Schema(
  {
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
    value: {
      type: Number,
      required: [true, 'Price of the car is needed'],
    },
    premium: {
      type: Number,
      required: [true, 'Premium to be paid is needed'],
    },
    claimPaid: {
      type: Number,
    },
  },
  { timeStamps: true },
);

// Defining methods on mongoose to be used on the model instance
vehicleSchema.methods = {
  /**
   * Parse the user object in data we wanted to send
   *
   * @public
   * @returns {Object} User - ready for populate
   */
  toJSON() {
    return {
      _id: this._id,
      name: this.name,
      phone: this.phone,
    };
  },
};

export default mongoose.model('Vehicle', vehicleSchema);
