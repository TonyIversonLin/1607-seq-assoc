const Sequelize = require('sequelize');
const db = require('../_db');

module.exports = db.define('user_showers', {
    rating: Sequelize.INTEGER
});