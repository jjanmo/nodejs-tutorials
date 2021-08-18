const User = require('../models/users.model');

const findAll = (req, res) => {
  User.getAll((error, data) => {
    if (error) {
      res.status(500).send({
        message: error.message || 'can not find all users',
      });
      return;
    }
    res.send(data);
  });
};

const findOne = (req, res) => {
  const id = req.params.id;

  res.send({ id });
};

const createOne = (req, res) => {
  const { email, nickname, password } = req.body;

  res.send({ email, nickname, password });
};

const updateOne = (req, res) => {
  const id = req.params.id;

  res.send({ id });
};

const deleteOne = (req, res) => {
  const id = req.params;

  res.send(id); // ?
};

module.exports = {
  findAll,
  findOne,
  createOne,
  updateOne,
  deleteOne,
};
