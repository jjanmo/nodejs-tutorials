const express = require('express');
const router = express.Router();
const { findAll, findOne, createOne, updateOne, deleteOne } = require('../controllers/users.controller');

router.get('/', findAll);
router.get('/:id', findOne);
router.post('/:id', createOne);
router.put('/:id', updateOne);
router.delete('/:id', deleteOne);

module.exports = router;
