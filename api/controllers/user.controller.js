const db = require('../models/index.js');
const user = db.user;

module.exports = {
  create(req, res) {
    user.create({
      name: req.body.name,
    }).then(user => {
      res.send(user);
    });
  },
  findAll(req, res) {
    user.findAll().then(data => {
      res.send(data);
    });
  },
  findOne(req, res) {
    user.findOne({
      where: {
        id: req.params.id
      }
    })
      .then(data => {
        res.send(data);
      })
  },
  update(req, res) {
    user.update(
      {
        name: req.body.name,
      }, {
      where: { id: req.params.id }
    }
    ).then(() => {
      res.status(200).send("Successfully updated a user ID: " + req.params.id);
    });
  },
  delete(req, res) {
    user.destroy({
      where: { id: req.params.id }
    }).then(() => {
      res.status(200).send("Successfully deleted a user ID: " + req.params.id);
    });
  }
}