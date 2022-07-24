const nodemailer = require('nodemailer');

exports.sendOtp = (req, res, next) => {
    var transporter = nodemailer.createTransport({
        // host: "localhost",
        // port: 1025,
        // secure: false,
        // auth: {
        //     user: 'test',
        //     pass: 'pass'
        // }
        host: 'smtp.ethereal.email',
        port: 587,
        auth: {
            user: 'ronny.von@ethereal.email',
            pass: 'QDksWEUxbfJcpqjwwt'
        },
        tls: {
            // do not fail on invalid certs
            rejectUnauthorized: false
        }
    });

    var mailOptions = {
        from: 'md.mamun@savethechildren.org',
        to: 'mamunmo21@gmail.com',
        subject: 'Sending Email using Node.js',
        text: 'That was easy!'
    };

    transporter.sendMail(mailOptions, function (error, info) {
        if (error) {
            console.log(error);
        } else {
            console.log('Email sent: ' + info.response);
        }
    });

}