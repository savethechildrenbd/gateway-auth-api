const userModel = require("./user.model");

module.exports = (sequelize, Sequelize) => {
  const OauthAccessToken = sequelize.define("oauth_access_token", {
    id: {
      type: Sequelize.STRING,
      primaryKey: true,
      unique: true
    },
    client_id: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    user_id: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    expired_at: {
      type: Sequelize.DATE
    }
  });

  OauthAccessToken.beforeCreate(async (oauthAccessToken) => {
    const records = await sequelize.query("SELECT CONCAT(UUID_SHORT()) as uuid");
    oauthAccessToken.expired_at = Date.now() + (60000 * 5); // Milliseconds * Minute
    oauthAccessToken.id = records[0][0].uuid;
  });
  
  // OauthAccessToken.belongsTo(userModel, { foreignKey: 'user_id', as: 'users' });

  return OauthAccessToken;
};
