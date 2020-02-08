const _ = require('lodash');
const Session = new (require('../models/sessions'))();
const Worker = new (require('../models/workers'))();

class SessionController {

    async allWorkers(req, res) {
        const { sessionID } = req.params;
        res.send(await Session.allWorkers(sessionID));
    }

    async activeWorkers(req, res) {
        const { sessionID } = req.params;
        res.send(await Session.activeWorkers(sessionID));
    }

    async pendingWorkers(req, res) {
        const { sessionID } = req.params;
        res.send(await Session.pendingWorkers(sessionID) || 400);
    }

    async pendWorker(req, res) {
        if (!req.params.workerID) req.params.workerID = await Worker.getID(req.body.studentID);
        const code = await Session.pendWorker(req.params.sessionID, req.params.workerID);
        if (!code) {
            res.json({ error: "The session is currently closed." });
        } else {
            res.json({ identifier: code });
        }
    }

    async activateWorker(req, res) {
        const { sessionID } = req.params;
        const { identifier: code } = req.body;
        await Session.activateWorker(sessionID, code);
        res.json({ code, status: "activated" })
    }

    async removeWorker(req, res) {
        if (!req.params.workerID) req.params.workerID = await Worker.getID(req.params.studentID);
        const { sessionID, workerID } = req.params;
        res.send(await Session.removeWorker(sessionID, workerID));
    }

    async all(req, res) {
        res.send(await Session.all());
    }

    async active(req, res) {
        res.send(await Session.active());
    }

    async inactive(req, res) {
        res.send(await Session.inactive())
    }

    async get(req, res) {
        res.send(await Session.get(req.params.id))
    }

    async create(req, res) {
        const { teams, note: description, date, start: timeA, end: timeB } = req.body;
        const { start, end } = buildInterval(date, timeA, timeB);
        const args = {
            teams,
            time: {
                start,
                end
            },
            description
        };
        res.send(await Session.create(args));
    }

    async edit(req, res) {
        const { teams, note: description, date, start: timeA, end: timeB } = req.body;
        const { start, end } = buildInterval(date, timeA, timeB);
        const args = {
            teams,
            time: {
                start,
                end
            },
            description
        };
        res.send(await Session.edit(req.params.id, args));
    }

    async toggle(req, res) {
        if (req.params.type === 'open')
            res.send(await Session.toggle(req.params.id, true));
        else if (req.params.type === 'close')
            res.send(await Session.toggle(req.params.id, false));
        else res.send(400);
    }

    async delete(req, res) {
        res.send(await Session.delete(req.params.id));
    }

}

function buildInterval(date, timeA, timeB) {
    date = _.split(date, /[:/]/).map(n => _.parseInt(n));
    timeA = _.split(timeA, /:/).map(n => _.parseInt(n));
    timeB = _.split(timeB, /:/).map(n => _.parseInt(n));
    const start = new Date();
    start.setMonth(date[1], date[0]);
    start.setHours(timeA[0], timeA[1], 0, 0);
    const end = new Date();
    end.setMonth(date[1], date[0]);
    end.setHours(timeB[0], timeB[1], 0, 0);
    return { start, end };
}

module.exports = SessionController;

