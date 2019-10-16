var express = require('express');
var router = express.Router();
const db = require('../utils/db');

/* GET users listing. */
router.get('/', function (req, res, next) {
  res.end("USERS")
});

router.post('/register', function (req, res) {
  const { username, password } = req.headers;
  if (typeof username === 'undefined' || typeof password === 'undefined')
    res.end(`Make sure you pass the "username" and "password" in headers`)
  else {
    let sql = `INSERT INTO User (username,password) values ('${username}','${password}')`;
    db.query(sql)
      .then((result) => {
        console.log("Create account sucess!");
        res.end("Create account sucess!!!");
      })
      .catch((err) => {
        console.log(err);
      })
  }
})

module.exports = router;
