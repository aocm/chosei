module.exports = function (app) {

  const userController = require('../controllers/user.controller');
  const candidateDateController = require('../controllers/candidateDate.controller');
  const basePath = '/mng'
  const userAPI = `${basePath}/user`
  const dateAPI = `${basePath}/date`

  // userAPI
  app.get(userAPI, userController.getUserList);
  
  // dateAPI
  app.get(dateAPI + '/month/:month', candidateDateController.getCandidateDate);
  app.get(dateAPI + '/user', candidateDateController.getUserSetDate);
  app.patch(dateAPI + '/:id', candidateDateController.setCandidateDate);
  
};