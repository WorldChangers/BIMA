import mongoose, { Schema } from 'mongoose';

const claimSchema = new Schema(
  {
    claimReceiver: {
      type: String
    },
    company: {
      type: String,
      required: [true, 'Company is required']
    },
    amount: Number,
    type: {
      type: String,
      required: [true, 'Type of incidence required'],
    },
    date: {
      type: Date,
      required: [true, 'Date of incidence is required'],
    },
    placeReported: {
      type: String,
      trim: true
    },
    description: {
      type: String,
      required: [true, 'Description is required'],
    },
    peopleNumber: Number,
    driver: {
      type: String,
    },
    fraud: {
      type: String,
      required: true
    },
    paid: {
      type: String,
      required: true
    },
    numberInvolved: String,
    damagedPlace: Array,
  },
  { timestamps: true },
);

export default claimSchema
// Defining methods on mongoose to be used on the model instance

//export default mongoose.model('Claim', claimSchema);
