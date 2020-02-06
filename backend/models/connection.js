const mongoose = require('mongoose');
const config = require('config');

const dbUrl = config.get('Workforce.dbUrl');
const dbConfig = config.get('Workforce.dbConfig');

mongoose.connect(dbUrl, dbConfig).catch(err => console.log(err));
mongoose.connection
    .on('connecting', () => console.log('DB: Connecting'))
    .on('connected', () => console.log('DB: Connected'))
    .on('disconnecting', () => console.log('DB: Disconnecting'))
    .on('disconnected', () => console.log('DB: Disconnected'))
    .on('close', () => console.log('DB: Close'))
    .on('reconnected', () => console.log('DB: Reconnected'))
    .on('error', (err) => console.log('DB: Error', err));

module.exports = mongoose.connection;