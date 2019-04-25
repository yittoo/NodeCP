const { web, hashpassword, mysql } = require('../config');
const Mysql = require('../wrappers/mysql');
const connection = new Mysql(mysql.host, mysql.username, mysql.password, mysql.port, mysql.database);
const Register = require('../register');

module.exports = {
  type: 'post',
  route: '/signup',
  run: function(request, response) {
    if (request.session.loggedin) {
      response.send('Already logged in');
      return response.end();
    }
  
    if (!request.body.username || !request.body.password || !request.body.email) {
      response.send('You didnt fill out all the forms');
      return response.end();
    }
  
    if (connection.has('login', 'userid', request.body.username)) {
      response.send(`Account with name ${request.body.username} already exists`);
      return response.end();
    }

    request.session.loggedin = true;
    request.session.username = request.body.username;
    
    Register.run('login', request.body.username, request.body.password, request.body.gender, request.body.email);
    response.redirect('/')
    response.end();
  }
};