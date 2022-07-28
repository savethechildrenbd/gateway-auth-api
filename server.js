require("dotenv").config();
const express = require("express");
const cookieParser = require('cookie-parser')
const cors = require("cors");
const path = require("path");
const url = require('url');

const app = express();

var corsOptions = {
  origin: "http://localhost:7071"
};

app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

// let’s you use the cookieParser in your application
app.use(cookieParser());

app.use(cors());

// app.use(cors(corsOptions));

// parse requests of content-type - application/json
app.use(express.json());

// parse requests of content-type - application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true }));

const db = require("./app/models");

db.sequelize.sync();
// // drop the table if it already exists
db.sequelize.sync({ force: false }).then(() => {
  console.log("Drop and re-sync db.");
});

app.use(express.static(path.join(__dirname, "static")));
app.engine('.html', require('ejs').__express);
app.set('views', __dirname + '/views');
app.set('view engine', 'html');

app.use(express.static(__dirname + '/public'));

app.use(function (req, res, next) {
  let host_url = req.protocol + '://' + req.get('host');
  req.host_url = host_url;
  next();
});

const clients = require("./app/controllers/client.controller");

app.get('/', async function (req, res) {
  let q = url.parse(req.url, true).query;
  if (!q.client_id && !q.redirect_uri && !q.client_secret) {
    res.render('404');
  } else {
    const client = await clients.findClient(q.client_id, q.client_secret);
    if (client == true) {
      res.cookie('ClientAuthorizationRequest', req.url);
      res.render('login');
    } else {
      res.render('404');
    }
  }
});

// app.get('/callback/?:token/?:type', function (req, res) {
//   res.json({ message: req.body });
// });

// app.post('/callback', function (req, res) {
//   res.json({ message: req.body });
// });

// simple route
// app.get("/", (req, res) => {
//   res.json({ message: "Welcome to application." });
// });

require("./app/routes/turorial.routes")(app);
require("./app/routes/auth.routes")(app);
require("./app/routes/auth-b2c.routes")(app);
require("./app/routes/monday-crm.routes")(app);
require("./app/routes/client.routes")(app);

// set port, listen for requests
const PORT = process.env.NODE_PORT || 8080;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});
