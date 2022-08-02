const db = require("../../models");

const jwtMiddleware = require("../../middlewares/jwt-token.middleware");

const OauthAdmin = db.oauthAdmin;
const Op = db.Sequelize.Op;


// Login Admin
exports.login = async (req, res) => {
  try {
    // Validate request
    if (!req.body.email) {
      res.json({
        status: false,
        message: "email can not be empty!"
      });
    }

    // Validate request
    if (!req.body.password) {
      res.json({
        status: false,
        message: "password can not be empty!"
      });
    }

    const admin = await OauthAdmin.findOne({ where: { email: req.body.email } });

    if (!admin) {
      res.json({ status: false, message: 'email is not valid' });
    }

    const isvalidPassword = await admin.validPassword(req.body.password);

    if (isvalidPassword == true) {
      const jwtToken = await jwtMiddleware.jwtTokenAdmin(admin);
      res.json(jwtToken);
    } else {
      res.json({ status: false, message: 'invalid email or password' });
    }
  } catch (error) {
    res.json({
      status: false,
      message: err.message || "Some error occurred while creating the User."
    });
  }
};


// Create and Save a new OauthClient
exports.create = (req, res) => {
  // Validate request
  if (!req.body.name) {
    res.status(400).send({
      message: "name can not be empty!"
    });
    return;
  }

  if (!req.body.email) {
    res.status(400).send({
      message: "email can not be empty!"
    });
    return;
  }

  // Create a OauthClient
  const client = {
    name: req.body.name,
    email: req.body.email,
    password: req.body.password,
    published: req.body.published ? req.body.published : false
  };

  // Save OauthClient in the database
  OauthAdmin.create(client)
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the Admin."
      });
    });
};


// Retrieve all Users from the database.
exports.findAll = (req, res) => {
  const email = req.query.email;
  const condition = email ? { email: { [Op.like]: `%${email}%` } } : null;

  OauthAdmin.findAll({ where: condition })
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving Users."
      });
    });
};

// Find a single OauthAdmin with an id
exports.findOne = (req, res) => {
  const id = req.params.id;

  OauthAdmin.findByPk(id)
    .then((user) => {
      res.send(user);
    })
    .catch(err => {
      res.status(500).send({
        message: "Error retrieving Admin with id=" + id
      });
    });
};

// Update a OauthAdmin by the id in the request
exports.update = (req, res) => {
  const id = req.params.id;

  OauthAdmin.update(req.body, {
    where: { id: id }
  })
    .then(num => {
      if (num == 1) {
        res.send({
          message: "OauthAdmin was updated successfully."
        });
      } else {
        res.send({
          message: `Cannot update Admin with id=${id}. Maybe OauthAdmin was not found or req.body is empty!`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Error updating Admin with id=" + id
      });
    });
};

// Delete a OauthAdmin with the specified id in the request
exports.delete = (req, res) => {
  const id = req.params.id;

  OauthAdmin.destroy({
    where: { id: id }
  })
    .then(num => {
      if (num == 1) {
        res.send({
          message: "OauthAdmin was deleted successfully!"
        });
      } else {
        res.send({
          message: `Cannot delete Admin with id=${id}. Maybe OauthAdmin was not found!`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Could not delete Admin with id=" + id
      });
    });
};

// Delete all Users from the database.
exports.deleteAll = (req, res) => {
  OauthAdmin.destroy({
    where: {},
    truncate: false
  })
    .then(nums => {
      res.send({ message: `${nums} Users were deleted successfully!` });
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while removing all Users."
      });
    });
};

// find all published OauthAdmin
exports.findAllPublished = (req, res) => {
  OauthAdmin.findAll({ where: { published: true } })
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving Users."
      });
    });
};
