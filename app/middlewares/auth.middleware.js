const jwt = require('jsonwebtoken');

exports.userAuth = (req, res, next) => {
    const bearer = req.headers['authorization'];
    const token = bearer && bearer.substring(7);

    if (token) {
        jwt.verify(token, process.env.SESSION_SECRET, function (err, decoded) {
            if (err) {
                // console.log('err: ', err);
                res.status(401); // Unauthorized
                return res.json({ success: false, message: "Access token is unauthorized" });
            } else {
                const user = decoded;
                req.user = user;
                next();
            }
        });
    } else {
        res.status(403); // Access Forbidden
        return res.json({ success: false, message: "Access forbidden, login using valid token" });
    }
}