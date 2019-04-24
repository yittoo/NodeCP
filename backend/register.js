const { mysql, hashpassword } = require('./config');
const db = new (require('./wrappers/mysql'))(mysql.host, mysql.username, mysql.password, mysql.port, mysql.database);
const MD5 = require('./wrappers/hasher');

module.exports = {
  run: function(login_table, userid, user_pass, sex, email) {
    if (!userid || typeof userid !== 'string')
      return 'invalid user id';

    if (db.has(login_table, 'userid', userid))
      return `user account with name ${userid} already exists`;

    if (!user_pass || typeof user_pass !== 'string')
      return 'invalid user password';

    if (hashpassword)
      user_pass = MD5.hash(user_pass);

    db.setMultiple(login_table, [
      {
        column: 'userid',
        value: userid
      },
      {
        column: 'user_pass',
        value: user_pass
      },
      {
        column: 'sex',
        value: sex
      },
      {
        column: 'email',
        value: email
      }
    ]);

    return `Registered: ${userid}`;
  }
};