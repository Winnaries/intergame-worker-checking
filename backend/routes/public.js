const express = require('express');
const dns = require('dns');
const router = express.Router();

const SessionController = new (require('../controller/sessions'))();
const WorkerController = new (require('../controller/workers'))();

router.get('/sessions', SessionController.all);

router.get('/sessions/active', SessionController.active);

router.get('/sessions/inactive', SessionController.inactive);

router.get('/sessions/:id', SessionController.get);

router.get('/workers/:studentID([0-9]{10})/sessions', WorkerController.mySessions);

router.get('/workers/:workerID/sessions', WorkerController.mySessions);

router.get('/workers/:sessionID', SessionController.allWorkers);

router.get('/workers/:sessionID/active', SessionController.activeWorkers);

router.get('/workers/:sessionID/pending', SessionController.pendingWorkers);

router.post('/workers/:sessionID/:workerID', SessionController.pendWorker);

router.post('/workers/:sessionID', SessionController.pendWorker);

router.get('/workers/:studentID/id', WorkerController.getID);

module.exports = router;