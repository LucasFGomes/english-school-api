const express = require("express");
const routes = express.Router();

const PersonController = require("../controllers/PersonController");
const LevelController = require("../controllers/LevelController");
const ClassController = require("../controllers/ClassController");

//Routes People
routes.get("/people", PersonController.index);
routes.get("/people/:id", PersonController.show);
routes.post("/people", PersonController.store);
routes.put("/people/:id", PersonController.update);
routes.delete("/people/:id", PersonController.destroy);

//Routes Registrations
routes.get(
  "/people/:student_id/registrations/:registration_id",
  PersonController.getRegistration
);
routes.post(
  "/people/:student_id/registrations/",
  PersonController.createRegistration
);
routes.put(
  "/people/:student_id/registrations/:registration_id",
  PersonController.updateRegistration
);
routes.delete(
  "/people/:student_id/registrations/:registration_id",
  PersonController.destroyRegistration
);

//Routes levels
routes.get("/levels", LevelController.index);
routes.get("/levels/:id", LevelController.show);
routes.post("/levels", LevelController.store);
routes.put("/levels/:id", LevelController.update);
routes.delete("/levels/:id", LevelController.destroy);

//Routes Classes
routes.get("/classes", ClassController.index);
routes.get("/classes/:id", ClassController.show);
routes.post("/classes", ClassController.store);
routes.put("/classes/:id", ClassController.update);
routes.delete("/classes/:id", ClassController.destroy);

module.exports = routes;
