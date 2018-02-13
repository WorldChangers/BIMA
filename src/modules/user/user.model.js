import mongoose, { Schema } from 'mongoose';
import validator from 'validator';
import uniqueValidator from 'mongoose-unique-validator';
import { hashSync, compareSync } from 'bcrypt-nodejs';
import jwt from 'jsonwebtoken';
import constants from '../../config/constants';

const status = {
  owner: 'owner',
  manager: 'manager',
  teller: 'teller',
  admin: 'admin',
  notVerified: 'member',
};

const UserSchema = new Schema(
  {
    name: {
      type: String,
      required: [true, 'Please name is required'],
    },
    email: {
      type: String,
      required: [true, 'Please provide your email address'],
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
    password: {
      type: String,
      required: [true, 'Please provide your password'],
      validate: {
        validator(password) {
          return password.length >= 6 && password.match(/\d+/g);
        },
        message: '{VALUE} Please provide a strong password',
      },
    },
    organisation: {
      type: String,
      required: [true, 'Insurance organisation is required']
    },
    status: {
      type: String,
      enum: Object.values(status),
      default: status.notVerified,
      required: [true, 'Status is needed'],
    },
    resetPasswordToken: String,
    resetPasswordExpires: Date,
  },
  { timeStamps: true },
);

UserSchema.plugin(uniqueValidator, {
  message: '{VALUE} already taken!',
});

// Defining a pre hock save function
UserSchema.pre('save', function(next) {
  if (this.isModified('password')) {
    this.password = this._hashPasword(this.password);
  }
  return next();
});

// Defining methods on mongoose to be used on the model instance
UserSchema.methods = {
  /**
   * Hash the user password
   *
   * @private
   * @param {String} password - user password choose
   * @returns {String} password - hash password
   */
  _hashPasword(password) {
    return hashSync(password);
  },

  /**
   * Authenticate the user
   *
   * @public
   * @param {String} password - provided by the user
   * @returns {Boolean} isMatch - password match
   */
  comparePassword(password) {
    return compareSync(password, this.password);
  },

  /**
   * Generate a jwt token for authentication
   *
   * @public
   * @returns {String} token - JWT token
   */
  createToken() {
    return jwt.sign({ _id: this._id }, constants.JWT_SECRET);
  },

  /**
   * Parse the user object in data we wanted to send when is auth
   *
   * @public
   * @returns {Object} User - ready for auth
   */
  toAuthJSON() {
    return {
      _id: this._id,
      token: `JWT ${this.createToken()}`,
    };
  },

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

UserSchema.statics = {
  /**
 * Find a User via Email
 *
 * @public
 * @param {String} Email from the user
 * @returns {Object} returns user email
 */
  checkEmail(email) {
    return this.findOne({ email });
  },

  /**
  * Update Reset Password Token
  */

  updateToken(email, token, date) {
    return this.findOneAndUpdate(
      { email },
      {
        $set: { resetPasswordToken: token, resetPasswordExpires: date },
      },
    );
  },
};

export default mongoose.model('User', UserSchema);
