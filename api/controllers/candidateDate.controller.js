const db = require('../models/index.js');
const candidateDate = db.candidate_date;

module.exports = {
  create(req, res) {
    candidateDate.create({
      name: req.body.name,
    }).then(candidateDate => {
      res.send(candidateDate);
    });
  },
  findAll(req, res) {
    candidateDate.findAll().then(data => {
      res.send(data);
    });
  },
  findOne(req, res) {
    candidateDate.findOne({
      where: {
        id: req.params.id
      }
    })
      .then(data => {
        res.send(data);
      })
  },
  update(req, res) {
    candidateDate.update(
      {
        name: req.body.name,
      }, {
      where: { id: req.params.id }
    }
    ).then(() => {
      res.status(200).send("Successfully updated a candidateDate ID: " + req.params.id);
    });
  },
  delete(req, res) {
    candidateDate.destroy({
      where: { id: req.params.id }
    }).then(() => {
      res.status(200).send("Successfully deleted a candidateDate ID: " + req.params.id);
    });
  }
}