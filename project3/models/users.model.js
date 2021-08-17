const getConnection = require('../configs/db');

function User() {
  this.nickname = nickname;
  this.email = email;
  this.password = password;
}

User.getAll = function (result) {
  getConnection((connection) => {
    connection.query('SELECT  * from USERS', function (error, response) {
      console.log(error, response);
      if (error) {
        result(error, null);
        return;
      }

      result(null, response);
    });
  });
};

module.exports = User;
