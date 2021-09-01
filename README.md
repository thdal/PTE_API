![alt text](https://github.com/thdal/PTE_API/blob/main/model.png)

Lien vers l'API en ligne : https://pte-epsi.thibaut-dalens.com:3000/

Structure générale :

Le point d'entrée de notre api est le fichier server.js à la racine de notre dossier, le fichier server.js fait un import de app.js qui fait la configuration d'express. 

Le chemin du fichier de configuration des routes de notre api est le suivant /app/routes/app.routes.js .

Commande pour lancer le serveur nodejs en local : node server.js \
Commande pour lancer le serveur nodejs en production : node server.js prod

Pour tester l'API en local :

1. Installer MySQL
2. Configurer la connexion dans le fichier /app/config/db.config.js
3. Passer le fichier DML suivant /sql/PTE_SQL_DML.sql
4. Passer le fichier DDL suivant /sql/PTE_SQL_DDL.sql
5. lancer le serveur avec la commande node server.js

Installation de bcrypt pour le hach des mots de passe :

1. npm i bcrypt

Pour les tests avec Jest (mock) :

1. npm i jest 
2. npm add --dev babel-jest @babel/core @babel/preset-env
3. Renommer le fichier babel.config.js en babel.config.cjs
4. Lancer les tests avec la commande npm run test

Commandes Forever ( Lance node en tant que service sur le serveur ) : 

forever list\
forever stopall\
forever start --uid "custom-name" server.js prod\
forever restart ID //ID peut être l'id le uid ou le pid