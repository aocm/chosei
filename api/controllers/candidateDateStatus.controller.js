const { Op } = require("sequelize");
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
  async update(req, res) {

    db.logger.debug("okStatusIds" + req.body.okStatusIds);
    db.logger.debug("sosoStatusIds" + req.body.sosoStatusIds);
    db.logger.debug("badStatusIds" + req.body.badStatusIds);

    const isEmptyArray = (array) => array.length === 0;

    try {
        // ステータスを〇に
        const okPromise = isEmptyArray(req.body.okStatusIds) ? '' : candidateDateStatus.update(
          {
            status: 2,
            updated_at: new Date(),
          }, {
            where: {
              user_id: req.params.id,
              id: {
                [Op.or]: req.body.okStatusIds
              }
            }
          }
        ).then(db.logger.info("Successfully update OKstatus")).then(() => "Successfully update OKstatus");
        
        // ステータスを△に
        const sosoPromise = isEmptyArray(req.body.sosoStatusIds) ? '' : candidateDateStatus.update(
          {
            status: 1,
            updated_at: new Date(),
          }, {
            where: {
              user_id: req.params.id,
              id: {
                [Op.or]: req.body.sosoStatusIds
              }
            }
          }
        ).then(db.logger.info("Successfully update SOSOstatus")).then(() => "Successfully update SOSOstatus");
        
        // ステータスを×に
        const badPromise = isEmptyArray(req.body.badStatusIds) ? '' : candidateDateStatus.update(
          {
            status: 0,
            updated_at: new Date(),
          }, {
            where: {
              user_id: req.params.id,
              id: {
                [Op.or]: req.body.badStatusIds
              }
            }
          }
        ).then(db.logger.info("Successfully update BADstatus")).then(() => "Successfully update BADstatus");

        db.logger.info(await okPromise);
        db.logger.info(await sosoPromise);
        db.logger.info(await badPromise);

        res.status(200).send("Successfully updated a candidateDateStatus UserID: " + req.params.id);
    } catch (error) {
      db.logger.error(error);
      res.status(400).send("Failed update");
    }
  },
  delete(req, res) {
    candidateDateStatus.destroy({
      where: { id: req.params.id }
    }).then(() => {
      res.status(200).send("Successfully deleted a candidateDateStatus ID: " + req.params.id);
    });
  }
}