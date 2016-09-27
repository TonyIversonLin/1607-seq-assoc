const db = require('./_db');
const User = require('./models/user');
const House = require('./models/house');
const Shower = require('./models/shower');
const Bathroom = require('./models/bathroom');
const UserShowers = require('./models/user-showers');

// belongsTo
// source is the entity (table) that gets information about the relationship
// user.getHouse(), user.setHouse(), user.removeHouse()
// no association methods on house instances
User.belongsTo(House);

// hasOne
// target is the entity (table) that gets information about the relationship
// house.getUser(), house.setUser(), house.removeUser()
// House.hasOne(User);

// hasMany
// target is the entity (table) that gets information about the relationship
// house.getUsers(), house.setUser[s](), house.addUser[s](), house.removeUser[s]()
// no associations methods on user instances
House.hasMany(User);

// houseId on bathroom rows/instances
// instance methods are on houses, not on the bathrooms
// house.getBathrooms(), house.setBathroom[s]()
House.hasMany(Bathroom);

// creates user_showers table
// which has showerId, userId
// shower.getUsers(), shower.setUsers()
Shower.belongsToMany(User, { through: 'user_showers' });
User.belongsToMany(Shower, { through: 'user_showers' });

Shower.belongsTo(Bathroom);
Bathroom.hasMany(Shower);

module.exports = db;