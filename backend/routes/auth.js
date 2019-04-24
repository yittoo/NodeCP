const { web, hashpassword, mysql } = require('../config');
const Mysql = require('../wrappers/mysql');
const connection = new Mysql(mysql.host, mysql.username, mysql.password, mysql.port, mysql.database);
const Login = require('../login');

module.exports = {
  type: 'post',
  route: '/auth',
  run: function(request, response) {
    if (!request.body.username || !request.body.password) {
      return response.send('no username or password given');
    }

    if (request.session.loggedin) {
      return response.send('Already logged in');
    }

    console.log(connection.get('login', 'userid', request.body.username));

    let login = Login.run('login', request.body.username, request.body.password);

    if (login.toLowerCase().includes('successfully logged')) {
      request.session.loggedin = true;
      request.session.username = request.body.username;
      response.end();
      response.redirect('/');
    } else {
      response.send(login);
      response.end();
    };  
  }
};