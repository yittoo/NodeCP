module.exports = {
  type: 'get',
  route: '/logout',
  run: function(request, response) {
    if (!request.session.loggedin) {
      response.redirect('/');
      return response.end();
    }

    request.session.loggedin = false;
    request.session.username = null;

    response.redirect('/');
    return response.end();
  }
};