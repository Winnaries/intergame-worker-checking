const express = require('express');
const router = express.Router();

router.post('/worker/:session', (req, res) => {});

router.delete('/worker/:session', (req, res) => {});

router.post('/sessions', (req, res) => {});

router.put('/sessions/:id', (req, res) => {});

router.put('/sessions/:id/:type', (req, res) => {});

router.delete('/sessions/:id', (req, res) => {});

module.exports = router;