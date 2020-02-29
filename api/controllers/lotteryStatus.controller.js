const db = require('../models/index.js');
const lotteryStatus = db.lottery_status;

module.exports = {
  create(req, res) {
    lotteryStatus.create({
      name: req.body.name,
    }).then(lotteryStatus => {
      res.send(lotteryStatus);
    });
  },
  findAll(req, res) {
    lotteryStatus.findAll().then(data => {
      res.send(data);
    });
  },
  findOne(req, res) {
    lotteryStatus.findOne({
      where: {
        id: req.params.id
      }
    })
      .then(data => {
        res.send(data);
      })
  },
  update(req, res) {
    lotteryStatus.update(
      {
        name: req.body.name,
      }, {
      where: { id: req.params.id }
    }
    ).then(() => {
      res.status(200).send("Successfully updated a lotteryStatus ID: " + req.params.id);
    });
  },
  delete(req, res) {
    lotteryStatus.destroy({
      where: { id: req.params.id }
    }).then(() => {
      res.status(200).send("Successfully deleted a lotteryStatus ID: " + req.params.id);
    });
  }
}