module.exports = app => {
  const url = require('url');

  const oauthClient = require("../controllers/oauth-client.controller");
  
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

  app.use('/', router);
};
