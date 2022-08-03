module.exports = (sequelize, Sequelize) => {
  const OauthClient = sequelize.define("oauth_client", {
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
    email: {
      type: Sequelize.STRING,
      allowNull: false,
      unique: {
        msg: 'This email is already taken.'
      },
      validate: {
        isEmail: {
          msg: 'Email address must be valid.'
        }
      },
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
  }, {
    tableName: 'oauth_clients',
    hooks: {
      beforeUpdate: (record, options) => {
        // record.dataValues.updatedAt = new Date().toISOString().replace(/T/, ' ').replace(/\..+/g, '');
      }
    }
  });


  OauthClient.beforeCreate(async (oauthClient) => {
    const records = await sequelize.query("SELECT (UUID()) as uuid");
    oauthClient.client_secret = records[0][0].uuid.split('-').join('');
  });

  OauthClient.beforeUpdate(async (oauthClient) => {
    // console.log("sssssssssssssss", oauthClient); to do for client_secret update
    // const records = await sequelize.query("SELECT (UUID()) as uuid");
    // oauthClient.client_secret = records[0][0].uuid.split('-').join('') ;
  });

  return OauthClient;
};
