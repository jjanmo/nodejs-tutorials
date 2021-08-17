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

module.exports = {
  findAll,
};
