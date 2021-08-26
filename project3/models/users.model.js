const getConnection = require('../configs/db');

function User(user) {
  this.nickname = user.nickname;
  this.email = user.email;
  this.password = user.password;
}

User.getAll = function (result) {
  getConnection((conn) => {
    conn.query('SELECT  * from USERS', function (error, response) {
      console.log(error, response);
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
    conn.query(`SELECT * from USERS where id = ${id}`, function (error, response) {
      console.log(error, response);
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

module.exports = User;
