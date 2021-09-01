SET FOREIGN_KEY_CHECKS = 0;
DROP TABLE IF EXISTS users;
DROP TABLE IF EXISTS user_profile;
DROP TABLE IF EXISTS profile;
DROP TABLE IF EXISTS evenements;
DROP TABLE IF EXISTS canal_evenement;
DROP TABLE IF EXISTS type_evenement;
DROP TABLE IF EXISTS genre;

SET FOREIGN_KEY_CHECKS = 1;

CREATE TABLE IF NOT EXISTS `genre` (
  id int NOT NULL PRIMARY KEY NOT NULL,
  genre_name varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=UTF8MB4;

CREATE TABLE IF NOT EXISTS `users` (
  id int NOT NULL PRIMARY KEY AUTO_INCREMENT,
  firstName varchar(255) NOT NULL,
  lastName varchar(255) NOT NULL,
  email varchar(255) NOT NULL,
  password varchar(255) NOT NULL,
  userImg boolean NOT NULL DEFAULT false,
  isBanned boolean NOT NULL DEFAULT false,
  genre_id int NOT NULL,
  FOREIGN KEY (genre_id) REFERENCES genre(id)
) ENGINE=InnoDB DEFAULT CHARSET=UTF8MB4;

CREATE TABLE IF NOT EXISTS `profile` (
  id int NOT NULL PRIMARY KEY AUTO_INCREMENT,
  profile_name varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=UTF8MB4;

CREATE TABLE IF NOT EXISTS `user_profile` (
  profile_id int NOT NULL,
  user_id int NOT NULL,
  FOREIGN KEY (user_id) REFERENCES users(id),
  FOREIGN KEY (profile_id) REFERENCES profile(id)
) ENGINE=InnoDB DEFAULT CHARSET=UTF8MB4;

CREATE TABLE IF NOT EXISTS `type_evenement` (
  id int NOT NULL PRIMARY KEY AUTO_INCREMENT,
  typeEventName varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=UTF8MB4;

CREATE TABLE IF NOT EXISTS `canal_evenement` (
  id int NOT NULL PRIMARY KEY AUTO_INCREMENT,
  canalEventName varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=UTF8MB4;

CREATE TABLE IF NOT EXISTS `evenements` (
  id int NOT NULL PRIMARY KEY AUTO_INCREMENT,
  eventName varchar(255) NOT NULL,
  eventDate DATE,
  eventHour TIME,
  eventLink varchar(255) NOT NULL,
  eventAddress varchar(255) NOT NULL,
  eventDescription varchar(255),
  eventImg boolean NOT NULL DEFAULT false,
  typeEventId int NOT NULL,
  canalEventId int NOT NULL,
  userId int NOT NULL,
  FOREIGN KEY (userId) REFERENCES users(id),
  FOREIGN KEY (typeEventId) REFERENCES type_evenement(id),
  FOREIGN KEY (canalEventId) REFERENCES canal_evenement(id)
) ENGINE=InnoDB DEFAULT CHARSET=UTF8MB4;

