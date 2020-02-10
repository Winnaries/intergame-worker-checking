const express = require('express');
const router = express.Router();
const AuthController = (new require('../secure/auth.js'))();

router.post('/login', AuthController.login);

module.exports = router;