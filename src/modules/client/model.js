import mongoose, { Schema } from 'mongoose';
import validator from 'validator';
import uniqueValidator from 'mongoose-unique-validator';

const clientSchema = new Schema(
  {
    fullname: {
      type: String,
      required: [true, 'Please name is required'],
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
    id_type: {
      type: String,
      required: [true, 'Your id type is required'],
    },
    id: {
      type: String,
      required: [true, 'Your national identification is required'],
    },
    DOB: {
      type: String,
      required: [true, 'Your date of birth is required'],
    },
    location: {
      type: String,
      required: [true, 'Your location is required'],
    },
    occupation: {
      type: String,
    },
    vehicles: {
      type: Schema.Types.ObjectId,
      ref: 'Vehicle',
      required: [true, 'Vehicle is required in creating user'],
    },
  },
  { timeStamps: true },
);

clientSchema.plugin(uniqueValidator, {
  message: '{VALUE} already taken!',
});

// Defining methods on mongoose to be used on the model instance
clientSchema.methods = {
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

export default mongoose.model('Client', clientSchema);
