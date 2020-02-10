const passport = require('passport');
const JwtStrategy = require('passport-jwt').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;
const auth = new (require('../secure/auth'))();

const opts = {};
opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
opts.secretOrKey = "DudeItsSecret";

module.exports = passport => {
    passport.use(new JwtStrategy(opts, (payload, done) => {
        if (!payload.passphrase) return done(null, false);
        if (auth.validatePayload(payload.passphrase)) {
            return done(null, {code: "CommitteeAY2019"});
        } else {
            return done(null, false);
        }
    }));
}