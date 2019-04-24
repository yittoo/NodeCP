const crypto = require('crypto');

module.exports = {
  hash(text) {
    return crypto.createHash('md5').update(text).digest('hex')
  }
};