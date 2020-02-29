module.exports = function (app) {

  const userController = require('../controllers/user.controller');
  const userAPI = '/api/user'

  // Create a new Employee
  app.post(userAPI, userController.create);

  // Retrieve all Employees
  app.get(userAPI, userController.findAll);

  // Retrieve a Employee by ID
  app.get(userAPI + '/:id', userController.findOne);

  // Update a Employee by ID
  app.patch(userAPI + '/:id', userController.update);

  // Delete a Employee by ID
  app.delete(userAPI + '/:id', userController.delete);
};