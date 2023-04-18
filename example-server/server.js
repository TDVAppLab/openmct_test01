/**
 * Basic implementation of a history server.
 */

var StaticServer = require('./static-server');
var app = require('express')();

var staticServer = new StaticServer();
app.use('/', staticServer);

var port = process.env.PORT || 8080

app.listen(port, function () {
    console.log('Open MCT hosted at http://localhost:' + port);
    console.log('History hosted at http://localhost:' + port + '/history');
});
