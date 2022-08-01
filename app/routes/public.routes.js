module.exports = app => {
  const url = require('url');

  const oauthClient = require("../controllers/admin-api/oauth-client.controller");
  const oauthAccessToken = require("../controllers/oauth-access-token.controller");
  const authController = require("../controllers/auth-b2c.controller.js");

  let router = require("express").Router();

  router.get('/', async function (req, res) {
    let q = url.parse(req.url, true).query;
    if (!q.client_id && !q.redirect_uri && !q.client_secret) {
      res.render('404');
    } else {
      const client = await oauthClient.findClient(q.client_id, q.client_secret);
      if (client.status == true) {
        res.cookie('ClientAuthorizationRequest', req.url);
        res.render('login');
      } else {
        res.render('404');
      }
    }
  });

  router.get('/:id', async function (req, res) {
    try {
      const now_time = new Date().getTime();
      const getOauthAccessToken = await oauthAccessToken.findOne(req.params.id);

      if (getOauthAccessToken && getOauthAccessToken.user_id) {

        const user = await oauthAccessToken.findUser(getOauthAccessToken.user_id);

        // calculate time difference
        const time_difference = (getOauthAccessToken.expired_at - now_time);
        if (time_difference < 0) {
          res.json({ status: false, message: 'Token has expired, please try again.' });
        } else {
          const jwtToken = await authController.jwtToken(user);
          res.json(jwtToken);
        }
      } else {
        res.render('404');
      }
    } catch (error) {
      res.send({
        status: false,
        message: error.message || "Some error occurred while retrieving token id!"
      });
    }
  });

  app.use('/', router);
};
