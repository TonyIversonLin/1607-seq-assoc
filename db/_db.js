const Sequelize = require('sequelize');

const db = new Sequelize('showers', null, null, {
    dialect: 'postgres',
    hostname: '127.0.0.1', // or 'localhost',
    port: 5432
});

module.exports = db;