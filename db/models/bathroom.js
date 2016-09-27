const Sequelize = require('sequelize');
const db = require('../_db');

module.exports = db.define('bathroom', {
   temperatureControlRating: {
       type: Sequelize.FLOAT,
       defaultValue: 2.5,
       validate: {
           min: 0,
           max: 5
       }
   }
});