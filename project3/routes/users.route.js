const express = require('express');
const router = express.Router();
const { getAll } = require('../controllers/users.controller');

router.get('/', getAll);

module.exports = router;
