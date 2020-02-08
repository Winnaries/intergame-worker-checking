const express = require('express');
const dns = require('dns');
const router = express.Router();

const SessionController = new (require('../controller/sessions'))();

router.get('/sessions', SessionController.all);

router.get('/sessions/active', SessionController.active);

router.get('/sessions/inactive', SessionController.inactive);

router.get('/sessions/:id', SessionController.get);

router.get('/sessions/:studentID([0-9]{10})', (req, res) => {});

router.get('/workers/:sessionID', SessionController.allWorkers);

router.get('/workers/:sessionID/active', SessionController.activeWorkers);

router.get('/workers/:sessionID/pending', SessionController.pendingWorkers);

router.post('/worker/pend/:sessionID/:workerID', SessionController.pendWorker);

router.post('/worker/pend/:sessionID', (req, res) => {});

module.exports = router;