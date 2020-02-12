const express = require('express');
const router = express.Router();

const SessionController = new (require('../controller/sessions'))();

router.put('/workers/activate/:sessionID', SessionController.activateWorker);

router.delete('/workers/:sessionID/:studentID([0-9]{10})', SessionController.removeWorker);

router.delete('/workers/:sessionID/:workerID', SessionController.removeWorker);

router.post('/sessions', SessionController.create);

router.put('/sessions/:id', SessionController.edit);

router.put('/sessions/:id/:type', SessionController.toggle);

router.delete('/sessions/:id', SessionController.delete);

module.exports = router;