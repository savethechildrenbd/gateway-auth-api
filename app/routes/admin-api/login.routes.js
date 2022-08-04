module.exports = app => {
    const admins = require("../../controllers/admin-api/oauth-admin.controller");

    let router = require("express").Router();

    // Create a new Tutorial
    router.post("/", admins.login);

    // Retrieve all admins
    router.get("/", async function (req, res) {
        res.send({
            status: false,
            message: "Some error occurred while retrieving token id!"
        });
    });

    app.use('/admin/api/v1/login', router);
};
