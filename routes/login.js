var express = require('express');
var router = express.Router();

var fs = require('fs');

let rawdata = fs.readFileSync('config.json');
const config = JSON.parse(rawdata);

const password = config['password'];

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.render('login', { title: "Login"});
});

/* POST users listing. */
router.post('/', function(req, res, next) {
  if (req.body.password === password) {
    res.cookie('connected', true, { maxAge: 900000, httpOnly: true });
    res.redirect('/');
  }
  else {
    res.render('login', { title: "Login", success: false});
  }
});

module.exports = router;
