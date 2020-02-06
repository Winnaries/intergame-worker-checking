require('./connection');
const { Session, Worker } = require('./schema/workforce');

class SessionModel {

    // Get all sessions joined of a worker

    // Add pending worker to a session

    // Activate worker in a session

    // Remove active worker from a session

    // Get all sessions
    async all() {
        return Session.find({});
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
        return Session.findByIdAndUpdate(id, args);
    }

    // Open/Close session
    async toggle(id, state) {
        return Session.findByIdAndUpdate(id, { state });
    }

    // Delete session
    async delete(id) {
        return Session.findByIdAndDelete(id);
    }
}

module.exports.SessionModel = SessionModel;