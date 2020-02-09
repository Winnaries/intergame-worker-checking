const JwtStrategy = require('passport-jwt').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;
const passport = require('passport');

const options = {};
options.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
options.secretOrKey = 'winnaries1987';
options.issuer = 'Committee 14 x Wasu';
passport.use(new JwtStrategy(options, (jwt_payload, done) => {
    console.log(jwt_payload);
}));


