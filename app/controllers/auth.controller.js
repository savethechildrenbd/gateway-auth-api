const db = require("../models");
const jwt = require('jsonwebtoken');

const mail = require("../service/send-mail");

const User = db.users;

// Create and Save a new User and Update OTP Code
exports.otp = async (req, res) => {

  // Validate request
  if (!req.body.email) {
    res.status(400).send({
      message: "Content can not be empty!"
    });
    return;
  }

  try {
    const now_time = new Date();
    const expiry_time = new Date(now_time);
    expiry_time.setMinutes(now_time.getMinutes() + 5);
    const otp_code = Math.floor(100000 + Math.random() * 900000).toString();

    const user = await User.findOne({ where: { email: req.body.email } });
    // mail.sendOtp();
    if (user) {
      const body = { expire_at: expiry_time.getTime(), code: otp_code };
      await User.update(body, { where: { id: user.id } })
      res.json({ status: true, message: "OTP sent successfully" });
    } else {
      // Create a User
      const body = {
        email: req.body.email,
        expire_at: expiry_time.getTime(),
        code: otp_code,
        published: req.body.published ? req.body.published : true
      };
      await User.create(body);
      res.json({ status: true, message: "OTP sent successfully" });
    }
  } catch (err) {
    res.status(500).send({
      status: false,
      message: err.message || "Some error occurred while creating the User."
    });
  }
};

// OTP Verify
exports.otpVerify = async (req, res) => {
  // Validate request
  if (!req.body.email) {
    res.status(400).send({
      status: false,
      message: "Content email can not be empty!"
    });
    return;
  }

  if (!req.body.code) {
    res.status(400).send({
      status: false,
      message: "Content code can not be empty!"
    });
    return;
  }

  try {
    const email = req.body.email;
    const code = req.body.code;

    const now_time = new Date().getTime();

    const user = await User.findOne({ where: { email: email } });
    if (!user) {
      res.status(401);
      return res.json({ status: false, message: 'email is not valid' });
    }

    if (user.code != code) {
      res.status(401);
      return res.json({ status: false, message: 'OTP you entered is invalid' });
    }

    // calculate time difference
    const time_difference = (user.expire_at - now_time);
    if (time_difference < 0) {
      res.status(401);
      return res.json({ status: false, message: 'OTP has expired, please try again.' });
    }

    const sessionSecret = process.env.SESSION_SECRET;
    const ACCESS_TOKEN_EXPIRY_DAY = process.env.ACCESS_TOKEN_EXPIRY_DAY;

    const userPayload = { sub: user.uuid, email: user.email }

    const token = jwt.sign(userPayload, sessionSecret, { expiresIn: 60 * 60 * 24 * ACCESS_TOKEN_EXPIRY_DAY });
    res.json({ status: true, token: token });

  } catch (err) {
    res.status(500).send({
      status: false,
      message: err.message || "Some error occurred while creating the User."
    });
  }
};
