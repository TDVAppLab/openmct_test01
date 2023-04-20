/**
 * Basic implementation of a history server.
 */

/*
//sqlite
const sqlite3 = require("sqlite3").verbose();

const db = new sqlite3.Database("./mock.db", sqlite3.OPEN_READWRITE,(error)=>{
    if (error) return console.error(error.message);

//    console.log("connection suessfull");
});

//db.run( "CREATE TABLE isspos(timestamp INTEGER ,altitude REAL)" );
db.run( "DELETE FROM isspos ");
//db.run( "insert into isspos values(1681902382000, 421.96029468591)" );
//db.run( "insert into isspos values(1681904558000, 413.73966823439)" );
//db.run( "insert into isspos values(1681909689000, 415.6573746748)" );


db.close((err) => {
    if(err) return console.error(err.message);
})
//-------------------------------------------------------------------
*/
var Getdatafromexternalapi = require('./getdatafromexternalapi');
var RealtimeServer = require('./realtime-server');
var HistoryServer = require('./history-server');
var StaticServer = require('./static-server');


var expressWs = require('express-ws');
var app = require('express')();
expressWs(app);

var spacecraft = new Getdatafromexternalapi();
//var realtimeServer = new RealtimeServer(spacecraft);
var historyServer = new HistoryServer(spacecraft);
var staticServer = new StaticServer();


//app.use('/realtime', realtimeServer);
app.use('/history', historyServer);
app.use('/', staticServer);

var port = process.env.PORT || 8080

app.listen(port, function () {
    console.log('Open MCT hosted at http://localhost:' + port);
    console.log('History hosted at http://localhost:' + port + '/history');
});






/*



var spacecraft = new Spacecraft();
var realtimeServer = new RealtimeServer(spacecraft);
var historyServer = new HistoryServer(spacecraft);
var staticServer = new StaticServer();

app.use('/realtime', realtimeServer);
app.use('/history', historyServer);
app.use('/', staticServer);

var port = process.env.PORT || 8080

app.listen(port, function () {
    console.log('Open MCT hosted at http://localhost:' + port);
    console.log('History hosted at http://localhost:' + port + '/history');
    console.log('Realtime hosted at ws://localhost:' + port + '/realtime');
});
*/