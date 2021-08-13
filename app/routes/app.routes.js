import users from "../controllers/user.controller.js";
import events from "../controllers/event.controller.js";
import express from 'express';
export const router = express.Router();
import  multipart  from 'connect-multiparty'; //Pour récupérer le fichier du formulaire (image)
const  multipartMiddleware  =  multipart();//Pour récupérer le fichier du formulaire (image)

//USER
router.post("/api/users", users.create);// Create a new User
router.post("/api/login", users.login);// Retrive a User with email and password
router.get("/api/users", users.findAll);// Retrieve all Users
router.get("/api/usersWithProfiles", users.findAllWithProfiles);// Retrieve all Users with profiles
router.get("/api/userProfiles", users.findAllUserProfiles);// Retrieve all User profiles
router.put("/api/updateUserFromAdmin/:userId", users.updateFromAdmin);// Update an event with eventId
router.put("/api/updateUserProfile/:userId", users.updateUserProfile);// Update an event with eventId
router.route("/api/users/:userId").put(multipartMiddleware, users.update);// Update an event with eventId
router.get("/api/users/:userId", users.findOne);// Retrieve a single User with userId
//router.put("/users/:userId", users.update);// Update a User with userId
router.delete("/api/users/:userId", users.delete);// Delete a User with userId
router.delete("/api/deleteUserProfile/:userId/:profileId", users.deleteUserProfile);// Delete a User with userId
router.delete("/api/users", users.deleteAll);// Create a new User
//EVENTS
//router.post("/events", events.create);// Create a new event
//router.put("/events/:eventId", events.update);// Update an event with eventId
router.route("/api/events/:eventId").put(multipartMiddleware, events.update);// Update an event with eventId
router.route("/api/events").post(multipartMiddleware, events.create);// post event with img
router.get("/api/events", events.findAll);// Retrieve all events
router.get("/api/eventsWithDates", events.findAllWithDate);// Retrieve all events with dates
router.get("/api/eventsWithDates/:userId", events.findAllWithDateByUser);// Retrieve all events with dates with userId
router.get("/api/events/oftheday", events.findAllOfTheDay);// Retrieve all events of the day
router.get("/api/events/oftheday/:userId", events.findAllOfTheDayByUser);// Retrieve all events of the day by user
router.get("/api/events/:userId", events.findAllByUser);// Retrieve all events for one user
router.delete("/api/event/:eventId", events.delete);// Delete an event with eventId
router.get("/api/event/:eventId", events.findOne);// Retrieve a single event with eventId
router.get("/api/events/type/:typeId/:userId", events.findAllByType);// Retrieve all events with typeId
router.get("/api/events/canal/:canalId/:userId", events.findAllByCanal);// Retrieve all events with canalId
router.get("/api/eventTypes", events.findAllEventTypes);// Retrieve all event types
router.get("/api/eventCanals", events.findAllEventCanals);// Retrieve all event canals

//Les routes dans express sont éxécutés dans l'ordre, considéré qu'un chemin peut être interprêté comme un paramètre.


