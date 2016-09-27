const Sequelize = require('sequelize');
const db = require('../_db');

const required = (definition) => Object.assign(definition, { allowNull: false });

module.exports = db.define('house', {
    country: required({ type: Sequelize.STRING(3) }),
    city: required({ type: Sequelize.STRING }),
    zip: required({ type: Sequelize.STRING })
});