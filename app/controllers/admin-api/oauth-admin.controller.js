const db = require("../../models");

const jwtMiddleware = require("../../middlewares/jwt-token.middleware");

const constant = require("../../models/constants/pagination.constants");

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
  const admin = {
    name: req.body.name,
    email: req.body.email,
    client_id: req.body.client_id,
    role: req.body.role,
    password: req.body.password,
    published: req.body.published ? req.body.published : false
  };

  // Save OauthClient in the database
  OauthAdmin.create(admin)
    .then(data => {
      res.send({ status: true, data: data });
    })
    .catch(err => {
      res.status(500).send({
        status: false,
        message:
          err.message || "Some error occurred while creating the User."
      });
    });
};


// Retrieve all Users from the database.
exports.findAll = (req, res) => {
  const page = req.query.page || 1;

  const pageSize = constant.ITEMS_PER_PAGE;
  const offset = (page - 1) * pageSize;

  const email = req.query.email;
  const condition = email ? { email: { [Op.like]: `%${email}%` } } : null;

  OauthAdmin.findAndCountAll({
    where: condition,
    offset: offset,
    limit: pageSize,
  })
    .then(data => {
      res.send({ status: true, data: data });
    })
    .catch(err => {
      res.status(500).send({
        status: false,
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
      res.send({ status: true, data: user });
    })
    .catch(err => {
      res.status(500).send({
        message: "Error retrieving User with id=" + id
      });
    });
};

// Update a OauthAdmin by the id in the request
exports.update = (req, res) => {
  const id = req.params.id;

  const admin = {
    name: req.body.name,
    client_id: req.body.client_id,
    role: req.body.role,
    published: req.body.published ? req.body.published : false
  };


  OauthAdmin.update(admin, {
    where: { id: id }
  })
    .then(num => {
      if (num == 1) {
        res.send({
          status: true,
          message: "User was updated successfully."
        });
      } else {
        res.send({
          status: false,
          message: `Cannot update User with id=${id}. Maybe OauthAdmin was not found or req.body is empty!`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        status: false,
        message: "Error updating User with id=" + id
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
          status: true,
          message: "Users was deleted successfully!"
        });
      } else {
        res.send({
          status: false,
          message: `Cannot delete Admin with id=${id}. Maybe Users was not found!`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        status: false,
        message: "Could not delete User with id=" + id
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
      res.send({ status: true, message: `${nums} Users were deleted successfully!` });
    })
    .catch(err => {
      res.status(500).send({
        status: false,
        message:
          err.message || "Some error occurred while removing all Users."
      });
    });
};

// find all published OauthAdmin
exports.findAllPublished = (req, res) => {
  const id = req.params.id;
  const update = { published: req.body.published ? req.body.published : false };

  OauthAdmin.findAll(update, { where: { id: id } })
    .then(data => {
      res.send({ status: true, data: data });
    })
    .catch(err => {
      res.status(500).send({
        status: false,
        message:
          err.message || "Some error occurred while retrieving Users."
      });
    });
};
