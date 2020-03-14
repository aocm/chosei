const appRoot = require('app-root-path');
const db = require(appRoot + '/models/index.js');
const logger = require(appRoot + '/config/logger.js');

module.exports = {
  getCandidateDate(month) {
    return db.sequelize.query(
      'SELECT '
      + 'T1.candidate_date, '
      + 'sum(T1.status_count) AS candidate_date_count '
      + 'FROM '
      + '( '
      + 'SELECT '
      + '`candidate_date`.`candidate_date`, '
      + '`candidate_date_statuses`.`candidate_date_id` AS`candidate_date_id`, '
      + '`candidate_date_statuses`.`status` AS`status`, '
      + 'COUNT(`candidate_date_statuses`.`status`) AS`status_count` '
      + 'FROM '
      + '`candidate_date` AS`candidate_date` '
      + 'LEFT JOIN '
      + 'candidate_date_status AS`candidate_date_statuses` '
      + 'ON`candidate_date`.`id` = `candidate_date_statuses`.`candidate_date_id` '
      + 'WHERE '
      + '`candidate_date`.`candidate_month` = :month '
      + 'AND '
      + '`candidate_date_statuses`.`status` != 0 '
      + 'GROUP BY '
      + '`candidate_date_statuses`.`status`, '
      + '`candidate_date`.`id` '
      + ') AS T1 '
      + 'GROUP BY '
      + 'T1.candidate_date_id '
      + 'ORDER BY '
      + 'candidate_date_count DESC, '
      + 'T1.candidate_date ASC '
      + 'LIMIT 3;',
      { raw: false, replacements: { month } }
    )
  },
}