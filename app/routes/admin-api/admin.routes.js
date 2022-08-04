module.exports = app => {
  const admins = require("../../controllers/admin-api/oauth-admin.controller");

  const authMiddleware = require("../../middlewares/auth.middleware");

  let router = require("express").Router();

  // Create a new Tutorial
  router.post("/", authMiddleware.adminAuth, admins.create);

  // Retrieve all admins
  router.get("/", authMiddleware.adminAuth, admins.findAll);

  // Retrieve all published admins
  router.get("/published/:id", admins.findAllPublished);

  // Retrieve a single Tutorial with id
  router.get("/:id", authMiddleware.adminAuth, admins.findOne);

  // Update a Tutorial with id
  router.put("/:id", authMiddleware.adminAuth, admins.update);

  // Delete a Tutorial with id
  router.delete("/:id", authMiddleware.adminAuth, admins.delete);

  // Delete all admins
  // router.delete("/", authMiddleware.adminAuth, admins.deleteAll);

  app.use('/admin/api/v1/admins', router);
};
