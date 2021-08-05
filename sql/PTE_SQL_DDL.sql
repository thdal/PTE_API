INSERT INTO profile (id, profile_name) VALUES (1,'Organisateur');
INSERT INTO profile (id, profile_name) VALUES (2,'Participant');
INSERT INTO profile (id, profile_name) VALUES (3, 'Administrateur');

Insert into genre (id, genre_name) VALUES (1, 'F');
Insert into genre (id, genre_name) VALUES (2, 'H');

INSERT INTO users (firstName, lastName, email, password, genre_id) VALUES ('orgaName', 'orgaName', 'test@epsi.fr', 'tortue',1);
INSERT INTO users (firstName, lastName, email, password, genre_id) VALUES ('orgaName', 'orgaName', 'test2@epsi.fr', 'tortue',2);
INSERT INTO users (firstName, lastName, email, password, genre_id) VALUES ('orgaName', 'orgaName', 'test3@epsi.fr', 'tortue',2);

INSERT INTO user_profile (profile_id, user_id) VALUES(
 (select id from profile where profile_name = 'Organisateur') ,
 (select id from users where email = 'test@epsi.fr')
 );
  INSERT INTO user_profile (profile_id, user_id) VALUES(
   (select id from profile where profile_name = 'Participant') ,
   (select id from users where email = 'test2@epsi.fr')
   );
 INSERT INTO user_profile (profile_id, user_id) VALUES(
  (select id from profile where profile_name = 'Administrateur') ,
  (select id from users where email = 'test3@epsi.fr')
  );

INSERT INTO type_evenement (id,typeEventName) VALUES (1,'Culturel');
INSERT INTO type_evenement (id,typeEventName) VALUES (2,'Artistique');
INSERT INTO type_evenement (id,typeEventName) VALUES (3,'Sportif');
INSERT INTO type_evenement (id,typeEventName) VALUES (4,'Pédagogique');
INSERT INTO type_evenement (id,typeEventName) VALUES (5,'Geek');


INSERT INTO canal_evenement (id,canalEventName) VALUES (1,'Youtube');
INSERT INTO canal_evenement (id,canalEventName) VALUES (2,'Facebook');
INSERT INTO canal_evenement (id,canalEventName) VALUES (3,'Twitch');
INSERT INTO canal_evenement (id,canalEventName) VALUES (4,'Instagram');
INSERT INTO canal_evenement (id,canalEventName) VALUES (5,'Zoom');
INSERT INTO canal_evenement (id,canalEventName) VALUES (6,'Snapchat');


insert into evenements (eventName, eventdate, eventLink,  eventAddress, eventDescription,
 typeEventId, canalEventId, userId)
Values ('superEvent', NOW(), 'www.super.com', 'superAddress',
 'superDescription', 1, 1, (select id from users where email = 'test@epsi.fr'));