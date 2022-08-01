const dbConfig = require("../config/db.config.js");
const Sequelize = require("sequelize");

const sequelize = new Sequelize(dbConfig.DB, dbConfig.USER, dbConfig.PASSWORD, {
  host: dbConfig.HOST,
  dialect: dbConfig.dialect,
  port: dbConfig.port,
  operatorsAliases: false,

  pool: {
    max: dbConfig.pool.max,
    min: dbConfig.pool.min,
    acquire: dbConfig.pool.acquire,
    idle: dbConfig.pool.idle
  },
  // dialectOptions: {
  //   useUTC: false, // for reading from database
  // },
  // timezone: '+06:00', // for writing to database
});

const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.users = require("./user.model.js")(sequelize, Sequelize);
db.mondayCrm = require("./monday-crm.model.js")(sequelize, Sequelize);
db.oauthClients = require("./oauth-client.model")(sequelize, Sequelize);
db.oauthAccessToken = require("./oauth-access-token.model")(sequelize, Sequelize);

module.exports = db;
