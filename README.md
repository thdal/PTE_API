![alt text](https://github.com/thdal/PTE_API/blob/ec72051e417147d852c788e5152f36d7ad08f0b1/model.png)

Pour tester l'API à ce stade :

1 Installer MySQL

2 Creer une base de donnée et créer la table "users" (je vais faire un script pour créer tout)

3 Configurer le fichier app/config/db.config.js pour votre connexion

installer cors

4 Lancer l'API avec node server.js

5 Tester les routes du fichier routes/app.routes.js


Je me suis basé sur ce modéle : https://bezkoder.com/node-js-rest-api-express-mysql/


Pour Jest :

installer jest, profil config ecmascript type: module, installer babel : npm add --dev babel-jest @babel/core @babel/preset-env

et renommer le fichier babel.config.js en babel.config.cjs


Forever: 

Tuto forever https://blog.bini.io/faire-tourner-une-application-node-js-en-permanence-avec-forever/

lancer avec forever

forever start --uid "custom-name" server.js prod