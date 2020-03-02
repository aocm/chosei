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
  findUserSetData(req, res) {
    // 今月の候補日を取得
    // select candidate_month,candidate_date,status,user_id,name from candidate_date 
    // INNER JOIN candidate_date_status on candidate_date.id = candidate_date_status.candidate_date_id
    // INNER JOIN user on candidate_date_status.user_id = user.id
    // where`candidate_date`.`candidate_month` = ':month' AND`candidate_date_status`.`user_id` = ':user_id';
    candidateDate.findAll({
      attributes: [
        'candidate_date'
      ],
      where: {
        candidate_month: req.query.month,
      },
      raw: true,
      include: [
        {
          model: db.candidate_date_status,
          required: true,  // INNER JOIN
          attributes: [
            'status'
          ],
          where: {
            user_id: req.query.user
          },
        },
      ]
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