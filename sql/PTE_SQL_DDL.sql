INSERT INTO profile (profile_name) VALUES ('Organisateur');
INSERT INTO profile (profile_name) VALUES ('Visiteur');

Insert into genre (id, genre_name) VALUES (1, 'F');
Insert into genre (id, genre_name) VALUES (2, 'H');

INSERT INTO users (firstName, lastName, email, password, genre_id) VALUES ('orgaName', 'orgaName', 'test@epsi.fr', 'organisateur',1);
INSERT INTO users (firstName, lastName, email, password, genre_id) VALUES ('orgaName', 'orgaName', 'test2@epsi.fr', 'organisateur',2);

INSERT INTO user_profile (profile_id, user_id) VALUES(
 (select id from profile where profile_name = 'Organisateur') ,
 (select id from users where email = 'test@epsi.fr')
 );

INSERT INTO type_evenement (typeEventName) VALUES ('Culturel');
INSERT INTO type_evenement (typeEventName) VALUES ('Artistique');
INSERT INTO type_evenement (typeEventName) VALUES ('Sportif');
INSERT INTO type_evenement (typeEventName) VALUES ('Pédagogique');
INSERT INTO type_evenement (typeEventName) VALUES ('Geek');


INSERT INTO canal_evenement (canalEventName) VALUES ('Youtube');
INSERT INTO canal_evenement (canalEventName) VALUES ('Facebook');
INSERT INTO canal_evenement (canalEventName) VALUES ('Twitch');
INSERT INTO canal_evenement (canalEventName) VALUES ('Instagram');
INSERT INTO canal_evenement (canalEventName) VALUES ('Zoom');
INSERT INTO canal_evenement (canalEventName) VALUES ('Snapchat');


insert into evenements (eventName, eventdate, eventLink,  eventAddress, eventDescription,
 typeEventId, canalEventId, userId)
Values ('superEvent', NOW(), 'www.super.com', 'superAddress',
 'superDescription', 1, 1, (select id from users where email = 'test@epsi.fr'));