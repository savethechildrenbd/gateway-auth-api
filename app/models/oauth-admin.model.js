const bcrypt = require("bcrypt");

module.exports = (sequelize, Sequelize) => {
  const Admin = sequelize.define("oauth_admins", {
    id: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    name: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    email: {
      type: Sequelize.STRING,
      allowNull: false,
      primaryKey: true,
      unique: {
        msg: 'This email is already taken.'
      },
      validate: {
        isEmail: {
          msg: 'Email address must be valid.'
        }
      },
    },
    client_id: {
      type: Sequelize.STRING,
      allowNull: true,
    },
    role: {
      type: Sequelize.STRING,
      allowNull: true,
    },
    password: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    avatar: {
      type: Sequelize.STRING,
      allowNull: true,
    },
    published: {
      type: Sequelize.BOOLEAN
    }
  }, {
    freezeTableName: true,
  });

  Admin.prototype.generateHash = async (password) => {
    return bcrypt.hash(password, bcrypt.genSaltSync(8));
  };

  Admin.prototype.validPassword = async function(password) {
    return await bcrypt.compare(password, this.password);
  };

  Admin.beforeCreate(async (admin) => {
    admin.password = await admin.generateHash(admin.password);
  });

  return Admin;
};
