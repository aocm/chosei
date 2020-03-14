const appRoot = require('app-root-path');
const db = require(appRoot + '/models/index.js');
const user = db.user;

module.exports = {
  getUserList() {
    return user.findAll()
  },
}