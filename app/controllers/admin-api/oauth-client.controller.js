const db = require("../../models");


const constant = require("../../models/constants/pagination.constants");

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

  if (!req.body.company) {
    res.status(400).send({
      message: "company can not be empty!"
    });
    return;
  }

  // Create a OauthClient
  const client = {
    name: req.body.name,
    company: req.body.company,
    email: req.body.email,
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

  const page = req.query.page || 1;

  const pageSize = parseInt(req.query.size, 10) || constant.ITEMS_PER_PAGE;
  const offset = (page) * pageSize;

  const query = req.query.query;
  const client_id = req.user.client_id;

  const condition = query ? { name: { [Op.like]: `%${query}%` } } : {};
  if (client_id) {
    condition.uuid = client_id;
  }

  OauthClient.findAndCountAll({
    where: condition,
    offset: offset,
    limit: pageSize,
  })
    .then(data => {
      res.json({ total_count: data ? data.count : 0, data: data ? data.rows : [] });
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
      res.send({ status: true, data: data });
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
    const client = await OauthClient.findOne({ where: { uuid: client_id, client_secret: client_secret } });
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

  // Validate request
  if (!req.body.name) {
    res.status(400).send({
      message: "name can not be empty!"
    });
    return;
  }

  if (!req.body.company) {
    res.status(400).send({
      message: "company can not be empty!"
    });
    return;
  }

  // Create a OauthClient
  const client = {
    name: req.body.name,
    company: req.body.company,
    data_uris: req.body.data_uris,
    grants: req.body.grants,
  };

  OauthClient.update(client, {
    where: { id: id }
  })
    .then(num => {
      if (num == 1) {
        res.send({
          status: true,
          message: "Client was updated successfully."
        });
      } else {
        res.send({
          status: false,
          message: `Cannot update Client with id=${id}. Maybe Client was not found or req.body is empty!`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        status: false,
        message: "Error updating Client with id=" + id
      });
    });
};

// Update a OauthClient by the id in the request
exports.resetClientSecret = (req, res) => {
  const id = req.params.id;

  OauthClient.update({
    where: { id: id }
  })
    .then(num => {
      if (num == 1) {
        res.send({
          status: true,
          message: "Client was updated successfully."
        });
      } else {
        res.send({
          status: false,
          message: `Cannot update Client with id=${id}. Maybe Client was not found or req.body is empty!`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        status: false,
        message: "Error updating Client with id=" + id
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
          status: true,
          message: "Client was deleted successfully!"
        });
      } else {
        res.send({
          status: false,
          message: `Cannot delete Client with id=${id}. Maybe Client was not found!`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        status: false,
        message: "Could not delete Client with id=" + id
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
      res.send({ status: true, message: `${nums} Clients were deleted successfully!` });
    })
    .catch(err => {
      res.status(500).send({
        status: false,
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
        status: false,
        message:
          err.message || "Some error occurred while retrieving tutorials."
      });
    });
};
