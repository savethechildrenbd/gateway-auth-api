module.exports = (sequelize, Sequelize) => {
  const User = sequelize.define("user", {
    id: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    uuid: {
      type: Sequelize.UUID,
      defaultValue: Sequelize.UUIDV4,
      primaryKey: true,
      unique: true
    },
    client_id: {
      type: Sequelize.STRING,
    },
    email: {
      type: Sequelize.STRING,
      allowNull: false,
      unique: true
    },
    code: {
      type: Sequelize.STRING
    },
    provider: {
      type: Sequelize.STRING,
      defaultValue: 'local',
      allowNull: true,
    },
    avatar: {
      type: Sequelize.STRING,
      allowNull: true,
    },
    expire_at: {
      type: Sequelize.STRING
    },
    published: {
      type: Sequelize.BOOLEAN
    }
  });

  return User;
};
