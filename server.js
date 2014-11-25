var express = require('express');
var Promise = require('bluebird');
var bcrypt = require("bcryptjs");

var pg = require('pg');
var conString = "postgres://auth:password@auth.ck2fdib66dje.eu-west-1.rds.amazonaws.com:5432/authusers";

var app = express();
var db;

app.get('/ping', function (req, res) {
  res.send('pong')
});

app.get('/loaderio-ec93d5d4a283b4c13d2a854bbc7b2806', function (req, res) {
  res.send('loaderio-ec93d5d4a283b4c13d2a854bbc7b2806')
});

app.get('/auth', function (req, res) {
  pg.connect(conString, function(err, client, done) {
    if(err) {
      res.sendStatus(500);
    }
    client.query('SELECT * FROM users WHERE username = $1', [req.param('username')], function(err, result) {
      done();
      if(err) {
        res.sendStatus(500);
      }
      if (result.rows.length > 0) {
        bcrypt.compare(req.param('password'), result.rows[0].hashedPassword, function(err, result) {
          if (err || !result) {
            res.sendStatus(204);
          } else {
            res.sendStatus(200);
          }
        });
      } else {
        res.sendStatus(204);
      }
    });
  });
});

var server = app.listen(80, function () {
});