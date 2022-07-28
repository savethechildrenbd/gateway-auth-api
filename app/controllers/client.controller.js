const db = require("../models");
const OauthClient = db.oauthClients;
const Op = db.Sequelize.Op;

// Create and Save a new OauthClient
exports.create = (req, res) => {
  // Validate request
  if (!req.body.name) {
    res.status(400).send({
      message: "name can not be empty!"
    });
    return;
  }

  // Create a OauthClient
  const client = {
    name: req.body.name,
    company: req.body.company,
    data_uris: req.body.data_uris,
    grants: req.body.grants,
    published: req.body.published ? req.body.published : false
  };

  // Save OauthClient in the database
  OauthClient.create(client)
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the OauthClient."
      });
    });
};

// Retrieve all Tutorials from the database.
exports.findAll = (req, res) => {
  const title = req.query.title;
  const condition = title ? { title: { [Op.like]: `%${title}%` } } : null;

  OauthClient.findAll({ where: condition })
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving tutorials."
      });
    });
};

// Find a single OauthClient with an id
exports.findOne = (req, res) => {
  const id = req.params.id;

  OauthClient.findByPk(id)
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message: "Error retrieving OauthClient with id=" + id
      });
    });
};

// Find a single OauthClient with an client_id
exports.findClient = async (client_id, client_secret) => {
  try {
    const client = await OauthClient.findOne({ where: { client_id: client_id, client_secret: client_secret } });
    if (client.uuid) {
      return { status: true, client }
    } else {
      return { status: false }
    }
  } catch (__) {
    return { status: false }
  }
};

// Update a OauthClient by the id in the request
exports.update = (req, res) => {
  const id = req.params.id;

  OauthClient.update(req.body, {
    where: { id: id }
  })
    .then(num => {
      if (num == 1) {
        res.send({
          message: "OauthClient was updated successfully."
        });
      } else {
        res.send({
          message: `Cannot update OauthClient with id=${id}. Maybe OauthClient was not found or req.body is empty!`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Error updating OauthClient with id=" + id
      });
    });
};

// Delete a OauthClient with the specified id in the request
exports.delete = (req, res) => {
  const id = req.params.id;

  OauthClient.destroy({
    where: { id: id }
  })
    .then(num => {
      if (num == 1) {
        res.send({
          message: "OauthClient was deleted successfully!"
        });
      } else {
        res.send({
          message: `Cannot delete OauthClient with id=${id}. Maybe OauthClient was not found!`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Could not delete OauthClient with id=" + id
      });
    });
};

// Delete all Tutorials from the database.
exports.deleteAll = (req, res) => {
  OauthClient.destroy({
    where: {},
    truncate: false
  })
    .then(nums => {
      res.send({ message: `${nums} Tutorials were deleted successfully!` });
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while removing all tutorials."
      });
    });
};

// find all published OauthClient
exports.findAllPublished = (req, res) => {
  OauthClient.findAll({ where: { published: true } })
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving tutorials."
      });
    });
};
