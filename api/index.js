// express定義
const express = require('express');
const app = express();

// 環境変数定義
var config = require('./config.json')[app.get('env')];

// ORM定義
const Sequelize = require('sequelize');
const sequelize = new Sequelize('chousei', 'chousei', 'chousei', {
  dialect: 'mysql',
  host: config.server
});

const TestTable = sequelize.define('user', {
  id: {
    type: Sequelize.INTEGER,
    primaryKey: true
  },
  name: {
    type: Sequelize.STRING
  }
}, {
  freezeTableName: true,
  timestamps: false
});

app.use(function(req, res, next) {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', '*');
  next();
});

'use strict';

app.get('/', function (req, res) {
  TestTable.findAll().then(results => {
    res.send(results);
  });
});

app.listen(3000, function () {
  console.log('Example app listening on port 3000!');
});
