import users from "../controllers/user.controller.js";
import events from "../controllers/event.controller.js";
import express from 'express';
export const router = express.Router();

  //USER
router.post("/users", users.create);// Create a new User
router.post("/login", users.login);// Retrive a User with email and password
router.get("/users", users.findAll);// Retrieve all Users
router.get("/userProfiles", users.findAllUserProfiles);// Retrieve all User profiles
router.get("/users/:userId", users.findOne);// Retrieve a single User with userId
router.put("/users/:userId", users.update);// Update a User with userId
router.delete("/users/:userId", users.delete);// Delete a User with userId
router.delete("/users", users.deleteAll);// Create a new User
  //EVENTS
router.post("/events", events.create);// Create a new event
router.get("/events", events.findAll);// Retrieve all events
router.get("/events/type/:typeId/:userId", events.findAllByType);// Retrieve all events with typeId
router.get("/events/canal/:canalId/:userId", events.findAllByCanal);// Retrieve all events with canalId
router.get("/eventTypes", events.findAllEventTypes);// Retrieve all event types
router.get("/eventCanals", events.findAllEventCanals);// Retrieve all event canals

