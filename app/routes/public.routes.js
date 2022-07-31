module.exports = app => {
  const url = require('url');
  const moment = require('moment-timezone');

  const oauthClient = require("../controllers/client.controller");
  const oauthAccessToken = require("../controllers/oauth-access-token.controller");

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
  // console.log("ssssssssssssss", moment().utc(true).toDate())
  router.get('/test', async function (req, res) {
    // try {
    //   console.log("ssssssssssssss", moment().utc(true).toDate())
    //   const sdfsd = await oauthAccessToken.create(req, res);
    //   console.log(sdfsd)
    //   // process.env.TZ = "Asia/Dhaka";
    //   // const expired_at = new Date();

    //   // var jun = moment(expired_at);
    //   var newYork = moment();

    //   // process.env.TZ = 'UTC';
    //   // console.log(moment.tz);
    // } catch (error) {
      // const sdfsd = await oauthAccessToken.create(req, res);
      // process.env.TZ = "Asia/Dhaka";
      // const expired_at = new Date();

      // var jun = moment(expired_at);
      var newYork = moment();

      // process.env.TZ = 'UTC';
      // console.log(moment.tz);
      // res.json({ status: true, message: "OTP sent successfully", expired_at: moment().utc(true).toDate() });
    // }


  });

  app.use('/', router);
};
