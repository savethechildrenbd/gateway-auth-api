const db = require("../models");
const jwt = require('jsonwebtoken');
const url = require('url');

const mail = require("../service/send-mail");
const oauthAccessToken = require("../controllers/oauth-access-token.controller");

const User = db.users;

// Create and Save a new User and Update OTP Code
exports.otp = async (req, res) => {

  // Validate request
  if (!req.body.username) {
    return {
      status: false,
      message: "Username can not be empty!"
    };
  }

  try {
    let query = url.parse(req.cookies?.ClientAuthorizationRequest, true).query;

    if (!query && !query.client_id && !query.redirect_uri && !q.client_secret) {
      return {
        status: false,
        message: "client id can not be empty!"
      };
    }

    const now_time = new Date();
    const expiry_time = new Date(now_time);
    expiry_time.setMinutes(now_time.getMinutes() + 5);
    const otp_code = Math.floor(100000 + Math.random() * 900000).toString();


    const user = await User.findOne({ where: { email: req.body.username, client_id: query.client_id } });
    await mail.sendOtp(req.body.username, otp_code);
    if (user) {
      const body = { expire_at: expiry_time.getTime(), code: otp_code };
      await User.update(body, { where: { id: user.id } })
      return { status: true, message: "OTP sent successfully" };
    } else {
      // Create a User
      const body = {
        email: req.body.username,
        client_id: query.client_id,
        expire_at: expiry_time.getTime(),
        code: otp_code,
        published: req.body.published ? req.body.published : true
      };
      await User.create(body);
      return { status: true, message: "OTP sent successfully" };
    }
  } catch (err) {
    return {
      status: false,
      message: err.message || "Some error occurred while creating the User."
    };
  }
};

// OTP Verify
exports.otpVerify = async (req, res) => {
  // Validate request
  if (!req.body.username) {
    return {
      status: false,
      message: "Username can not be empty!"
    };
  }

  if (!req.body.verification_code) {
    return {
      status: false,
      message: "Verification code can not be empty!"
    };
  }

  try {
    let query = url.parse(req.cookies?.ClientAuthorizationRequest, true).query;
    if (!query && !query.client_id && !query.redirect_uri && !q.client_secret) {
      return {
        status: false,
        message: "client id can not be empty!"
      };
    }
    const email = req.body.username;
    const code = req.body.verification_code;
    const now_time = new Date().getTime();

    const user = await User.findOne({ where: { email: email, client_id: query.client_id } });
    if (!user) {
      return { status: false, message: 'email is not valid' };
    }

    if (user.code != code) {
      res.status(401);
      return { status: false, message: 'OTP you entered is invalid' };
    }

    // calculate time difference
    const time_difference = (user.expire_at - now_time);
    if (time_difference < 0) {
      return { status: false, message: 'OTP has expired, please try again.' };
    }

    const oauthAccessTokenId = await oauthAccessToken.create(query.client_id, user.uuid);

    const sessionSecret = process.env.SESSION_SECRET;
    const ACCESS_TOKEN_EXPIRY_DAY = process.env.ACCESS_TOKEN_EXPIRY_DAY;

    const userPayload = { sub: user.uuid, email: user.email }

    const token = jwt.sign(userPayload, sessionSecret, { expiresIn: 60 * 60 * 24 * ACCESS_TOKEN_EXPIRY_DAY });
    return { status: true, accessToken: token, oauthAccessTokenId: oauthAccessTokenId.id };

  } catch (err) {
    return {
      status: false,
      message: err.message || "Some error occurred while creating the User."
    };
  }
};

// create jwt token
exports.jwtToken = async (user) => {

  const sessionSecret = process.env.SESSION_SECRET;
  const ACCESS_TOKEN_EXPIRY_DAY = process.env.ACCESS_TOKEN_EXPIRY_DAY;

  const userPayload = { sub: user.uuid, email: user.email }

  const token = jwt.sign(userPayload, sessionSecret, { expiresIn: 60 * 60 * 24 * ACCESS_TOKEN_EXPIRY_DAY });
  return { status: true, accessToken: token };
};
