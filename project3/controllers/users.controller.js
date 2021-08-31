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
  User.findById(id, (error, data) => {
    if (error) {
      res.status(500).send({
        message: error.message || `error occurred while finding user : id ${id}`,
      });
      return;
    }

    if (data.type) {
      res.status(404).send({
        message: data.message,
      });
      return;
    }

    res.send(data);
  });
};

const createOne = (req, res) => {
  const { email, nickname, password } = req.body;
  const newUser = {
    email,
    password,
    nickname,
  };

  User.create(newUser, (error, data) => {
    if (error) {
      res.status(500).send({
        message: error.message || `can not create user : ${email}`,
      });
      return;
    }
    res.send(data);
  });
};

const updateOne = (req, res) => {
  const id = req.params.id;
  const { nickname, password } = req.body;
  User.updateById(id, [nickname, password], (error, data) => {
    if (error) {
      res.status(500).send({
        message: error.message || 'can not update user',
      });
      return;
    }

    let message;
    if (data.affectedRows === 1) {
      message = `User(id : ${id}) updated success`;
    } else if (data.affectedRows === 0) {
      message = 'No user to update';
    }
    const result = {
      ...data,
      message,
    };
    res.send(result);
  });
};

const deleteOne = (req, res) => {
  const id = req.params.id;
  User.deleteById(id, (error, data) => {
    if (error) {
      res.status(500).send({
        message: error.message || 'can not delete user',
      });
      return;
    }

    let message;
    if (data.affectedRows === 1) {
      message = `User(id : ${id}) deleted success`;
    } else if (data.affectedRows === 0) {
      message = 'No user to delete';
    }
    const result = {
      ...data,
      message,
    };
    res.send(result);
  });
};

module.exports = {
  findAll,
  findOne,
  createOne,
  updateOne,
  deleteOne,
};
