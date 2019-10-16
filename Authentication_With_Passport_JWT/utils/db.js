const mysql = require('mysql');

var con = mysql.createConnection ({
  host: 'localhost',
  user: 'root',
  password: '123456789',
  database: 'test_login_passport_jwt'
});

module.exports = {
  query: sql => {
    return new Promise ((resolve, reject) => {
      con.query (sql, (error, results, fields) => {
        if (error) reject (error);
        else resolve (results);
      });
    });
  },
};
