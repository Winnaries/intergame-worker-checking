require('./connection');
const { Worker, Session } = require('./schema/workforce');

class WorkerModel {

    // WORKED Get a WorkerID from StudentID
    async getID(studentID) {
        const worker = await Worker.findOne({ cuid: studentID });
        return worker._id;
    }

    // Get all sessions that a specified worker has joined
    async mySessionsFromID(workerID) {
        return Session.find(
            { workers: { $elemMatch: { worker: workerID, active: true }}},
            '-workers');
    }

}

module.exports = WorkerModel;
