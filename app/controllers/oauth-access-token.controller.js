const db = require("../models");
const OauthAccessToken = db.oauthAccessToken;
const User = db.users;

// Create and Save a new OauthAccessToken
exports.create = async (client_id, user_id) => {
  // Create a OauthAccessToken
  const oauthAccessToken = { client_id: client_id, user_id: user_id };

  // Save OauthAccessToken in the database
  return await OauthAccessToken.create(oauthAccessToken);
};

// Find a single OauthAccessToken with an id
exports.findOne = async (id) => {
  return await OauthAccessToken.findOne({ where: { id: id } });
};

exports.findUser = async (id) => {
  return await User.findOne({ where: { uuid: id } });
};
