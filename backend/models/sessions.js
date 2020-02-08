require('./connection');
const shortID = require('shortid');
const { Session, Worker } = require('./schema/workforce');

class SessionModel {

    // Get all sessions joined of a worker

    // Get all workers in a sessions
    async allWorkers(sessionID) {
        return Session.findById(sessionID).workers;
    }

    // Get all active workers in a sessions
    async activeWorkers(sessionID) {
        return Session.findById(sessionID).workers.filter(info => info.active === true);
    }

    // Get all pending workers in a session
    async pendingWorkers(sessionID) {
        return Session.findById(sessionID).workers.filter(info => info.active === false);
    }

    // Add pending worker to a session
    async pendWorker(sessionID, workerID) {
        const code = shortID.generate();
        const session = await Session.findOne({ _id: sessionID, workers: { $elemMatch: { worker: workerID }}});
        if (await session) return this.rependWorker(code, sessionID, workerID);
        await Session.updateOne(
            { _id: sessionID },
            { $push: { workers: { worker: workerID, code }}});
        return code;
    }

    // Regenerate the specified pending worker
    async rependWorker(code, sessionID, workerID) {
        await Session.updateOne(
            { _id: sessionID },
            { "workers.$[identifier].code": code },
            {
                multi: true,
                arrayFilters: [{ "identifier.worker": workerID }]
            });
        return code;
    }

    // Activate worker in a session
    async activateWorker(sessionID, code) {
        return Session.updateOne(
            { _id: sessionID },
            { "workers.$[identifier].active": true },
            {
                multi: true,
                arrayFilters: [{ "identifier.code": code }]
            });
    }

    // Remove active worker from a session
    async removeWorker(sessionID, workerID) {
        return Session.updateOne(
            { _id: sessionID },
            { $pull: { workers: { worker: workerID }}},
            { multi: true }
        );
    }

    // Get all sessions
    async all() {
        return Session.find({});
    }

    async active() {
        return Session.find({ active: true });
    }

    async inactive() {
        return Session.find({ active: false });
    }

    // Get a session
    async get(id) {
        return Session.findById(id);
    }

    // Create session
    async create(args) {
        const session = new Session();
        session.teams = args.teams;
        session.time.start = args.time.start;
        session.time.end = args.time.end;
        session.description = args.description;
        return session.save();
    }

    // Edit session
    async edit(id, args) {
        return Session.findByIdAndUpdate(id, args, { new: true });
    }

    // Open/Close session
    async toggle(id, state) {
        return Session.findByIdAndUpdate(id, { active: state }, { new: true });
    }

    // Delete session
    async delete(id) {
        return Session.findByIdAndDelete(id);
    }
}

module.exports = SessionModel;