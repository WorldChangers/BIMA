import mongoose, { Schema } from 'mongoose';

const claimSchema = new Schema(
  {
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
    },
    description: {
      type: String,
      required: [true, 'Description is required'],
    },
    peopleNumber: Number,
    driver: {
      type: String,
      required: [true, 'Person driving is required'],
    },
    paid: String,
    numberInvolved: String,
    damagedPlace: Array,
  },
  { timestamps: true },
);

// Defining methods on mongoose to be used on the model instance

export default mongoose.model('Claim', claimSchema);
