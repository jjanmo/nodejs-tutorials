const express = require('express');
const router = express.Router();
const { findAll } = require('../controllers/users.controller');

router.get('/', findAll);

module.exports = router;
