const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const shortID = require('shortid');

const workerSchema = new Schema({
    name: {
        first: String,
        last: String,
        nick: String
    },
    cuid: {
        type: String,
        match: /[0-9]{10}/
    },
    tel: {
        type: String,
        match: /[0-9]{10}/
    },
    major: String,
    teams: Array
});

const sessionSchema = new Schema({
    teams: [{
        type: String,
        maxlength: 10
    }],
    time: {
        start: Date,
        end: Date
    },
    description: {
        type: String,
        maxlength: 100
    },
    active: {
        type: Boolean,
        default: false
    },
    workers: [{
        worker: {
            type: Schema.Types.ObjectId,
            ref: 'Worker'
        },
        active: {
            type: Boolean,
            default: false
        },
        code: {
            type: String,
            default: shortID.generate()
        },
        ip: String,
        machine: String,
        suspicious: {
            type: Boolean,
            default: false
        }
    }]
});

const Worker = mongoose.model('Worker', workerSchema);
const Session = mongoose.model('Session', sessionSchema);

module.exports.Worker = Worker;
module.exports.Session = Session;
