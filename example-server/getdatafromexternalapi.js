/*
 Spacecraft.js simulates a small spacecraft generating telemetry.
*/


function Getdatafromexternalapi() {

    setInterval(function () {
        this.updateState();
    }.bind(this), 10000);
};

Getdatafromexternalapi.prototype.updateState = function () {

    
    var url = 'https://api.wheretheiss.at/v1/satellites/25544';

    var https = require('https');

    var data = [];
 
    https.get(url, function (res) {
        res.on('data', function(chunk) {
        
            data.push(chunk);
        
        }).on('end', function() {
        
            var events   = Buffer.concat(data);
            var r = JSON.parse(events);
         
            console.log(r.timestamp + ':' + r.altitude);

            //sqlite
            const sqlite3 = require("sqlite3").verbose();

            const db = new sqlite3.Database("./mock.db", sqlite3.OPEN_READWRITE,(error)=>{
                if (error) return console.error(error.message);

            //    console.log("connection suessfull");r.altitude
            });

            db.run( `insert into isspos values(${r.timestamp*1000}, ${r.altitude})` );


            db.close((err) => {
                if(err) return console.error(err.message);
            })




        
        });
    });
};

module.exports = function () {
    return new Getdatafromexternalapi()
};




