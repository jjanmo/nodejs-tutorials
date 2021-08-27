const getConnection = require('../configs/db');

function User(user) {
  this.nickname = user.nickname;
  this.email = user.email;
  this.password = user.password;
}

User.getAll = function (result) {
  getConnection((conn) => {
    conn.query('SELECT  * FROM users', function (error, response) {
      if (error) {
        result(error, null);
        return;
      }
      result(null, response);
    });
  });
};

User.findById = function (id, result) {
  getConnection((conn) => {
    conn.query(`SELECT * FROM users WHERE id = ${id}`, function (error, response) {
      if (error) {
        result(error, null);
      }
      if (response.length === 0) {
        result(null, { type: 404, message: `not found this user : id ${id}` });
        return;
      }
      result(null, response);
    });
  });
};

User.create = function (newUser, result) {
  getConnection((conn) => {
    conn.query(`INSERT INTO users SET ?`, newUser, (error, response) => {
      // console.log('🪴', error, response);
      if (error) {
        result(error, null);
      }
      result(null, response);
    });
  });
};

module.exports = User;
