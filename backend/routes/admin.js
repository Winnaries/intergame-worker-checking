const express = require('express');
const router = express.Router();

const SessionController = new (require('../controller/sessions'))();

router.put('/worker/activate/:sessionID', SessionController.activateWorker);

router.delete('/worker/:sessionID/:workerID', SessionController.removeWorker);

router.delete('/worker/:sessionID/:studentID', (req, res) => {});

router.post('/sessions', SessionController.create);

router.put('/sessions/:id', SessionController.edit);

router.put('/sessions/:id/:type', SessionController.toggle);

router.delete('/sessions/:id', SessionController.delete);

module.exports = router;