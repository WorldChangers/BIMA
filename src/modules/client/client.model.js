import mongoose, { Schema } from 'mongoose';
import validator from 'validator';
import uniqueValidator from 'mongoose-unique-validator';

const clientSchema = new Schema(
  {
    name: {
      type: String,
      required: [true, 'Please name is required'],
    },
    company: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    fraud: {
      type: String,
    },
    email: {
      type: String,
      lowercase: true,
      validate: {
        validator(email) {
          return validator.isEmail(email);
        },
        message: '{VALUE} is not an email address',
      },
    },
    phone: {
      type: Number,
      required: [true, 'Please provide your unique phone number'],
      trim: true
    },
    idType: {
      type: String,
      required: [true, 'Your id type is required'],
    },
    idNumber: {
      type: String,
      required: [true, 'Your national identification is required'],
      trim: true
    },
    fraud: {
      type: String,
      required: [true, 'Fraud is required']
    },
    DOB: Date,
    location: {
      type: String,
      required: [true, 'Your location is required'],
    },
    occupation: {
      type: String,
      trim: true
    },
    vehicle: {
        type: Schema.Types.ObjectId,
        ref: 'Vehicle',
    },
    
  },
  { timestamps: true },
);

clientSchema.virtual('riskScore').get( async function(id){

  const Client = mongoose.model('Client')
  let riskScore = 5
  
  const numberOfClaim = await Client.find({_id:id}).length

  return riskScore - numberOfClaim
})

clientSchema.plugin(uniqueValidator, {
  message: '{VALUE} already taken!',
});

export default mongoose.model('Client', clientSchema);
