const logger = require('log4js').getLogger();

module.exports = {

  // エラーログ出力
  logErrors(err, req, res, next) {
    logger.error(err.stack);
    next(err);
  },

  // REST API用のレスポンス返却
  clientErrorHandler(err, req, res, next) {
    res.status(500).json({
      message: err.message,
      error: err
    });
  },

  // 画面用のレスポンス返却
  errorHandler(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
      message: err.message,
      error: err
    });
  }
}