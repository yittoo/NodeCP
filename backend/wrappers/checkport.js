const NetLinkWrapper = require('netlinkwrapper');
const server = new NetLinkWrapper();

module.exports = {
  check: function(port, host) {
    let result = null;

    try {
      server.connect(port, host);
      server.disconnect();
      result = true;
    } catch(err) {
      result = false;
    };

    return result;
  }
};