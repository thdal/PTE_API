//const Event = require("../models/event.model.js");
import Event from '../models/event.model.js';


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
        // Create a User
        const event = new Event({
            eventName: req.body.eventName,
            eventDate: req.body.eventDate,
            eventLink: req.body.eventLink,
            eventAddress: req.body.eventAddress,
            eventDescription: req.body.eventDescription,
            typeEventId: req.body.typeEventId,
            canalEventId: req.body.canalEventId,
            userId: req.body.userId
        });

        // Save the new event in the database
        Event.create(event, (err, data) => {
            if (err)
                res.status(500).send({
                    message:
                        err.message || "Some error occurred while inserting the new event."
                });
            else res.send(data);
        });
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
            if (err)
                res.status(500).send({
                    message:
                        err.message || "Some error occurred while retrieving events."
                });
            else res.send(data);
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
}
export default events;
