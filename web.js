const express = require('express');
const session = require('express-session');
const app = express();
const walk = require('walk');
const { web, secret } = require('./backend/config');
const bodyParser = require('body-parser');

app.set('view engine', 'ejs');
app.use(express.static(__dirname + '/views/public'));
app.use(session({
	secret,
	resave: true,
	saveUninitialized: true
}));
app.use(bodyParser.urlencoded({ extended : true }));
app.use(bodyParser.json());

walk.walk('./backend/routes')
.on('files', (root, files, next) => {
  for (var file of files) {
    let fileData = require(`${root}/${file.name}`);

    if (!fileData.route)
      throw new Error(`File: ${file.name} has no route for the web server, please add one.`);

    app[fileData.type](fileData.route, function(request, response) {
      fileData.run(request, response);
    });
  }
});

app.listen(web.port, function() {
  console.log(`Website online. Listenting to port ${web.port}`);
});