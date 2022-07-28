module.exports = app => {
  const auth = require("../controllers/auth-b2c.controller.js");
  const url = require('url');

  let router = require("express").Router();

  router.get("/login", function (req, res) {
    res.redirect(req.host_url + req.cookies?.ClientAuthorizationRequest ?? '');
  });

  router.get("/login-verify", function (req, res) {
    res.redirect(req.host_url + req.cookies?.ClientAuthorizationRequest ?? '');
  });

  // Create a new User
  router.post("/login", async function (req, res) {
    try {
      if (!req.body.username) {
        res.redirect(req.host_url + req.cookies?.ClientAuthorizationRequest ?? '');
      }
      const login = await auth.otp(req, res);
      if (login.status == true) {
        res.render('login-verify', { username: req.body.username, message: '' });
      } else {
        res.render('login');
      }
    } catch (error) {
      res.json({ message: "Welcome to application" });
    }
  });

  // Create a new User
  router.post("/resend", async function (req, res) {
    try {
      const login = await auth.otp(req, res);
      res.json(login);
    } catch (error) {
      return {
        status: false,
        message: err.message || "Some error occurred while creating the User."
      };
    }
  });

  // Verify OTP a new User
  router.get("/login-verify", async function (req, res) {
    try {

      let q = url.parse(req.cookies?.ClientAuthorizationRequest, true).query;

      const loginVerify = await auth.otpVerify(req, res);

      if (loginVerify.status == true) {
        if (q.response_type == 'code') {
          res.header('Authorization', `Bearer ${loginVerify.token}`);
          res.redirect(q.redirect_uri + '/' + loginVerify.token);
          res.redirect(q.redirect_uri);
          res.redirect('http://localhost:8000/');
        } else {
          res.render('verify-callback', { redirect_uri: q.redirect_uri ?? '', response_type: q.response_type ?? 'post', token: loginVerify.token });
        }
      } else {
        res.render('login-verify', { username: req.body.username, message: loginVerify.message });
      }
    } catch (error) {
      res.redirect(req.host_url + 'auth/login');
    }
  });

  app.use('/auth', router);
};
