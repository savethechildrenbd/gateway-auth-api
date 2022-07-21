module.exports = app => {
  const authMiddleware = require("../middlewares/auth.middleware");

  const mondayCrm = require("../controllers/monday-crm.controller");

  let router = require("express").Router();

  // // Create a new Crm
  router.post("/", authMiddleware.userAuth, mondayCrm.create);

  // // Retrieve a single Crm 
  router.get("/", authMiddleware.userAuth, mondayCrm.findOne);

  app.use('/api/monday-crm', router);
};
