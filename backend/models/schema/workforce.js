const mongoose = require('mongoose');
const Schema = mongoose.Schema;

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
    state: {
        type: Boolean,
        default: false
    },
    joined: [{
        type: Schema.Types.ObjectId,
        ref: 'Worker'
    }],
    pending: [{
        worker: {
            type: Schema.Types.ObjectId,
            ref: 'Worker'
        },
        identifier: {
            type: String,
            match: /[a-zA-Z0-9]{7}/,
            required: true,
            select: false
        }
    }]
});

const Worker = mongoose.model('Worker', workerSchema);
const Session = mongoose.model('Session', sessionSchema);

module.exports.Worker = Worker;
module.exports.Session = Session;
