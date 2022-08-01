module.exports = app => {
  const clients = require("../../controllers/admin-api/oauth-client.controller.js");

  let router = require("express").Router();

  // Create a new Clients
  router.post("/", clients.create);

  // Retrieve all Tutorials
  router.get("/", clients.findAll);

  // Retrieve all published Tutorials
  router.get("/published", clients.findAllPublished);

  // Retrieve a single Clients with id
  router.get("/:id", clients.findOne);

  // Update a Clients with id
  router.put("/:id", clients.update);

  // Delete a Clients with id
  router.delete("/:id", clients.delete);

  // Delete all Tutorials
  router.delete("/", clients.deleteAll);

  app.use('/admin/api/clients', router);
};
