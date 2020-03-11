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
    candidateDate.findAll({
      attributes: [
        'id',
      ],
      where: {
        candidate_month: req.query.month,
      },
      raw: true,
      include: [
        {
          model: db.candidate_date_status,
          attributes: [
            'id',
            'candidate_date_id',
            [db.sequelize.fn('COUNT', db.sequelize.col('status')), 'status_id_count']
          ],
          group: ['candidate_date_id','status'],
        },
      ]
    })
      .then(data => {
        res.send(data);
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