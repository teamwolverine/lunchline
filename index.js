// File that launches server from root directory
var app = require('./server/server.js');
var port = process.env.PORT || 8080;

app.listen(port);

console.log('Listening on port : ', port);
