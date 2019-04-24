const { mysql, hashpassword } = require('./config');
const db = new (require('./wrappers/mysql'))(mysql.host, mysql.username, mysql.password, mysql.port, mysql.database);
const MD5 = require('./wrappers/hasher');

module.exports = {
  run: function(login_table, userid, user_pass) {
    if (!userid || typeof userid !== 'string')
      return 'invalid user id';

    if (!db.has(login_table, 'userid', userid))
      return `user account with name ${userid} does not exist`;

    let account = db.get(login_table, 'userid', userid)[0];
    
    if (hashpassword) {
      if (!user_pass || MD5.hash(user_pass) !== account.user_pass)
        return 'incorrect password.';
    } else {
      if (!user_pass || user_pass !== account.user_pass)
        return 'incorrect password.';
    }

    return `Successfully logged in as ${userid}`;
  }
};