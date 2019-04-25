const { web } = require('../config');

module.exports = {
  type: 'get',
  route: '/register',
  run: function(request, response) {
    if (request.session.loggedin) {
      response.redirect('/');
      return;
    }

    response.render('public/register', {
      title: web.title,
      request,
      navbars: web.navbarsDisplay
    });
  }
};