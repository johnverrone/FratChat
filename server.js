var express = require('express');
var app = express();
var path = require('path');
var http = require('http').Server(app);
var io = require('socket.io')(http);
var socket = require('./socket.js');

var port = process.env.port || 8080;

app.use(express.static(path.join(__dirname, './dist')));

io.on('connection', socket);

http.listen(port, function() {
  console.log('React Test app listenening at localhost:%s', port);
});
