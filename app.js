import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import { router } from './app/routes/app.routes.js';


const app = express();

// parse requests of content-type: application/json
app.use(bodyParser.json(), cors());

// parse requests of content-type: application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));

app.use(express.static('./app/public/usersImgs'));//Pour l'instant cm ça, on rend le dossier public pour recupérer les images des utilisateurs depuis le client
app.use(express.static('./app/public/eventsImgs'));//Pour l'instant cm ça, on rend le dossier public pour recupérer les images des événements depuis le client

// simple route
app.get("/", (req, res) => {
    res.json({ message: "Welcome to TITRE EPSI API application." });
});

app.use(router);

export default app;




