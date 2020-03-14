const db = require('../models/index.js');
const candidateDate = db.candidate_date;
const candidateDateStatus = db.candidate_date_status;

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
  findCandidateDate(req, res) {
    db.sequelize.query(
      'SELECT '
      +   'T1.candidate_date, '
      +   'sum(T1.status_count) AS candidate_date_count '
      + 'FROM '
      +   '( '
      +     'SELECT '
      +       '`candidate_date`.`candidate_date`, '
      +       '`candidate_date_statuses`.`candidate_date_id` AS`candidate_date_id`, '
      +       '`candidate_date_statuses`.`status` AS`status`, '
      +       'COUNT(`candidate_date_statuses`.`status`) AS`status_count` '
      +   'FROM '
      +       '`candidate_date` AS`candidate_date` '
      +       'LEFT JOIN '
      +       'candidate_date_status AS`candidate_date_statuses` '
      +       'ON`candidate_date`.`id` = `candidate_date_statuses`.`candidate_date_id` '
      +   'WHERE '
      +     '`candidate_date`.`candidate_month` = :month '
      +   'AND '
      +       '`candidate_date_statuses`.`status` != 0 '
      +   'GROUP BY '
      +     '`candidate_date_statuses`.`status`, '
      +     '`candidate_date`.`id` '
      +   ') AS T1 '
      + 'GROUP BY '
      +   'T1.candidate_date_id '
      + 'ORDER BY '
      +   'candidate_date_count DESC, '
      +   'T1.candidate_date ASC '
      + 'LIMIT 3;',
      { raw: false, replacements: { month: req.params.month } }
    )
      .then(data => {
        res.send(data[0]);
      })
  },
  async findUserSetData(req, res) {
    db.logger.info('start findUserSetDataAPI');
    // 今月の日程調整データがあるかfind
    await candidateDate.findOne({
      where: {
        candidate_month: req.query.month,
      },
      raw: true,
      include: [
        {
          model: db.candidate_date_status,
          required: true,  // INNER JOIN
          where: {
            user_id: req.query.user
          },
        },
      ]
    }).then(async findData => {
      if (!findData) {
        // 日程調整していなかった場合、新規データを入れる
        await candidateDate.findAll({
          attributes: [
            'id'
          ],
          where: {
            candidate_month: req.query.month,
          },
          raw: true,
        })
          .then(async dateIds => {
            db.logger.debug(dateIds);
            await Promise.all(dateIds.map(async idObject => {
              await candidateDateStatus.create({
                user_id: req.query.user,
                candidate_date_id: idObject.id,
                status: 1,
                created_at: new Date(),
                updated_at: new Date(),
              })
            }))
            db.logger.debug('insert date');
          })
      } else {
        db.logger.debug('update date');
      }
    })

    // 日程調整用データを返却
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
            'id',
            'status'
          ],
          where: {
            user_id: req.query.user
          },
        },
      ],
      order: [
        ['id', 'asc'],
      ]
    })
      .then(data => {
        db.logger.info('finish findUserSetDataAPI');
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