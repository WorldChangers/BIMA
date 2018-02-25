module.exports =
/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 13);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports) {

module.exports = require("express");

/***/ }),
/* 1 */
/***/ (function(module, exports) {

module.exports = require("mongoose");

/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
__webpack_require__(18).config();

const WHITELIST = {
  posts: {
    create: ['title', 'text'],
    update: ['title', 'text']
  },
  users: {
    create: ['email', 'username', 'password']
  }
};

const devConfig = {
  JWT_SECRET: process.env.JWT_SECRET_DEV,
  MONGO_URL: process.env.MONGO_URL
};

const testConfig = {
  JWT_SECRET: 'ewtijwebgiuweg9w98u9283982t!!u1h28h1t1h89u9h@$$',
  MONGO_URL: 'mongodb://kay:owusutk04@ds235328.mlab.com:35328/insurance'
};

const prodConfig = {
  JWT_SECRET: 'ewtijwebgiuweg9w98u9283982t!!u1h28h1t1h89u9h@$$',
  MONGO_URL: 'mongodb://kay:owusutk04@ds235328.mlab.com:35328/insurance'
};

const defaultConfig = {
  PORT: process.env.PORT || 3000,
  JWT_SECRET: 'ewtijwebgiuweg9w98u9283982t!!u1h28h1t1h89u9h@$$',
  MONGO_URL: 'mongodb://kay:owusutk04@ds235328.mlab.com:35328/insurance'

};

function envConfig(env) {
  switch (env) {
    case 'development':
      return devConfig;
    case 'test':
      return testConfig;
    default:
      return prodConfig;
  }
}

exports.default = Object.assign({}, defaultConfig, envConfig(process.env.NODE_ENV));

/***/ }),
/* 3 */
/***/ (function(module, exports) {

module.exports = require("express-validation");

/***/ }),
/* 4 */
/***/ (function(module, exports) {

module.exports = require("http-status");

/***/ }),
/* 5 */
/***/ (function(module, exports) {

module.exports = require("joi");

/***/ }),
/* 6 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.authJwt = exports.authLocal = undefined;

var _passport = __webpack_require__(8);

var _passport2 = _interopRequireDefault(_passport);

var _passportLocal = __webpack_require__(40);

var _passportLocal2 = _interopRequireDefault(_passportLocal);

var _passportJwt = __webpack_require__(41);

var _user = __webpack_require__(7);

var _user2 = _interopRequireDefault(_user);

var _constants = __webpack_require__(2);

var _constants2 = _interopRequireDefault(_constants);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

/**
 * Local Strategy Auth
 */
const localOpts = { usernameField: 'email' };

const localLogin = new _passportLocal2.default(localOpts, (() => {
  var _ref = _asyncToGenerator(function* (email, password, done) {
    try {
      const user = yield _user2.default.findOne({ email });

      if (!user) return done(null, false);else if (!user.comparePassword(password)) return done(null, false);

      return done(null, user);
    } catch (e) {
      return done(e, false);
    }
  });

  return function (_x, _x2, _x3) {
    return _ref.apply(this, arguments);
  };
})());

/**
 * JWT Strategy Auth
 */
const jwtOpts = {
  // Telling Passport to check authorization headers for JWT
  jwtFromRequest: _passportJwt.ExtractJwt.fromAuthHeaderWithScheme('JWT'),
  // Telling Passport where to find the secret
  secretOrKey: _constants2.default.JWT_SECRET
};

const jwtLogin = new _passportJwt.Strategy(jwtOpts, (() => {
  var _ref2 = _asyncToGenerator(function* (payload, done) {
    try {
      const user = yield _user2.default.findById(payload._id);

      if (!user) return done(null, false);

      return done(null, user);
    } catch (e) {
      return done(e, false);
    }
  });

  return function (_x4, _x5) {
    return _ref2.apply(this, arguments);
  };
})());

_passport2.default.use(localLogin);
_passport2.default.use(jwtLogin);

const authLocal = exports.authLocal = _passport2.default.authenticate('local', { session: false });
const authJwt = exports.authJwt = _passport2.default.authenticate('jwt', { session: false });

/***/ }),
/* 7 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _mongoose = __webpack_require__(1);

var _mongoose2 = _interopRequireDefault(_mongoose);

var _validator = __webpack_require__(9);

var _validator2 = _interopRequireDefault(_validator);

var _mongooseUniqueValidator = __webpack_require__(10);

var _mongooseUniqueValidator2 = _interopRequireDefault(_mongooseUniqueValidator);

var _bcryptNodejs = __webpack_require__(33);

var _jsonwebtoken = __webpack_require__(34);

var _jsonwebtoken2 = _interopRequireDefault(_jsonwebtoken);

var _constants = __webpack_require__(2);

var _constants2 = _interopRequireDefault(_constants);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const status = {
  manager: 'manager',
  admin: 'admin',
  notVerified: 'member'
};

const UserSchema = new _mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Please name is required']
  },
  email: {
    type: String,
    required: [true, 'Please provide your email address'],
    unique: true,
    lowercase: true,
    validate: {
      validator(email) {
        return _validator2.default.isEmail(email);
      },
      message: '{VALUE} is not an email address'
    }
  },
  phone: {
    type: Number,
    required: [true, 'Please provide your unique phone number'],
    unique: true,
    minlength: [10, 'Phone number must be valid'],
    maxlength: [10, 'Phone number must be valid']
  },
  password: {
    type: String,
    required: [true, 'Please provide your password'],
    validate: {
      validator(password) {
        return password.length >= 6 && password.match(/\d+/g);
      },
      message: '{VALUE} Please provide a strong password'
    }
  },
  organisation: {
    type: String,
    unique: true,
    required: [true, 'Insurance organisation is required']
  },
  status: {
    type: String,
    enum: Object.values(status),
    default: status.notVerified,
    required: [true, 'Status is needed']
  },
  clients: [{
    type: _mongoose.Schema.Types.ObjectId,
    ref: 'Clients'
  }],
  resetPasswordToken: String,
  resetPasswordExpires: Date
}, { timestamps: true });

UserSchema.plugin(_mongooseUniqueValidator2.default, {
  message: '{VALUE} already taken!'
});

// Defining a pre hock save function
UserSchema.pre('save', function (next) {
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
    return (0, _bcryptNodejs.hashSync)(password);
  },

  /**
   * Authenticate the user
   *
   * @public
   * @param {String} password - provided by the user
   * @returns {Boolean} isMatch - password match
   */
  comparePassword(password) {
    return (0, _bcryptNodejs.compareSync)(password, this.password);
  },

  /**
   * Generate a jwt token for authentication
   *
   * @public
   * @returns {String} token - JWT token
   */
  createToken() {
    return _jsonwebtoken2.default.sign({ _id: this._id }, _constants2.default.JWT_SECRET);
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
      token: `JWT ${this.createToken()}`
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
      org: this.organisation,
      token: `JWT ${this.createToken()}`
    };
  }
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
    return this.findOneAndUpdate({ email }, {
      $set: { resetPasswordToken: token, resetPasswordExpires: date }
    });
  }
};

exports.default = _mongoose2.default.model('User', UserSchema);

/***/ }),
/* 8 */
/***/ (function(module, exports) {

module.exports = require("passport");

/***/ }),
/* 9 */
/***/ (function(module, exports) {

module.exports = require("validator");

/***/ }),
/* 10 */
/***/ (function(module, exports) {

module.exports = require("mongoose-unique-validator");

/***/ }),
/* 11 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _mongoose = __webpack_require__(1);

var _mongoose2 = _interopRequireDefault(_mongoose);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const vehicleSchema = new _mongoose.Schema({
  make: String,
  color: String,
  model: String,
  regNumber: {
    type: String,
    required: [true, 'Please name is required']
  },
  chassisNumber: {
    type: String,
    required: [true, 'Chassis number is required'],
    unique: [true, 'Your chassis number must be unique']
  },
  purpose: {
    type: String,
    required: [true, 'Purpose of the vehicle is required']
  },
  insuranceType: {
    type: String,
    required: [true, 'Please provide the insurance type']
  },
  claims: [{
    type: _mongoose.Schema.Types.ObjectId,
    ref: 'Claim'
  }]
}, { timestamps: true });

exports.default = _mongoose2.default.model('Vehicle', vehicleSchema);

/***/ }),
/* 12 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _mongoose = __webpack_require__(1);

var _mongoose2 = _interopRequireDefault(_mongoose);

var _validator = __webpack_require__(9);

var _validator2 = _interopRequireDefault(_validator);

var _mongooseUniqueValidator = __webpack_require__(10);

var _mongooseUniqueValidator2 = _interopRequireDefault(_mongooseUniqueValidator);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const clientSchema = new _mongoose.Schema({
  fullname: {
    type: String,
    required: [true, 'Please name is required']
  },
  organization: {
    type: _mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  email: {
    type: String,
    unique: true,
    lowercase: true,
    validate: {
      validator(email) {
        return _validator2.default.isEmail(email);
      },
      message: '{VALUE} is not an email address'
    }
  },
  phone: {
    type: Number,
    required: [true, 'Please provide your unique phone number'],
    unique: true,
    minlength: [10, 'Phone number must be valid'],
    maxlength: [10, 'Phone number must be valid']
  },
  idType: {
    type: String,
    required: [true, 'Your id type is required']
  },
  id: {
    type: String,
    required: [true, 'Your national identification is required']
  },
  DOB: {
    type: String
  },
  location: {
    type: String,
    required: [true, 'Your location is required']
  },
  occupation: {
    type: String
  },
  vehicles: [{
    type: _mongoose.Schema.Types.ObjectId,
    ref: 'Vehicle'
  }]
}, { timestamps: true });

clientSchema.plugin(_mongooseUniqueValidator2.default, {
  message: '{VALUE} already taken!'
});

exports.default = _mongoose2.default.model('Client', clientSchema);

/***/ }),
/* 13 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(module) {

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _express = __webpack_require__(0);

var _express2 = _interopRequireDefault(_express);

var _chalk = __webpack_require__(15);

var _chalk2 = _interopRequireDefault(_chalk);

__webpack_require__(16);

var _middlewares = __webpack_require__(19);

var _middlewares2 = _interopRequireDefault(_middlewares);

var _constants = __webpack_require__(2);

var _constants2 = _interopRequireDefault(_constants);

var _modules = __webpack_require__(30);

var _modules2 = _interopRequireDefault(_modules);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/* eslint-disable no-console */
/**
 * Server setup
 */
const app = (0, _express2.default)();

app.get('/', (req, res) => {
  res.send('Welcome');
});
// Wrap all the middlewares with the server
(0, _middlewares2.default)(app);

// Add the apiRoutes stack to the server
(0, _modules2.default)(app);

// We need this to make sure we don't run a second instance
if (!module.parent) {
  app.listen(_constants2.default.PORT, err => {
    if (err) {
      console.log(_chalk2.default.red('Cannot run!'));
    } else {
      console.log(_chalk2.default.green.bold(`
        Keep Hacking 🍺
        App listen on port: ${_constants2.default.PORT} 🍕
        Env: ${process.env.NODE_ENV} 🦄
      `));
    }
  });
}

exports.default = app;
/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(14)(module)))

/***/ }),
/* 14 */
/***/ (function(module, exports) {

module.exports = function(module) {
	if(!module.webpackPolyfill) {
		module.deprecate = function() {};
		module.paths = [];
		// module.parent = undefined by default
		if(!module.children) module.children = [];
		Object.defineProperty(module, "loaded", {
			enumerable: true,
			get: function() {
				return module.l;
			}
		});
		Object.defineProperty(module, "id", {
			enumerable: true,
			get: function() {
				return module.i;
			}
		});
		module.webpackPolyfill = 1;
	}
	return module;
};


/***/ }),
/* 15 */
/***/ (function(module, exports) {

module.exports = require("chalk");

/***/ }),
/* 16 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _mongoose = __webpack_require__(1);

var _mongoose2 = _interopRequireDefault(_mongoose);

var _mongooseAutoIncrement = __webpack_require__(17);

var _mongooseAutoIncrement2 = _interopRequireDefault(_mongooseAutoIncrement);

var _constants = __webpack_require__(2);

var _constants2 = _interopRequireDefault(_constants);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// Remove the warning with Promise
_mongoose2.default.Promise = global.Promise;

// If debug run the mongoose debug options
/* eslint-disable no-console */

/**
 * Configuration for the database
 */

_mongoose2.default.set('debug', process.env.MONGOOSE_DEBUG);

// Connect the db with the url provide
try {
  const con = _mongoose2.default.connect(_constants2.default.MONGO_URL, {
    useMongoClient: true
  });
  _mongooseAutoIncrement2.default.initialize(con);
} catch (err) {
  _mongoose2.default.createConnection(_constants2.default.MONGO_URL, {
    useMongoClient: true
  });
}

_mongoose2.default.connection.once('open', () => console.log('MongoDB Running')).on('error', e => {
  throw e;
});

/***/ }),
/* 17 */
/***/ (function(module, exports) {

module.exports = require("mongoose-auto-increment");

/***/ }),
/* 18 */
/***/ (function(module, exports) {

module.exports = require("dotenv");

/***/ }),
/* 19 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _bodyParser = __webpack_require__(20);

var _bodyParser2 = _interopRequireDefault(_bodyParser);

var _morgan = __webpack_require__(21);

var _morgan2 = _interopRequireDefault(_morgan);

var _compression = __webpack_require__(22);

var _compression2 = _interopRequireDefault(_compression);

var _passport = __webpack_require__(8);

var _passport2 = _interopRequireDefault(_passport);

var _expressWinston = __webpack_require__(23);

var _expressWinston2 = _interopRequireDefault(_expressWinston);

var _helmet = __webpack_require__(24);

var _helmet2 = _interopRequireDefault(_helmet);

var _cors = __webpack_require__(25);

var _cors2 = _interopRequireDefault(_cors);

var _expressStatusMonitor = __webpack_require__(26);

var _expressStatusMonitor2 = _interopRequireDefault(_expressStatusMonitor);

var _shortid = __webpack_require__(27);

var _shortid2 = _interopRequireDefault(_shortid);

var _winston = __webpack_require__(28);

var _winston2 = _interopRequireDefault(_winston);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * Configuration of the server middlewares.
 */

const isTest = process.env.NODE_ENV === 'test';
const isDev = process.env.NODE_ENV === 'development';

exports.default = app => {
  app.use((0, _compression2.default)());
  app.use(_bodyParser2.default.json());
  app.use(_bodyParser2.default.urlencoded({ extended: true }));
  app.use(_passport2.default.initialize());
  app.use((0, _helmet2.default)());
  app.use((0, _cors2.default)());
  _shortid2.default.characters('0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ$@');
  app.use((0, _expressStatusMonitor2.default)());
  if (isDev && !isTest) {
    app.use((0, _morgan2.default)('dev'));
    _expressWinston2.default.requestWhitelist.push('body');
    _expressWinston2.default.responseWhitelist.push('body');
    app.use(_expressWinston2.default.logger({
      winstonInstance: _winston2.default,
      meta: true,
      msg: 'HTTP {{req.method}} {{req.url}}  {{res.statusCode}} {{res.responseTime}}ms',
      colorStatus: true
    }));
  }
};

/***/ }),
/* 20 */
/***/ (function(module, exports) {

module.exports = require("body-parser");

/***/ }),
/* 21 */
/***/ (function(module, exports) {

module.exports = require("morgan");

/***/ }),
/* 22 */
/***/ (function(module, exports) {

module.exports = require("compression");

/***/ }),
/* 23 */
/***/ (function(module, exports) {

module.exports = require("express-winston");

/***/ }),
/* 24 */
/***/ (function(module, exports) {

module.exports = require("helmet");

/***/ }),
/* 25 */
/***/ (function(module, exports) {

module.exports = require("cors");

/***/ }),
/* 26 */
/***/ (function(module, exports) {

module.exports = require("express-status-monitor");

/***/ }),
/* 27 */
/***/ (function(module, exports) {

module.exports = require("shortid");

/***/ }),
/* 28 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _winston = __webpack_require__(29);

var _winston2 = _interopRequireDefault(_winston);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const logger = new _winston2.default.Logger({
  transports: [new _winston2.default.transports.Console({
    json: true,
    colorize: true
  })]
}); /**
     * Create the winston logger instance
     */

exports.default = logger;

/***/ }),
/* 29 */
/***/ (function(module, exports) {

module.exports = require("winston");

/***/ }),
/* 30 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _user = __webpack_require__(31);

var _user2 = _interopRequireDefault(_user);

var _vehicle = __webpack_require__(42);

var _vehicle2 = _interopRequireDefault(_vehicle);

var _claims = __webpack_require__(46);

var _claims2 = _interopRequireDefault(_claims);

var _client = __webpack_require__(50);

var _client2 = _interopRequireDefault(_client);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/* Export the API routes to the index page */
exports.default = app => {
  app.use('/api/v1/users', _user2.default);
  app.use('/api/v1/claims', _claims2.default);
  app.use('/api/v1/vehicles', _vehicle2.default);
  app.use('/api/v1/clients', _client2.default);
};

/***/ }),
/* 31 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _express = __webpack_require__(0);

var _expressValidation = __webpack_require__(3);

var _expressValidation2 = _interopRequireDefault(_expressValidation);

var _user = __webpack_require__(32);

var userController = _interopRequireWildcard(_user);

var _user2 = __webpack_require__(39);

var _user3 = _interopRequireDefault(_user2);

var _auth = __webpack_require__(6);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const routes = new _express.Router();

// handles the user signup routes
routes.post('/signup', (0, _expressValidation2.default)(_user3.default.signup), userController.signup);

routes.post('/login', _auth.authLocal, userController.login);

// Handling forget password
// routes.post(
//   '/forget',
//   validate(userValidation.forget),
//   userController.forgetPassword,
// );

// routes.get('/forget/:token', (req, res) => {
//   res.send('Welcome to change your password');
// });

exports.default = routes;

/***/ }),
/* 32 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.forgetPassword = exports.login = exports.signup = undefined;

var _httpStatus = __webpack_require__(4);

var _httpStatus2 = _interopRequireDefault(_httpStatus);

var _user = __webpack_require__(7);

var _user2 = _interopRequireDefault(_user);

var _crypto = __webpack_require__(35);

var _crypto2 = _interopRequireDefault(_crypto);

var _email = __webpack_require__(37);

var _email2 = _interopRequireDefault(_email);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

const signup = exports.signup = (() => {
  var _ref = _asyncToGenerator(function* (req, res) {
    try {
      // User.collection.dropIndex({"username":1})
      yield _user2.default.create(req.body);
      return res.status(_httpStatus2.default.CREATED);
    } catch (e) {
      return res.status(_httpStatus2.default.BAD_REQUEST).json(e.errmsg);
    }
  });

  return function signup(_x, _x2) {
    return _ref.apply(this, arguments);
  };
})();

const login = exports.login = (req, res) => {
  res.status(_httpStatus2.default.ACCEPTED).json(req.user);
};

// Forget password
const forgetPassword = exports.forgetPassword = (() => {
  var _ref2 = _asyncToGenerator(function* (req, res) {
    try {
      const user = yield _user2.default.checkEmail(req.body.email);

      if (!user) return res.status(_httpStatus2.default.BAD_REQUEST).json({ error: 'Sorry no account found' });

      const date = Date.now() + 3600000;
      yield _user2.default.updateToken(user.email, (yield (0, _crypto2.default)()), date);

      yield (0, _email2.default)(user, (yield (0, _crypto2.default)()), req);

      return res.status(_httpStatus2.default.OK).json({ message: 'Reset password Email sent successfully' });
    } catch (e) {
      return res.sendStatus(_httpStatus2.default.BAD_REQUEST);
    }
  });

  return function forgetPassword(_x3, _x4) {
    return _ref2.apply(this, arguments);
  };
})();

// Todo
// To handle the change Password
// export const changePassword = async (req, res) => {
//   try {
//     const user = User.findOne({resetPasswordToken:req.params.token}, {$gt: {resetPassword}})
//   } catch(e){

//   }
// }

/***/ }),
/* 33 */
/***/ (function(module, exports) {

module.exports = require("bcrypt-nodejs");

/***/ }),
/* 34 */
/***/ (function(module, exports) {

module.exports = require("jsonwebtoken");

/***/ }),
/* 35 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _crypto = __webpack_require__(36);

var _crypto2 = _interopRequireDefault(_crypto);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = () => {
  const buff = _crypto2.default.randomBytes(20);
  const token = buff.toString('hex');
  return token;
};

/***/ }),
/* 36 */
/***/ (function(module, exports) {

module.exports = require("crypto");

/***/ }),
/* 37 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _postmark = __webpack_require__(38);

var _postmark2 = _interopRequireDefault(_postmark);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = (user, token, req) => {
  const client = new _postmark2.default.Client(process.env.POSTMARK);

  return client.sendEmailWithTemplate({
    From: 'noreply@xhairgallery.com',
    To: user.email,
    TemplateId: 4161945,
    TemplateModel: {
      product_name: 'TripON Inc',
      name: user.name,
      action_url: `${req.headers.host}/users/forget/${token}`,
      support_url: 'http://tripon.com/support',
      company_name: 'TripON',
      company_address: '21 Pawpaw Street, East Legon'
    }
  });
};

/***/ }),
/* 38 */
/***/ (function(module, exports) {

module.exports = require("postmark");

/***/ }),
/* 39 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _joi = __webpack_require__(5);

var _joi2 = _interopRequireDefault(_joi);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = {
  signup: {
    body: {
      name: _joi2.default.string().required(),
      phone: _joi2.default.number().required(),
      email: _joi2.default.string().email(),
      passsword: _joi2.default.string().regex(/^[a-zA-Z0-9]{6,30}$/),
      organisation: _joi2.default.string().required()
    }
  }
};

/***/ }),
/* 40 */
/***/ (function(module, exports) {

module.exports = require("passport-local");

/***/ }),
/* 41 */
/***/ (function(module, exports) {

module.exports = require("passport-jwt");

/***/ }),
/* 42 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _express = __webpack_require__(0);

var _expressValidation = __webpack_require__(3);

var _expressValidation2 = _interopRequireDefault(_expressValidation);

var _vehicle = __webpack_require__(43);

var vehicleController = _interopRequireWildcard(_vehicle);

var _vehicle2 = __webpack_require__(44);

var _vehicle3 = _interopRequireDefault(_vehicle2);

var _auth = __webpack_require__(6);

var _vehicle4 = __webpack_require__(45);

var _vehicle5 = _interopRequireDefault(_vehicle4);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const routes = new _express.Router();

routes.post('/', _auth.authJwt, (0, _expressValidation2.default)(_vehicle3.default.create), vehicleController.create);

exports.default = routes;

/***/ }),
/* 43 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.create = undefined;

var _httpStatus = __webpack_require__(4);

var _httpStatus2 = _interopRequireDefault(_httpStatus);

var _vehicle = __webpack_require__(11);

var _vehicle2 = _interopRequireDefault(_vehicle);

var _client = __webpack_require__(12);

var _client2 = _interopRequireDefault(_client);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

const create = exports.create = (() => {
  var _ref = _asyncToGenerator(function* (req, res) {
    try {
      const vehicle = yield _vehicle2.default.create(req.body);
      yield _client2.default.update({ _id: req.body.owner }, { $push: { vehicles: vehicle._id } });
      return res.status(_httpStatus2.default.CREATED).json({ vehicleId: vehicle._id });
    } catch (e) {
      console.log(e);
      return res.status(_httpStatus2.default.BAD_REQUEST).json(e.errmsg);
    }
  });

  return function create(_x, _x2) {
    return _ref.apply(this, arguments);
  };
})();

// // Prevent Zero Stage of the application by showing org previous uploaded claims
// export const getOrgClaims = (req, res) => {
//   try {
//     const claim = await Claim.findOne(req.user)
//     return res.status(HTTPStatus.ACCEPTED).json(claim);
//   } catch (e) {
//     return res.status(HTTPStatus.BAD_REQUEST).json(e.errmsg);
//   }

// };

// // Get all claims from the database
// export const getAllClaims = (req, res) => {
//     try {
//         const claims = await Claim.find()
//         return res.status(HTTPStatus.ACCEPTED).json(claims)
//     } catch (e) {
//         return res.status(HTTPStatus.BAD_REQUEST).json(e.errmsg)
//     }
// }

/***/ }),
/* 44 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _joi = __webpack_require__(5);

var _joi2 = _interopRequireDefault(_joi);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = {
  create: {
    body: {
      regNumber: _joi2.default.string().required(),
      chassisNumber: _joi2.default.string().required(),
      purpose: _joi2.default.string().required(),
      insuranceType: _joi2.default.string().required(),
      owner: _joi2.default.string().required()
    }
  }
};

/***/ }),
/* 45 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
// import mongoose from 'mongoose'
// const User = mongoose.model('User')

// export default {
//     checkClient: async (req, res, next) => {
//         const user = await req.user.populate('clients')
//         console.log(user)
//     }
// }


/***/ }),
/* 46 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _express = __webpack_require__(0);

var _expressValidation = __webpack_require__(3);

var _expressValidation2 = _interopRequireDefault(_expressValidation);

var _claims = __webpack_require__(47);

var claimController = _interopRequireWildcard(_claims);

var _claims2 = __webpack_require__(49);

var _claims3 = _interopRequireDefault(_claims2);

var _auth = __webpack_require__(6);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const routes = new _express.Router();

// handles the user signup routes
routes.post('/', _auth.authJwt, (0, _expressValidation2.default)(_claims3.default.create), claimController.create);

exports.default = routes;

/***/ }),
/* 47 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.create = undefined;

var _httpStatus = __webpack_require__(4);

var _httpStatus2 = _interopRequireDefault(_httpStatus);

var _claims = __webpack_require__(48);

var _claims2 = _interopRequireDefault(_claims);

var _vehicle = __webpack_require__(11);

var _vehicle2 = _interopRequireDefault(_vehicle);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

// Create Claim
const create = exports.create = (() => {
  var _ref = _asyncToGenerator(function* (req, res) {
    try {
      const claim = yield _claims2.default.create(req.body);
      yield _vehicle2.default.update({ _id: req.body.vehicle }, { $push: { claims: claim._id } });
      return res.status(_httpStatus2.default.CREATED).json({ msg: 'Claim created successfully' });
    } catch (e) {
      return res.status(_httpStatus2.default.BAD_REQUEST);
    }
  });

  return function create(_x, _x2) {
    return _ref.apply(this, arguments);
  };
})();

// // Prevent Zero Stage of the application by showing org previous uploaded claims
// export const getOrgClaims =  async (req, res) => {
//   try {
//     const claim = await Claim.findOne(req.user)
//     return res.status(HTTPStatus.ACCEPTED).json(claim);
//   } catch (e) {
//     return res.status(HTTPStatus.BAD_REQUEST).json(e.errmsg);
//   }

// };

// // Get all claims from the database
// export const getAllClaims = async (req, res) => {
//     try {
//         const claims = await Claim.find()
//         return res.status(HTTPStatus.ACCEPTED).json(claims)
//     } catch (e) {
//         return res.status(HTTPStatus.BAD_REQUEST).json(e.errmsg)
//     }
// }

// // Todo
// // To handle the change Password
// // export const changePassword = async (req, res) => {
// //   try {
// //     const user = User.findOne({resetPasswordToken:req.params.token}, {$gt: {resetPassword}})
// //   } catch(e){

// //   }
// // }

/***/ }),
/* 48 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _mongoose = __webpack_require__(1);

var _mongoose2 = _interopRequireDefault(_mongoose);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const claimSchema = new _mongoose.Schema({
  amount: Number,
  type: {
    type: String,
    required: [true, 'Type of incidence required']
  },
  date: {
    type: Date,
    required: [true, 'Date of incidence is required']
  },
  placeReported: {
    type: String
  },
  description: {
    type: String,
    required: [true, 'Description is required']
  },
  peopleNumber: Number,
  driver: {
    type: String,
    required: [true, 'Person driving is required']
  },
  paid: String,
  numberInvolved: String,
  damagedPlace: Array
}, { timestamps: true });

// Defining methods on mongoose to be used on the model instance

exports.default = _mongoose2.default.model('Claim', claimSchema);

/***/ }),
/* 49 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _joi = __webpack_require__(5);

var _joi2 = _interopRequireDefault(_joi);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = {
  create: {
    body: {
      type: _joi2.default.string().required(),
      date: _joi2.default.string().required(),
      driver: _joi2.default.string().required(),
      description: _joi2.default.string().required(),
      vehicle: _joi2.default.string().required()
    }
  }
};

/***/ }),
/* 50 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _express = __webpack_require__(0);

var _expressValidation = __webpack_require__(3);

var _expressValidation2 = _interopRequireDefault(_expressValidation);

var _client = __webpack_require__(51);

var clientController = _interopRequireWildcard(_client);

var _client2 = __webpack_require__(52);

var _client3 = _interopRequireDefault(_client2);

var _auth = __webpack_require__(6);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const routes = new _express.Router();

// handles the vehicle creation
routes.post('/', _auth.authJwt, clientController.create);

routes.get('/', _auth.authJwt, clientController.getClients);

exports.default = routes;

/***/ }),
/* 51 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getClients = exports.create = undefined;

var _httpStatus = __webpack_require__(4);

var _httpStatus2 = _interopRequireDefault(_httpStatus);

var _client = __webpack_require__(12);

var _client2 = _interopRequireDefault(_client);

var _user = __webpack_require__(7);

var _user2 = _interopRequireDefault(_user);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

// Create Claim
const create = exports.create = (() => {
  var _ref = _asyncToGenerator(function* (req, res) {
    try {
      //Client.collection.dropIndex({"email":1})

      req.body.organization = req.user._id;
      const client = yield _client2.default.create(req.body);
      yield _user2.default.update({ _id: req.user._id }, { $push: { clients: client._id } });
      return res.status(_httpStatus2.default.CREATED).json({ clientId: client._id });
    } catch (e) {
      console.log(e);
      return res.status(_httpStatus2.default.BAD_REQUEST);
    }
  });

  return function create(_x, _x2) {
    return _ref.apply(this, arguments);
  };
})();

const getClients = exports.getClients = (() => {
  var _ref2 = _asyncToGenerator(function* (req, res) {
    try {
      const clients = yield _client2.default.find({}).populate({
        path: 'vehicles',
        populate: {
          path: 'claims'
        }
      }).sort({ createdAt: 'desc' });
      return res.status(_httpStatus2.default.ACCEPTED).json(clients);
    } catch (e) {
      console.log(e);
      return res.status(_httpStatus2.default.BAD_REQUEST);
    }
  });

  return function getClients(_x3, _x4) {
    return _ref2.apply(this, arguments);
  };
})();

/***/ }),
/* 52 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _joi = __webpack_require__(5);

var _joi2 = _interopRequireDefault(_joi);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = {
  create: {
    body: {
      fullname: _joi2.default.string().required(),
      phone: _joi2.default.number().required(),
      idType: _joi2.default.string().required(),
      id: _joi2.default.string().required(),
      location: _joi2.default.string().required()
    }
  }
};

/***/ })
/******/ ]);