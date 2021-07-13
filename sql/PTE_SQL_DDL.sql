INSERT INTO profile (profile_name) VALUES ('Organisateur');
INSERT INTO profile (profile_name) VALUES ('Visiteur');

INSERT INTO users (firstName, lastName, email, password) VALUES ('orgaName', 'orgaName', 'organisateur@epsi.fr', 'organisateur');

INSERT INTO user_profile (profile_id, user_id) VALUES(
 (select id from profile where profile_name = 'organisateur') ,
 (select id from users where email = 'organisateur@epsi.fr')
 );

INSERT INTO type_evenement (typeEventName) VALUES ('Culturel');
INSERT INTO type_evenement (typeEventName) VALUES ('Artistique');
INSERT INTO type_evenement (typeEventName) VALUES ('Sportif');
INSERT INTO type_evenement (typeEventName) VALUES ('Pédagogique');


INSERT INTO canal_evenement (canalEventName) VALUES ('Youtube');
INSERT INTO canal_evenement (canalEventName) VALUES ('Facebook');
INSERT INTO canal_evenement (canalEventName) VALUES ('Twitch');


