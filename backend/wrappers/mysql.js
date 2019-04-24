const Mysql = require('sync-mysql');

module.exports = class NodeCPSql {
  constructor(host, username, password, port, database) {
    this.db = new Mysql({
      host,
      user: username,
      password,
      port: port || 3306,
      database
    });

    this.host = host;
    this.user = username;
    this.password = password;
    this.port = port;
    this.database = database;

    this._checkDatabase();
  }

  _checkDatabase() {
    try {
      this.db.query(`use ${this.database}`);
    } catch(err) {
      throw new Error(err.Error || err)
    }
  }

  /**
   * Checks if the database has the key in it
   * @param {String} table The mysql table on where to check
   * @param {String} column The column of where the key is located
   * @param {String} key The key to check
   * @returns {Boolean}
   */

  has(table, column, key) {
    if (typeof table !== 'string' || typeof column !== 'string' || typeof key !== 'string')
      throw new Error('Invalid types given!');

    let query = this.db.query(`SELECT * FROM ${this.database}.${table} WHERE ${column} = "${key}"`);

    if (query.length === 0)
      return false;
    else return true;
  }

  /**
   * Pushes a key to the database
   * @param {String} table The table, where the column is located
   * @param {String} key The column name
   * @param {Any} value The value of the column
   */

  set(table, key, value) {
    if (typeof table !== 'string' || typeof key !== 'string')
      throw new Error('Invalid types given!');

    if (typeof value === 'string') {
      this.db.query(`INSERT into ${this.database}.${table} (${key}) VALUES ("${value}")`);
    } else if (typeof value === 'number') {
      this.ds.query(`INSERT into ${this.database}.${table} (${key}) VALUES (${value})`);
    } else {
      value = JSON.stringify(value);

      this.ds.query(`INSERT into ${this.database}.${table} (${key}) VALUES ("${value}")`);
    }

    return;
  }

  setMultiple(table, values) {
    let columns = '';
    let _values = '';

    for (var i = 0; i < values.length; i++) {
      if (!values[i].column) throw new Error('invalid column!');
      
      if (i === 0) {
        columns += `(${values[i].column}, `;
      } else if (i === values.length - 1) {
        columns += `${values[i].column})`;
      } else {
        columns += `${values[i].column}, `;
      }
    };

    for (var i = 0; i < values.length; i++) {
      if (!values[i].value) values[i].value = "null";

      if (typeof values[i].value === 'string') {
        values[i].value = `"${values[i].value}"`;
      } else if (typeof values[i].value === 'object') {
        values[i].value = `"${JSON.stringify(values[i].value)}"`;
      }

      if (i === 0) {
        _values += `(${values[i].value}, `;
      } else if (i === values.length - 1) {
        _values += `${values[i].value})`;
      } else {
        _values += `${values[i].value}, `;
      }
    };

    this.db.query(`INSERT into ${this.database}.${table} ${columns} VALUES ${_values}`);

    return undefined;
  }

  delete(table, column, key) {
    if (typeof table !== 'string' || typeof column !== 'string' || typeof key !== 'string')
      throw new Error('Invalid types given!');

    let result = this.db.query(`DELETE FROM ${this.database}.${table} WHERE ${column} = "${key}"`);

    if (result.affectedRows >= 1)
      return true;
    else return false;
  }

  get(table, column, key) {
    if (typeof table !== 'string' || typeof column !== 'string' || typeof key !== 'string')
      throw new Error('Invalid types given!');
    
    return this.db.query(`SELECT * FROM ${this.database}.${table} WHERE ${column} = "${key}"`);
  }

  /**
   * Returns all the columns of a table
   * @param {String} table The table name
   * @returns {Array<Object<DatabaseData>>}
   */

  all(table) {
    if (typeof table !== 'string')
      throw new Error('invalid types given!');

    return this.db.query(`SELECT * FROM ${this.database}.${table}`);
  }
};