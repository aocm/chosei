const db = require('../models/index.js');
const candidateDateStatus = db.candidate_date_status;

module.exports = {
  create(req, res) {
    candidateDateStatus.create({
      name: req.body.name,
    }).then(candidateDateStatus => {
      res.send(candidateDateStatus);
    });
  },
  findAll(req, res) {
    candidateDateStatus.findAll().then(data => {
      res.send(data);
    });
  },
  findOne(req, res) {
    candidateDateStatus.findOne({
      where: {
        id: req.params.id
      }
    })
      .then(data => {
        res.send(data);
      })
  },
  update(req, res) {
    candidateDateStatus.update(
      {
        name: req.body.name,
      }, {
      where: { id: req.params.id }
    }
    ).then(() => {
      res.status(200).send("Successfully updated a candidateDateStatus ID: " + req.params.id);
    });
  },
  delete(req, res) {
    candidateDateStatus.destroy({
      where: { id: req.params.id }
    }).then(() => {
      res.status(200).send("Successfully deleted a candidateDateStatus ID: " + req.params.id);
    });
  }
}