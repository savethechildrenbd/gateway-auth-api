module.exports = app => {
  const auth = require("../controllers/auth-b2c.controller.js");
  const url = require('url');

  let router = require("express").Router();
  router.get("/login", function (req, res) {
    res.redirect(req.host_url + req.cookies?.ClientAuthorizationRequest ?? '');
  });

  // Create a new User
  router.post("/login", async function (req, res) {
    try {
      if (!req.body.email) {
        res.redirect(req.host_url + req.cookies?.ClientAuthorizationRequest ?? '');
      }
      const login = await auth.otp(req, res);

      console.log(req.body.username);
      res.render('login-verify', { username: req.body.username });
    } catch (error) {
      res.json({ message: "Welcome to application.iiiiiiiiii" });
    }
  });

  // Verify OTP a new User
  router.post("/login-verify", async function (req, res) {
    try {
      const login = await auth.otp(req, res);
      console.log(login);
      res.json({ message: "Welcome to application.", body: req.body });
    } catch (error) {
      res.json({ message: "Welcome to application.iiiiiiiiii" });
    }

  });

  app.use('/auth', router);
};
