const { web } = require('../config');

module.exports = {
  type: 'get',
  route: '/',
  run: function(request, response) {
    response.render('public/home', {
      title: web.title,
      request,
      navbars: web.navbarsDisplay
    });
  }
};