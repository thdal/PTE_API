![alt text](https://github.com/thdal/PTE_API/blob/ec72051e417147d852c788e5152f36d7ad08f0b1/model.png)

Lien vers l'API en ligne : https://pte-epsi.thibaut-dalens.com:3000/


Pour tester l'API en local :

1. Installer MySQL
2. Créer une base de données
3. Configurer la connexion dans le fichier /app/config/db.config.js
4. Passer le fichier DML suivant /sql/PTE_SQL_DML.sql
5. Passer le fichier DDL suivant /sql/PTE_SQL_DDL.sql
6. lancer le serveur avec la commande node server.js

Installation de bcrypt pour le hash des mots de passe :

1. npm i bcrypt

Pour les tests avec Jest (mock) :

1. npm i jest 
2. npm add --dev babel-jest @babel/core @babel/preset-env
3. Renommer le fichier babel.config.js en babel.config.cjs
4. Lancer les tests avec npm run test

Commandes Forever ( Lance node en tant que service sur le serveur ) : 

forever list\
forever stopall\
forever start --uid "custom-name" server.js prod\
forever restart ID //ID peut être l'id le uid ou le pid