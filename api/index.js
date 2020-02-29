const express = require('express');
const bodyParser = require('body-parser');
const http = require('http');
const models = require('./models/index.js');
const app = express();
const port = 3000;

app.set('port', port);
app.use(bodyParser.json());

models.sequelize.sync().then(() => {
  console.log('Seems like the backend is running fine...');
}).catch((err) => {
  console.log(err, 'Something went wrong with the operation');
});

require('./routes/default.route')(app);

app.use(function (req, res, next) {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', '*');
  next();
});

const server = http.createServer(app);
server.listen(port);
module.exports = app;

