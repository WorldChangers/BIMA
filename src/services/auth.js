import passport from 'passport';
import LocalStrategy from 'passport-local';
import { Strategy as JWTStrategy, ExtractJwt } from 'passport-jwt';

import User from '../modules/user/user.model';
import constants from '../config/constants';

/**
 * Local Strategy Auth
 */
const localOpts = { usernameField: 'email' };

const localLogin = new LocalStrategy(
  localOpts,
  async (email, password, done) => {
    try {
      const user = await User.findOne({ email });

      if (!user) return done(null, false);
      else if (!user.comparePassword(password)) return done(null, false);

      return done(null, user);
    } catch (e) {
      return done(e, false);
    }
  },
);

/**
 * JWT Strategy Auth
 */
const jwtOpts = {
  // Telling Passport to check authorization headers for JWT
  jwtFromRequest: ExtractJwt.fromAuthHeaderWithScheme('JWT'),
  // Telling Passport where to find the secret
  secretOrKey: constants.JWT_SECRET,
};

const jwtLogin = new JWTStrategy(jwtOpts, async (payload, done) => {
  try {
    const user = await User.findById(payload._id);
    console.log(user)
    if (!user) return done(null, false);

    return done(null, user);
  } catch (e) {
    return done(e, false);
  }
});

passport.use(localLogin);
passport.use(jwtLogin);

export const authLocal = passport.authenticate('local', { session: false });
export const authJwt = passport.authenticate('jwt', { session: false });
