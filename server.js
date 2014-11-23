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

app.get('/auth', function (req, res) {
  db.collection.findOne({username: req.param('username')}, function(err, user) {
    bcrypt.compare(req.param('password'), user.password, function(err, res) {
      if (err) {
        res.status(403).end();
      } else {
        res.status(200).end();
      }
    });
  }); 
});

var server = app.listen(80, function () {
  MongoClient.connect('mongodb://172.31.20.72:27017/authentication', function(err, _db) {
    console.log("Connected correctly to server");
    db = _db;
  });
});