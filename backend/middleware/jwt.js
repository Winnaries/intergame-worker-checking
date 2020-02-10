const passport = require('passport');
const JwtStrategy = require('passport-jwt').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;
const auth = (new require('../secure/auth'))();

const options = {};
options.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
options.secretOrKey = "DudeItsSecret";
passport.use(new JwtStrategy(options, (payload, done) => {
    if (!payload.passphrase) return done(null, false);
    if (auth.validatePayload(payload.passphrase)) {
        return done(null, { code: "CommitteeAY2019" });
    } else {
        return done(null, false);
    }
}));