---- drop ----
DROP TABLE IF EXISTS `user`;
DROP TABLE IF EXISTS `candidate_date`;
DROP TABLE IF EXISTS `candidate_date_status`;
DROP TABLE IF EXISTS `lottery_status`;

---- create ----
create table IF not exists `user`
(
 `id`               INT(20) AUTO_INCREMENT,
 `name`             VARCHAR(20) NOT NULL,
 `created_at`       Datetime DEFAULT NULL,
 `updated_at`       Datetime DEFAULT NULL,
    PRIMARY KEY (`id`)
) DEFAULT CHARSET=utf8 COLLATE=utf8_bin;
create table IF not exists `candidate_date`
(
 `id`               INT(20) AUTO_INCREMENT,
 `candidate_date`   VARCHAR(20) NOT NULL,
 `created_at`       Datetime DEFAULT NULL,
 `updated_at`       Datetime DEFAULT NULL,
    PRIMARY KEY (`id`)
) DEFAULT CHARSET=utf8 COLLATE=utf8_bin;
create table IF not exists `candidate_date_status`
(
 `id`               INT(20) AUTO_INCREMENT,
 `user_id`          INT(20) NOT NULL,
 `candidate_date_id` INT(20) NOT NULL,
 `status`           INT(20) NOT NULL,
 `created_at`       Datetime DEFAULT NULL,
 `updated_at`       Datetime DEFAULT NULL,
    PRIMARY KEY (`id`)
) DEFAULT CHARSET=utf8 COLLATE=utf8_bin;
create table IF not exists `lottery_status`
(
 `id`               INT(20) AUTO_INCREMENT,
 `candidate_date_id` INT(20) NOT NULL,
 `lottery_status`    VARCHAR(20) NOT NULL,
 `created_at`       Datetime DEFAULT NULL,
 `updated_at`       Datetime DEFAULT NULL,
    PRIMARY KEY (`id`)
) DEFAULT CHARSET=utf8 COLLATE=utf8_bin;