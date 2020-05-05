const appRoot = require('app-root-path');
const db = require(appRoot + '/models/index.js');
const user = db.chousei_user;

module.exports = {
  getUserList() {
    return user.findAll()
  },
}