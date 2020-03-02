module.exports = function (app) {

  const userController = require('../controllers/user.controller');
  const candidateDateController = require('../controllers/candidateDate.controller');
  const candidateDateStatusController = require('../controllers/candidateDateStatus.controller');
  const lotteryStatus = require('../controllers/lotteryStatus.controller');
  const basePath = '/mng'
  const userAPI = `${basePath}/user`
  const dateAPI = `${basePath}/date`
  const dateStatusAPI = `${basePath}/dateStatus`
  const lotteryStatusAPI = `${basePath}/lotteryStatus`

  // userAPI
  app.post(userAPI, userController.create);
  app.get(userAPI, userController.findAll);
  app.get(userAPI + '/:id', userController.findOne);
  app.patch(userAPI + '/:id', userController.update);
  app.delete(userAPI + '/:id', userController.delete);
  
  // dateAPI
  app.post(dateAPI, candidateDateController.create);
  app.get(dateAPI, candidateDateController.findAll);
  app.get(dateAPI + '/:id', candidateDateController.findOne);
  app.get(dateAPI + '/user', candidateDateController.findUserSetData);
  app.patch(dateAPI + '/:id', candidateDateController.update);
  app.delete(dateAPI + '/:id', candidateDateController.delete);
  
  // dateStatusAPI
  app.post(dateStatusAPI, candidateDateStatusController.create);
  app.get(dateStatusAPI, candidateDateStatusController.findAll);
  app.get(dateStatusAPI + '/:id', candidateDateStatusController.findOne);
  app.patch(dateStatusAPI + '/:id', candidateDateStatusController.update);
  app.delete(dateStatusAPI + '/:id', candidateDateStatusController.delete);
  
  // lotteryStatusAPI
  app.post(lotteryStatusAPI, lotteryStatus.create);
  app.get(lotteryStatusAPI, lotteryStatus.findAll);
  app.get(lotteryStatusAPI + '/:id', lotteryStatus.findOne);
  app.patch(lotteryStatusAPI + '/:id', lotteryStatus.update);
  app.delete(lotteryStatusAPI + '/:id', lotteryStatus.delete);


};