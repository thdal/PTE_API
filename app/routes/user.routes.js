module.exports = app => {
  const users = require("../controllers/user.controller.js");
  const events = require("../controllers/event.controller.js");
  //USER
  app.post("/users", users.create);// Create a new User
  app.post("/login", users.login);// Retrive a User with email and password
  app.get("/users", users.findAll);// Retrieve all Users
  app.get("/userProfiles", users.findAllUserProfiles);// Retrieve all User profiles
  app.get("/users/:userId", users.findOne);// Retrieve a single User with userId
  app.put("/users/:userId", users.update);// Update a User with userId
  app.delete("/users/:userId", users.delete);// Delete a User with userId
  app.delete("/users", users.deleteAll);// Create a new User
  //EVENTS
  app.post("/events", events.create);// Create a new event
  app.get("/events", events.findAll);// Retrieve all events
  app.get("/events/type/:typeId", events.findAllByType);// Retrieve all events with typeId
  app.get("/events/canal/:canalId", events.findAllByCanal);// Retrieve all events with canalId
  app.get("/eventTypes", events.findAllEventTypes);// Retrieve all event types
  app.get("/eventCanals", events.findAllEventCanals);// Retrieve all event canals
};
