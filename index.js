// const app = require('express')();
const express = require('express');
const cors = require('cors');
const PORT = 8888;
const app = express();
app.use(cors());

var sql = require("mysql");
const fs = require('fs');
const rl = require('readline');
const dns = require('dns');



//Setting up server
var server = app.listen(PORT || 8080, function () {
    var port = server.address().port;
    console.log("App now running on port", port);
});



app.get('/dnserrors', function (req, res) {
    var mysql = require('mysql');
    var connection = mysql.createConnection({
        host: 'localhost',
        user: 'root',
        password: '',
        database: 'files'
    });


    connection.connect(function (err) {
        console.log(err.code);
        console.log(err.fatal);
    });


    connection.query('select * from files_link where dns_error is not null', function (error, results, fields) {
        //  connection.query('select * from files_link', function (error, results, fields) {
        connection.end();
     //   if (error) {
     //       throw error;
      //  }

        res.send(results);
    });


});
app.get('/file', function (req, res) {
    var mysql = require('mysql');
    var connection = mysql.createConnection({
        host: 'localhost',
        user: 'root',
        password: '',
        database: 'files'
    });


    connection.connect(function (err) {
        console.log(err.code);
        console.log(err.fatal);
    });


    connection.query('INSERT INTO files_link (host,dns_error) VALUES ("test12345","noerror1243")', function (error, results, fields) {
        //  connection.query('select * from files_link', function (error, results, fields) {
        connection.end();
        if (error) throw error;

        res.send(results);
    });
});
/*
app.get('/test', function (req, res) {
    var lineReader = rl.createInterface({
        input: fs.createReadStream('list.txt')
    });
    lineReader.on('line', function (line) {
        var errMsg = null;
        dns.resolve4(line, function (err, d) {
            if (err) {
                errMsg = err.code;
            }
            //var query = "INSERT INTO files_link (host,dns_error) VALUES (" + line + "," + errMsg + ")";
            var query = "select * from files_link";
            //    connection.query('select * from files_link', function (error, results, fields) {
            executeQuery(res, query);
        });

    });
});

//POST API
/* app.post("/api/user", function(req , res){
                var query = "INSERT INTO [user] (Name,Email,Password) VALUES (req.body.Name,req.body.Email,req.body.Password”);
                executeQuery (res, query);
});
*/
