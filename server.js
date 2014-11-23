var express = require('express');
var Promise = require('bluebird');
var mongodb = require("mongodb");
var bcrypt = require("bcryptjs");
var MongoClient = require('mongodb').MongoClient

var app = express();
var db;

app.get('/ping', function (req, res) {
  res.send('pong')
});

app.get('/loaderio-ec93d5d4a283b4c13d2a854bbc7b2806', function (req, res) {
  res.send('loaderio-ec93d5d4a283b4c13d2a854bbc7b2806')
});

app.get('/auth', function (req, res) {
  db.collection('users').findOne({username: req.param('username')}, function(err, user) {
    if (err) {
      res.sendStatus(500);
    } else if (user == null) {
      res.sendStatus(204);
    } else {
      bcrypt.compare(req.param('password'), user.password, function(err, result) {
        if (err || !result) {
          res.sendStatus(204);
        } else {
          res.sendStatus(200);
        }
      });  
    }
  }); 
});

var server = app.listen(80, function () {
  MongoClient.connect('mongodb://172.31.20.72:27017/authentication', function(err, _db) {
    console.log("Connected correctly to server");
    db = _db;
  });
});