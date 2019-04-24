const { web } = require('../config');
 
module.exports = {
  type: 'get',
  route: '/status',
  run: function(request, response) {
    response.render('public/status', {
      title: web.title,
      request,
      navbars: web.navbarsDisplay
    });
  }
};