/* eslint-disable no-console */

/**
 * Configuration for the database
 */

import mongoose from 'mongoose';
import autoIncrement from 'mongoose-auto-increment';
import constants from './constants';

// Remove the warning with Promise
mongoose.Promise = global.Promise;

// If debug run the mongoose debug options
mongoose.set('debug', process.env.MONGOOSE_DEBUG);

// Connect the db with the url provide
try {
  const con = mongoose.connect(constants.MONGO_URL, {
    useMongoClient: true,
  });
  autoIncrement.initialize(con);
} catch (err) {
  mongoose.createConnection(constants.MONGO_URL, {
    useMongoClient: true,
  });
}

mongoose.connection
  .once('open', () => console.log('MongoDB Running'))
  .on('error', e => {
    throw e;
  });
