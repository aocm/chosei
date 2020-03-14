const appRoot = require('app-root-path');
const getUserListService = require(appRoot + '/service/user/getUserList');
const logger = require(appRoot + '/config/logger.js');

module.exports = {
  async getUserList(req, res) {
    logger.info('Start getUserListAPI');
    try {
      const response = await getUserListService.getUserList();
      res.status(200).send(response);
    } catch(error) {
      throw (error);
    } finally {
      logger.info('End getUserListAPI');
    }
  },
}