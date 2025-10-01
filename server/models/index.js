'use strict';

const fs = require('fs');
const path = require('path');
const Sequelize = require('sequelize');
const process = require('process');
const basename = path.basename(__filename);
const env = process.env.NODE_ENV || 'development';
const db = {};

// Load config.json as fallback
const configJson = require(__dirname + '/../config/config.json')[env];

// Create config object from environment variables
const config = {
  username: process.env.DATABASE_ROOT_USER || configJson.username,
  password: process.env.DATABASE_ROOT_PASSWORD || configJson.password,
  database: process.env.DATABASE_NAME || configJson.database,
  host: process.env.DATABASE_HOST || configJson.host,
  dialect: process.env.DATABASE_DIALECT || configJson.dialect,
  port: process.env.DATABASE_PORT ? parseInt(process.env.DATABASE_PORT, 10) : configJson.port,
};

// Adjust username/password per environment
if (env === 'test') {
  config.username = process.env.DATABASE_TEST_USER || configJson.username;
  config.password = process.env.DATABASE_TEST_PASSWORD || configJson.password;
} else if (env === 'production') {
  config.username = process.env.DATABASE_PROD_USER || configJson.username;
  config.password = process.env.DATABASE_PROD_PASSWORD || configJson.password;
}

let sequelize;
sequelize = new Sequelize(config.database, config.username, config.password, config);

fs
  .readdirSync(__dirname)
  .filter(file => {
    return (
      file.indexOf('.') !== 0 &&
      file !== basename &&
      file.slice(-3) === '.js' &&
      file.indexOf('.test.js') === -1
    );
  })
  .forEach(file => {
    const model = require(path.join(__dirname, file))(sequelize, Sequelize.DataTypes);
    db[model.name] = model;
  });

Object.keys(db).forEach(modelName => {
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
});

db.sequelize = sequelize;
db.Sequelize = Sequelize;

module.exports = db;
