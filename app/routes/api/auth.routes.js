module.exports = (app, auth) => {
  const authController = require("../../controllers/api/auth.controller.js");

  let router = require("express").Router();

  // Create a new User
  router.post("/otp", auth, authController.otp);

  // Verify OTP a new User
  router.post("/otp-verify", auth, authController.otpVerify);

  app.use('/api/v1/auth', router);
};
