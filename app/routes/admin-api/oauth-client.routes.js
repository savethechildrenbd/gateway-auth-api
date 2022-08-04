module.exports = app => {
  const clients = require("../../controllers/admin-api/oauth-client.controller.js");

  const authMiddleware = require("../../middlewares/auth.middleware");

  let router = require("express").Router();

  // Create a new Clients
  router.post("/", authMiddleware.adminAuth, clients.create);

  // Retrieve all Tutorials
  router.get("/", authMiddleware.adminAuth, clients.findAll);

  // Retrieve all published Tutorials
  router.get("/published", authMiddleware.adminAuth, clients.findAllPublished);

  // Retrieve a single Clients with id
  router.get("/:id", authMiddleware.adminAuth, clients.findOne);

  // Update a Clients with id
  router.put("/:id", authMiddleware.adminAuth, clients.update);

  // Delete a Clients with id
  // router.delete("/:id", clients.delete);

  // Delete all Tutorials
  // router.delete("/", authMiddleware.adminAuth, clients.deleteAll);0

  app.use('/admin/api/v1/clients', router);
};
