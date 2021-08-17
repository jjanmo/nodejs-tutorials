const User = require('../models/users.model');

const getAll = (req, res) => {
  // user 가져오기
  User.getAll((error, data) => {
    if (error) throw error;

    res.send(data);
  });
  res.send('all user');
};

module.exports = {
  getAll,
};
