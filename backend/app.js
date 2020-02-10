const express = require('express');
const cors = require('cors');
const parser = require('body-parser');
const auth = require('./routes/auth.js');
const admin = require('./routes/admin.js');
const public = require('./routes/public.js');
const passport = require('passport');

const app = express();
app.use(cors());
app.use(parser.json());
app.use(passport.initialize());
app.use('/api/test', passport.authenticate('jwt'));
app.use('/api/test', admin);
app.use('/api/admin', auth);
app.use('/api/admin', admin);
app.use('/api', public);
app.listen('3000');