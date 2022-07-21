module.exports = (sequelize, Sequelize) => {
  const MondayCrm = sequelize.define("monday_crm", {
    id: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    subscriber_id: {
      type: Sequelize.STRING,
      unique: true
    },
    applicant_id: {
      type: Sequelize.STRING,
      allowNull: false,
      unique: true
    }
  });

  return MondayCrm;
};
