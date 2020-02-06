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
    departments: Array
});

const sessionSchema = new Schema({
    name: {
        type: String,
        maxlength: 20
    },
    time: {
        start: Date,
        end: Date
    },
    note: {
        type: String,
        maxlength: 100
    },
    participants: [{
        worker: {
            type: Schema.Types.ObjectId,
            ref: 'Worker'
        },
        activated: {
            type: Boolean,
            default: false
        }
    }]
});

const Worker = mongoose.model('Worker', workerSchema);
const Session = mongoose.model('Session', sessionSchema);

module.exports.Worker = Worker;
module.exports.Session = Session;
