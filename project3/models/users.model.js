const getConnection = require('../configs/db');

function User(user) {
  this.nickname = user.nickname;
  this.email = user.email;
  this.password = user.password;
}

User.getAll = function (result) {
  getConnection(conn => {
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
  getConnection(conn => {
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
  getConnection(conn => {
    conn.query('INSERT INTO users SET ?', newUser, (error, response) => {
      if (error) {
        result(error, null);
      }
      result(null, response);
    });
  });
};

User.updateById = function (id, updatedUser, result) {
  getConnection(conn => {
    conn.query('UPDATE users SET nickname = ?, password = ?  WHERE id = ?', [...updatedUser, id], (error, response) => {
      if (error) {
        result(error, null);
      }
      result(null, response);
    });
  });
};

User.deleteById = function (id, result) {
  getConnection(conn => {
    conn.query('DELETE FROM users WHERE id = ?', id, (error, response) => {
      if (error) {
        result(error, null);
      }
      result(null, response);
    });
  });
};

module.exports = User;
