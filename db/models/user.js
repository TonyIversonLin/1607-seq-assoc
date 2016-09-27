const Sequelize = require('sequelize');
const db = require('../_db');

module.exports = db.define('user', {
    username: {
        type: Sequelize.STRING,
        allowNull: false
    },
    firstName: {
        type: Sequelize.STRING,
        allowNull: false
    },
    lastName: {
        type: Sequelize.STRING,
        allowNull: false
    }
});