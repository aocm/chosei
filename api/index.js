const express = require('express');
const bodyParser = require('body-parser');
const http = require('http');
const models = require('./models/index.js');
const errorHandler = require('./config/errorHandler.js');
const app = express();
const port = 3000;
const logger = require('log4js').getLogger();

app.set('port', port);
app.use(bodyParser.json());

models.sequelize.sync().then(() => {
  logger.info('Start chousei-api');
}).catch((err) => {
  logger.error('Something went wrong with the operation: ' + err);
});

require('./routes/default.route')(app);

// エラーログ出力 
app.use(errorHandler.logErrors);

// REST API用のエラーハンドラ(ここでは、/apiがAPIの想定)
app.use('/mng', errorHandler.clientErrorHandler);

// エラーベージ表示用エラーハンドラ
app.use(errorHandler.errorHandler);

app.use(function (req, res, next) {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', '*');
  next();
});

const server = http.createServer(app);
server.listen(port);
module.exports = app;

