const serverless = require('serverless-http');
const express = require('express');
const app = express();
const okjson = require('./temporary/ok.json');
const badjson = require('./temporary/bad.json');

const KEY = process.env.PJ_KEY || 'dummy';
const DUMMY_TOKEN = okjson.data.token;

app.use(express.json())
app.use(express.urlencoded({ extended: true }));
app.use(function(req, res, next) {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', '*');
  next();
});

app.get('/', (req, res) => {
  res.send('Hello');
});

/**
 * auth-temp-api
 */
app.post('/auth-api/authentication', (req, res) => {
  console.log(req.body);
  console.log(KEY);
  if(req.body.KEY === KEY){
    res.json(okjson);
  }else{
    res.json(badjson);
  }
});

/**
 * token-check-api
 */
app.post('/auth-api/check-token', (req, res) => {
  if(req.body.token === DUMMY_TOKEN){
    res.json(okjson);
  }else{
    res.json(badjson);
  }
});

const port = '3001';
app.listen(port, () => {
  console.log(`app start listening on port ${port}`);
});

module.exports.handler = serverless(app); 