module.exports = (sequelize, Sequelize) => {
  const User = sequelize.define("clint", {
    id: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    uuid: {
      type: Sequelize.UUID,
      defaultValue: Sequelize.UUIDV1,
      primaryKey: true,
      unique: true
    },
    name: {
      type: Sequelize.STRING,
    },
    company: {
      type: Sequelize.STRING,
    },
    client_id: {
      type: Sequelize.STRING,
      defaultValue: Sequelize.UUIDV4,
      allowNull: false,
      unique: true
    },
    client_secret: {
      type: Sequelize.STRING,
      defaultValue: Sequelize.UUIDV1,
      allowNull: false,
      unique: true
    },
    data_uris: {
      type: Sequelize.STRING,
      allowNull: true,
    },
    grants: {
      type: Sequelize.STRING
    },
    published: {
      type: Sequelize.BOOLEAN,
      defaultValue: 1,
    }
  });

  return User;
};
