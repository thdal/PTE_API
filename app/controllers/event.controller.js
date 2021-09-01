//const Event = require("../models/event.model.js");
import Event from '../models/event.model.js';
import fs from "fs";

const events = {
    // Create and save a new event
    create(req, res){
        // Validate request
        if (!req.body) {
            res.status(400).send({
                message: "Content can not be empty!"
            });
            return;
        }
        //return;

        var eventJson = JSON.parse(req.body.event)//On récupére le json du formData

        // Create an event
        const event = new Event({
            eventName: eventJson.eventName,
            eventDate: eventJson.eventDate,
            eventHour: eventJson.eventHour,
            eventLink: eventJson.eventLink,
            eventAddress: eventJson.eventAddress,
            eventDescription: eventJson.eventDescription,
            typeEventId: eventJson.typeEventId,
            canalEventId: eventJson.canalEventId,
            userId: eventJson.userId,
            eventImg: eventJson.eventImg
        });

        // Save the new event in the database
        Event.create(event, (err, data) => {
            if (err){
                res.status(500).send({
                    message:
                        err.message || "Some error occurred while inserting the new event."
                });
            }
            //Si on a pas eu de pb pour ajouter l'événement on lui ajoute son dossier image
            else{
                //Mais seulement si on utilise une image perso
                if(data.eventImg && Object.keys(req.files).length != 0){
                    var eventId = data.id; //L'id de l'événement pour créer un dossier unique
                    //On enregistre l'image sur le serveur
                    saveImageEvent(req.files, eventId,(err, dataImg)=>{
                        if(err){
                            if(err.kind === "file_too_big"){
                                res.status(413).send({
                                  message: "File is too big, choose another one please."
                                });
                            }else {
                                res.status(500).send({
                                    message: "Error inserting imge from event with id " + eventId
                                });
                            }
                        }else{
                            res.send(data);
                        }
                    });
                //Si pas d'image
                }else{
                    res.send(data);
                }
            }
        });
    },

    // Update an event identified by the eventId in the request
    update(req, res){
        // Validate Request
        if (!req.body) {
            res.status(400).send({
                message: "Content can not be empty!"
            });
        }

        var eventJson = JSON.parse(req.body.event)//On récupére le json du formData

        Event.updateById(
            req.params.eventId,
            new Event(eventJson),
            (err, data) => {
                //Si j'ai une erreur dans l'update
                if (err) {
                    if (err.kind === "not_found") {
                        res.status(404).send({
                            message: `Not found event with id ${req.params.eventId}.`
                        });
                    } else {
                        res.status(500).send({
                            message: "Error updating event with id " + req.params.eventId
                        });
                    }
                }
                //Si pas d'erreur on change l'image si besoin
                else
                {
                    //Mais seulement si on utilise une image perso
                    //et qu'on a bien une image à insérer
                    if(data.eventImg && Object.keys(req.files).length != 0){
                        var eventId = data.id; //L'id de l'événement pour créer un dossier unique
                        //On enregistre l'image sur le serveur
                        saveImageEvent(req.files, eventId,(err, dataImg)=>{
                            if(err){
                                if(err.kind === "file_too_big"){
                                    res.status(413).send({
                                        message: "File is too big, choose another one please."
                                    });
                                }else {
                                    res.status(500).send({
                                        message: "Error inserting imge from event with id " + eventId
                                    });
                                }
                            }else{
                                res.send(data);
                            }
                        });
                        //Si pas d'image
                    }else{
                        res.send(data);
                    }
                }
            }
        );
    },

    // Retrieve all event types from the database.
    findAllEventTypes(req, res){
        Event.getAllEventTypes((err, data) => {
            if (err)
                res.status(500).send({
                    message:
                        err.message || "Some error occurred while retrieving event types."
                });
            else res.send(data);
        });
    },

    // Retrieve all event canals from the database.
    findAllEventCanals(req, res){
        Event.getAllEventCanals((err, data) => {
            if (err)
                res.status(500).send({
                    message:
                        err.message || "Some error occurred while retrieving event canals."
                });
            else res.send(data);
        });
    },

    // Retrieve all event from the database.
    findAll(req, res){
        Event.getAll((err, data) => {
            if (err){
                if (err.kind === "not_found") {
                    res.status(404).send({
                        message: `0 event found`
                    });
                }else{
                    res.status(500).send({
                        message:
                            err.message || "Some error occurred while retrieving events."
                    });
                }
            } else res.send(data);
        });
    },

    // Retrieve all event from the database with userId.
    findAllByUser(req, res){
        Event.getAllByUser(req.params.userId, (err, data) => {
            if (err){
                if (err.kind === "not_found") {
                    res.status(404).send({
                        message: `0 event found`
                    });
                }else{
                    res.status(500).send({
                        message:
                            err.message || "Some error occurred while retrieving events."
                    });
                }
            } else res.send(data);
        });
    },

    // Retrieve all event from the database.
    findAllOfTheDay(req, res){
        Event.getAllOfTheDay((err, data) => {
            if (err){
                if (err.kind === "not_found") {
                    res.status(404).send({
                        message: `Not found event of the day.`
                    });
                }else{
                    res.status(500).send({
                        message:
                            err.message || "Some error occurred while retrieving events."
                    });
                }
            } else res.send(data);
        });
    },

    // Retrieve all event from the database.
    findAllOfTheDayByUser(req, res){
        Event.getAllOfTheDayByUser(req.params.userId, (err, data) => {
            if (err){
                if (err.kind === "not_found") {
                    res.status(404).send({
                        message: `Not found event of the day by user.`
                    });
                }else{
                    res.status(500).send({
                        message:
                            err.message || "Some error occurred while retrieving events."
                    });
                }
            } else res.send(data);
        });
    },

    // Find a single event with a eventId
    findOne(req, res){
        Event.findById(req.params.eventId, (err, data) => {
            if (err) {
                if (err.kind === "not_found") {
                    res.status(404).send({
                        message: `Not found event with id ${req.params.eventId}.`
                    });
                } else {
                    res.status(500).send({
                        message: "Error retrieving event with id " + req.params.eventId
                    });
                }
            } else res.send(data);
        });
    },

    // Retrieve all event from the database with specific type.
    findAllByType(req, res){
        Event.getAllByType(req.params.typeId, req.params.userId, (err, data) => {
            if (err) {
                if (err.kind === "not_found") {
                    res.status(404).send({
                        message: `Not found event with TypeId ${req.params.typeId}.`
                    });
                } else {
                    res.status(500).send({
                        message:
                            err.message || "Some error occurred while retrieving events by type."
                    });
                }
        }else {
                res.send(data);
            }
        });
    },

    // Retrieve all event from the database with specific canal.
    findAllByCanal(req, res){
        Event.getAllByCanal(req.params.canalId, req.params.userId, (err, data) => {
            if (err) {
                if (err.kind === "not_found") {
                    res.status(404).send({
                        message: `Not found event with canalId ${req.params.canalId}.`
                    });
                } else {
                    res.status(500).send({
                        message:
                            err.message || "Some error occurred while retrieving events by canal."
                    });
                }
            }else {
                res.send(data);
            }
        });
    },

    // Retrieve all event from the database between dates.
    findAllWithDate(req, res){
        if (!req.query.dates) {
            res.status(400).send({
                message: "Dates can not be null!"
            });
            return;
        }
        const objDates = JSON.parse(req.query.dates);

        Event.getAllWithDate(objDates, (err, data) => {
            if (err) {
                if (err.kind === "not_found") {
                    res.status(404).send({
                        message: `Not found event with date.`
                    });
                } else {
                    res.status(500).send({
                        message:
                            err.message || "Some error occurred while retrieving events with date."
                    });
                }
            }else {
                res.send(data);
            }
        });
    },

    // Retrieve all event from the database between dates with userId.
    findAllWithDateByUser(req, res){

        if (!req.query.dates) {
            res.status(400).send({
                message: "Dates can not be null!"
            });
            return;
        }
        const objDates = JSON.parse(req.query.dates);

        Event.getAllWithDateByUser(objDates, req.params.userId, (err, data) => {
            if (err) {
                if (err.kind === "not_found") {
                    res.status(404).send({
                        message: `Not found event with date and userId : ${req.params.userid}.`
                    });
                } else {
                    res.status(500).send({
                        message:
                            err.message || "Some error occurred while retrieving events with date with userId."
                    });
                }
            }else {
                res.send(data);
            }
        });
    },

    // Delete an event with the specified eventId in the request
    delete(req, res) {
        Event.remove(req.params.eventId, (err, data) => {
            if (err) {
                if (err.kind === "not_found") {
                    res.status(404).send({
                        message: `Not found event with id ${req.params.eventId}.`
                    });
                } else {
                    res.status(500).send({
                        message: "Could not delete event with id " + req.params.eventId
                    });
                }
            } else{
                delImageEvent(req.params.eventId,(err, dataImg)=>{
                    if(err){
                            res.status(500).send({
                                message: "Error deleting image from event with id " + eventId
                            });
                    }else{
                        //res.send({ message: `Event was deleted successfully!` });
                    }
                });
                res.send({ message: `Event was deleted successfully!` });
            }
        });
    },

    findWithWord(req, res){
        if (!req.body.word) {
            res.status(400).send({
                message: "Word shouldn't be null!"
            });
            return;
        }

        var word = req.body.word;

        Event.getWithWord(word, (err, data) => {
            if (err) {
                if (err.kind === "not_found") {
                    res.status(404).send({
                        message: `Not found event with word.`
                    });
                } else {
                    res.status(500).send({
                        message:
                            err.message || "Some error occurred while retrieving events with word."
                    });
                }
            }else {
                res.send(data);
            }
        });
    },
}

//Fonction privée on manipule les images de nos événéments
// Peut être à déplacer dans un nouveau fichier
function saveImageEvent(file, eventId, result){
    var file = file.eventImgFile;//eventImgFile, le nom de formData set côté client
    var fileName = file.originalFilename;
    var fileNameGeneric = "eventImg.jpg";
    var fileSize = file.size;
    var filePath = file.path;
    //On enregistre pas de fichier trop gros, fileSize en octets ici < 10Mo
    if((fileSize > 10000000)){
        result({ kind: "file_too_big" }, null);
        return;
    }
    //On crée un dossier particulier pour chaque événement. (sous la forme: event+eventId)
    var eventDir = "app/public/eventsImgs/eventId"+eventId;

    if (!fs.existsSync(eventDir)){
        fs.mkdirSync(eventDir);
    }

    fs.copyFile(filePath, eventDir + "/" + fileNameGeneric, (err) => {
        if (err){
            result(err, null);
            return;
        }
        var msg = filePath + ' was copied to ' + eventDir + "/" + fileNameGeneric;
        console.log(msg);
        result(null, msg)
    });
}

//Fonction privée on supprime l'image associé à un événement
function delImageEvent(eventId, result){
    var eventDir = "app/public/eventsImgs/eventId"+eventId;
    if (fs.existsSync(eventDir)) {
        fs.rmdirSync(eventDir, {recursive: true}, (err) =>{
            if (err){
                result(err, null);
                return;
            }
        })
        var msg = eventDir + ' was deleted successfully.';
        console.log(msg);
        result(null, msg)
    }
}

export default events;
