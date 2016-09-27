const Sequelize = require('sequelize');
const db = require('../_db');

module.exports = db.define('shower', {
    date: {
        type: Sequelize.DATE,
        defaultValue: () => Date.now()
    }
}, {
    timestamps: false
});