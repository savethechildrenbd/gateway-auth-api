module.exports = app => {
  const auth = require("../controllers/auth.controller.js");

  let router = require("express").Router();

  // Create a new User
  router.post("/otp", auth.otp);

  // Verify OTP a new User
  router.post("/otp-verify", auth.otpVerify);

  app.use('/api/auth', router);
};
