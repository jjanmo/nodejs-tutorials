const getConnection = require('../configs/db');

function User() {
  this.nickname = nickname;
  this.email = email;
  this.password = password;
}

User.getAll = function () {
  getConnection((connection) => {
    connection.query('SELECT  * from USERS', function (error, results, fields) {
      console.log(error, results, fields);
      connection.release();
      if (error) throw error;
    });
  });
};

module.exports = User;
