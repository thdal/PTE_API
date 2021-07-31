import users from "../controllers/user.controller.js";
import events from "../controllers/event.controller.js";
import express from 'express';
export const router = express.Router();
import  multipart  from 'connect-multiparty'; //Pour récupérer le fichier du formulaire (image)
const  multipartMiddleware  =  multipart();//Pour récupérer le fichier du formulaire (image)

//USER
router.post("/users", users.create);// Create a new User
router.post("/login", users.login);// Retrive a User with email and password
router.get("/users", users.findAll);// Retrieve all Users
router.get("/usersWithProfiles", users.findAllWithProfiles);// Retrieve all Users with profiles
router.get("/userProfiles", users.findAllUserProfiles);// Retrieve all User profiles
router.put("/updateUserFromAdmin/:userId", users.updateFromAdmin);// Update an event with eventId
router.put("/updateUserProfile/:userId", users.updateUserProfile);// Update an event with eventId
router.route("/users/:userId").put(multipartMiddleware, users.update);// Update an event with eventId
router.get("/users/:userId", users.findOne);// Retrieve a single User with userId
//router.put("/users/:userId", users.update);// Update a User with userId
router.delete("/users/:userId", users.delete);// Delete a User with userId
router.delete("/deleteUserProfile/:userId/:profileId", users.deleteUserProfile);// Delete a User with userId
router.delete("/users", users.deleteAll);// Create a new User
//EVENTS
//router.post("/events", events.create);// Create a new event
//router.put("/events/:eventId", events.update);// Update an event with eventId
router.route("/events/:eventId").put(multipartMiddleware, events.update);// Update an event with eventId
router.route("/events").post(multipartMiddleware, events.create);// post event with img
router.get("/events", events.findAll);// Retrieve all events
router.get("/eventsWithDates", events.findAllWithDate);// Retrieve all events with dates
router.get("/eventsWithDates/:userId", events.findAllWithDateByUser);// Retrieve all events with dates with userId
router.get("/events/oftheday", events.findAllOfTheDay);// Retrieve all events of the day
router.get("/events/oftheday/:userId", events.findAllOfTheDayByUser);// Retrieve all events of the day by user
router.get("/events/:userId", events.findAllByUser);// Retrieve all events for one user
router.delete("/event/:eventId", events.delete);// Delete an event with eventId
router.get("/event/:eventId", events.findOne);// Retrieve a single event with eventId
router.get("/events/type/:typeId/:userId", events.findAllByType);// Retrieve all events with typeId
router.get("/events/canal/:canalId/:userId", events.findAllByCanal);// Retrieve all events with canalId
router.get("/eventTypes", events.findAllEventTypes);// Retrieve all event types
router.get("/eventCanals", events.findAllEventCanals);// Retrieve all event canals

//Les routes dans express sont éxécutés dans l'ordre, considéré qu'un chemin peut être interprêté comme un paramètre.


