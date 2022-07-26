const nodemailer = require('nodemailer');

const mainHtml = require("./mail-html");


exports.sendOtp = async (email, otp_code) => {
    var transporter = nodemailer.createTransport({
        port: 587,
        service: 'gmail',
        host: 'smtp.gmail.com',
        auth: {
            user: 'savemefly@gmail.com',
            pass: 'lietbunvnquysacz'
        },
        tls: {
            // do not fail on invalid certs
            rejectUnauthorized: false
        }
    });

    var mailOptions = {
        from: 'md.mamun@savethechildren.org',
        to: email,
        subject: 'account email verification code',
        html: mainHtml.message(email, otp_code)
    };

    transporter.sendMail(mailOptions, function (error, info) {
        if (error) {
            console.log(error);
        } else {
            console.log('Email sent: ' + info.response);
        }
    });

}