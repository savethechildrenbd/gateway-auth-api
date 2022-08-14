module.exports = app => {
  const users = require("../../controllers/admin-api/user.controller");

  const authMiddleware = require("../../middlewares/auth.middleware");

  let router = require("express").Router();

  // // Retrieve all users
  router.get("/", authMiddleware.adminAuth, users.findAll);

  // Retrieve all published users
  router.get("/published", authMiddleware.adminAuth, users.findAllPublished);

  // Retrieve a single Tutorial with id
  router.get("/:id", users.findOne);

  // Update a Tutorial with id
  router.put("/:id", users.update);

  // Delete a Tutorial with id
  router.delete("/:id", users.delete);

  // Delete all users
  router.delete("/", users.deleteAll);

  app.use('/admin/api/v1/users', router);
};
