var express = require('express');
var Promise = require('bluebird');
var bcrypt = require("bcryptjs");
var redis = require("redis"),
        client = redis.createClient(6379, '172.31.18.118', {})

var app = express();
var db;

app.get('/ping', function (req, res) {
  res.send('pong')
});

app.get('/loaderio-ec93d5d4a283b4c13d2a854bbc7b2806', function (req, res) {
  res.send('loaderio-ec93d5d4a283b4c13d2a854bbc7b2806')
});

app.get('/auth', function (req, res) {
  client.unref()
  client.hget(req.param("username"), "hashedPassword", function (err, value){
    if(err) {
      res.sendStatus(500);
    } else if (value == null) {
      res.sendStatus(204);
    }
    bcrypt.compare(req.param('password'), value, function(err, result) {
      if (err || !result) {
        res.sendStatus(204);
      } else {
        res.sendStatus(200);
      }
    });
  });
});

var server = app.listen(80, function () {
});