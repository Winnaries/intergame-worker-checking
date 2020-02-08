const express = require('express');
const parser = require('body-parser');
const auth = require('./routes/auth.js');
const admin = require('./routes/admin.js');
const public = require('./routes/public.js');

const app = express();
app.use(parser.json());
app.use('/api/admin', auth);
app.use('/api/admin', admin);
app.use('/api', public);
app.listen('3000');