import mongoose, { Schema } from 'mongoose';
import validator from 'validator';
import uniqueValidator from 'mongoose-unique-validator';

const clientSchema = new Schema(
  {
    fullname: {
      type: String,
      required: [true, 'Please name is required'],
    },
    organization: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    email: {
      type: String,
      unique: true,
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
      unique: true,
      minlength: [10, 'Phone number must be valid'],
      maxlength: [10, 'Phone number must be valid'],
    },
    idType: {
      type: String,
      required: [true, 'Your id type is required'],
    },
    id: {
      type: String,
      required: [true, 'Your national identification is required'],
    },
    DOB: {
      type: String,
    },
    location: {
      type: String,
      required: [true, 'Your location is required'],
    },
    occupation: {
      type: String,
    },
    vehicles: [
      {
        type: Schema.Types.ObjectId,
        ref: 'Vehicle',
      },
    ],
  },
  { timestamps: true },
);

clientSchema.plugin(uniqueValidator, {
  message: '{VALUE} already taken!',
});

export default mongoose.model('Client', clientSchema);
