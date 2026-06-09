const FacebookStrategy = require('passport-facebook').Strategy;
const TikTokStrategy = require('passport-oauth2').Strategy; // simplified – use actual tiktok-passport if needed
const User = require('../models/User');

module.exports = (passport) => {
  passport.use(new FacebookStrategy({
    clientID: process.env.FACEBOOK_APP_ID,
    clientSecret: process.env.FACEBOOK_APP_SECRET,
    callbackURL: process.env.FACEBOOK_CALLBACK_URL,
    profileFields: ['id', 'displayName', 'emails']
  }, async (accessToken, refreshToken, profile, done) => {
    try {
      let user = await User.findOne({ facebookId: profile.id });
      if (user) {
        user.facebookToken = accessToken;
        await user.save();
        return done(null, user);
      }
      user = await User.findOne({ email: profile.emails[0].value });
      if (user) {
        user.facebookId = profile.id;
        user.facebookToken = accessToken;
        await user.save();
        return done(null, user);
      }
      user = new User({
        name: profile.displayName,
        email: profile.emails[0].value,
        facebookId: profile.id,
        facebookToken: accessToken
      });
      await user.save();
      done(null, user);
    } catch (err) {
      done(err, null);
    }
  }));

  passport.serializeUser((user, done) => done(null, user.id));
  passport.deserializeUser(async (id, done) => {
    const user = await User.findById(id);
    done(null, user);
  });
};
