INSERT INTO profile (profile_name) VALUES ('Organisateur');
INSERT INTO profile (profile_name) VALUES ('Visiteur');

INSERT INTO users (email, password) VALUES ('organisateur@epsi.fr', 'organisateur');

INSERT INTO user_profile (profile_id, user_id) VALUES(
 (select id from profile where profile_name = 'organisateur') ,
 (select id from users where email = 'organisateur@epsi.fr')
 );