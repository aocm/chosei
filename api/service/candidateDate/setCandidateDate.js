const appRoot = require('app-root-path');
const { Op } = require("sequelize");
const db = require(appRoot + '/models/index.js');
const candidateDateStatus = db.candidate_date_status;
const logger = require(appRoot + '/config/logger.js');

module.exports = {
  async setCandidateDate(okStatusIds, sosoStatusIds, badStatusIds, userId) {

    logger.debug("okStatusIds" + okStatusIds);
    logger.debug("sosoStatusIds" + sosoStatusIds);
    logger.debug("badStatusIds" + badStatusIds);

    const isEmptyArray = (array) => array.length === 0;

    try {
      // ステータスを〇に
      const okPromise = isEmptyArray(okStatusIds) ? '' : candidateDateStatus.update(
        {
          status: 2,
          updated_at: new Date(),
        }, {
        where: {
          user_id: userId,
          id: {
            [Op.or]: okStatusIds
          }
        }
      }
      ).then(() => "Successfully update OKstatus");

      // ステータスを△に
      const sosoPromise = isEmptyArray(sosoStatusIds) ? '' : candidateDateStatus.update(
        {
          status: 1,
          updated_at: new Date(),
        }, {
        where: {
          user_id: userId,
          id: {
            [Op.or]: sosoStatusIds
          }
        }
      }
      ).then(() => "Successfully update SOSOstatus");

      // ステータスを×に
      const badPromise = isEmptyArray(badStatusIds) ? '' : candidateDateStatus.update(
        {
          status: 0,
          updated_at: new Date(),
        }, {
        where: {
          user_id: userId,
          id: {
            [Op.or]: badStatusIds
          }
        }
      }
      ).then(() => "Successfully update BADstatus");

      logger.info(await okPromise);
      logger.info(await sosoPromise);
      logger.info(await badPromise);
    } catch (error) {
      throw (error);
    }
  },
}