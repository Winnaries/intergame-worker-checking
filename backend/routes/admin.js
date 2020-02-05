const express = require('express');
const router = express.Router();

router.post('/admin/worker/:session', (req, res) => {});

router.delete('/admin/worker/:session', (req, res) => {});

router.post('/admin/sessions', (req, res) => {});

router.put('/admin/sessions/:id', (req, res) => {});

router.put('/admin/sessions/:id/:type', (req, res) => {});

router.delete('/admin/sessions/:id', (req, res) => {});

module.exports = router;