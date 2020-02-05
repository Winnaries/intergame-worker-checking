const express = require('express');
const router = express.Router();

router.get('/sessions', (req, res) => {});

router.get('/sessions/:id', (req, res) => {});

router.get('/sessions/:studentID([0-9]{10})', (req, res) => {});

router.get('/students/:sessionID([0-9]+)', (req, res) => {});

router.post('/qr/:sessionID', (req, res) => {});

module.exports = router;