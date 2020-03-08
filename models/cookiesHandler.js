var cookies = require('../models/cookiesHandler');

exports.getcookie = (req) => {
  var cookie = req.headers.cookie;
  var cookies = {};

  var i = cookie.split('; ');
  i.forEach(function (element) {
    cookies[element.split('=')[0]] = element.split('=')[1]
  });
  return cookies
};

exports.checkConnected = (res, req) => {
  if (!cookies.getcookie(req)['connected']) {
    res.redirect('/login');
  }
  else return true
};
