const _ = require('lodash');
const Worker = new (require('../models/workers'))();
const Session = new (require('../models/sessions'))();

class WorkerController {

    async mySessions(req, res) {
        if (!req.params.workerID) req.params.workerID = await Worker.getID(req.params.studentID);
        res.json(await Worker.mySessionsFromID(req.params.workerID));
    }

    async getID(req, res) {
        res.json(await Worker.getID(req.params.studentID));
    }

}

module.exports = WorkerController;