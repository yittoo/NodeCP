const { web } = require('../config');

module.exports = {
  type: 'get',
  route: '/login',
  run: function(request, response) {
    if (request.session.loggedin) {
      response.redirect('/');
      return;
    }

    response.render('public/login', {
      request
    });
  }
};