const jwt = require('jsonwebtoken');

// create jwt token
exports.jwtToken = async (user) => {

    const sessionSecret = process.env.SESSION_SECRET;
    const ACCESS_TOKEN_EXPIRY_DAY = process.env.ACCESS_TOKEN_EXPIRY_DAY;

    const userPayload = { sub: user.uuid, email: user.email }

    const token = jwt.sign(userPayload, sessionSecret, { expiresIn: 60 * 60 * 24 * ACCESS_TOKEN_EXPIRY_DAY });
    return { status: true, accessToken: token };
};

// create jwt token
exports.jwtTokenAdmin = async (user) => {

    const sessionSecret = process.env.SESSION_SECRET_ADMIN;
    const ACCESS_TOKEN_EXPIRY_DAY = process.env.ACCESS_TOKEN_EXPIRY_DAY;
    const userAdmin = { id: user.id, email: user.email, name: user.name, client_id: user.client_id, client_id: user.client_id }
    const userPayload = userAdmin;
    userPayload.role = user.role;

    const token = jwt.sign(userPayload, sessionSecret, { expiresIn: 60 * 60 * 24 * ACCESS_TOKEN_EXPIRY_DAY });
    return { status: true, user: userAdmin, accessToken: token };
};

