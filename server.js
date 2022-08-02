require("dotenv").config();
const express = require("express");
const cookieParser = require('cookie-parser')
const cors = require("cors");
const path = require("path");
// let moment = require('moment-timezone');
// moment.tz.setDefault("Asia/Dhaka");
const oauthClient = require("./app/controllers/admin-api/oauth-client.controller");

const app = express();

var corsOptions = {
  origin: "http://localhost:7071"
};

app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});



let auth = async function (req, res, next) {
  try {
    const client_id = req.header('client_id');
    const client_secret = req.header('client_secret');
    const client = await oauthClient.findClient(client_id, client_secret);
    if (client.status == true) {
      next();
    } else {
      res.json({ status: false, message: "Please login first" });
    }

  } catch (error) {
    res.json({ status: false, message: error.message })
  }

};


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

require("./app/routes/public.routes")(app);
require("./app/routes/auth-b2c.routes")(app);

//admin api
require("./app/routes/admin-api/oauth-client.routes")(app);

// api 
require("./app/routes/api/auth.routes")(app, auth);
require("./app/routes/api/monday-crm.routes")(app);

// set port, listen for requests
const PORT = process.env.NODE_PORT || 8080;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});
