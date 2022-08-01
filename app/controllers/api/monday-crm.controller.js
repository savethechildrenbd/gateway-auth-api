const db = require("../../models");

const MondayCrm = db.mondayCrm;

// Create and Save a new MondayCrm
exports.create = (req, res) => {

  // Validate request
  if (!req.body.applicant_id) {
    res.status(400).send({
      status: false,
      message: "Content can not be empty!"
    });
    return;
  }

  // // Create a MondayCrm
  const crm = { applicant_id: req.body.applicant_id, subscriber_id: req.user.sub };
  
  // Save MondayCrm in the database
  MondayCrm.create(crm)
    .then(data => {
      res.json({ status: true, crm_id: data.applicant_id });
    })
    .catch(err => {
      res.status(500).send({
        status: false,
        message:
          err.message || "Some error occurred while creating the MondayCrm."
      });
    });
};


// Find a single MondayCrm with an id
exports.findOne = (req, res) => {
  const id = req.user.sub;

  MondayCrm.findOne({ where: { subscriber_id: id } })
    .then(data => {
      res.json({ status: true, crm_id: data.applicant_id });
    })
    .catch(err => {
      res.status(500).send({
        status: false,
        message: "Error retrieving MondayCrm with id=" + id
      });
    });
};

