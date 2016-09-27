const _ = require('lodash');
const faker = require('faker');
const Promise = require('bluebird');
const db = require('./db');
const User = db.model('user');
const House = db.model('house');
const Bathroom = db.model('bathroom');
const Shower = db.model('shower');

const createRawData = (amount, fields, fakerMethods) => {

    const fieldAndFaker = _.zip(fields, fakerMethods);

    return _.range(0, amount).map(() => {
        return fieldAndFaker.reduce((rawObj, fieldDef) => {
            const [fakerProp, fakerMethod] = fieldDef[1].split('.');
            rawObj[fieldDef[0]] = faker[fakerProp][fakerMethod]();
            return rawObj;
        }, {});
    });

};

const usersRaw = createRawData(
    100,
    ['firstName', 'lastName', 'username'],
    ['name.firstName', 'name.lastName', 'internet.userName']
);

const showersRaw = createRawData(
    200,
    ['date'],
    ['date.future']
).concat(createRawData(100, ['date'], ['date.past']));

const housesRaw = createRawData(
    30,
    ['country', 'city', 'zip'],
    ['address.countryCode', 'address.city', 'address.zipCode']
);

const bathroomsRaw = createRawData(
    60,
    [],
    []
);

db.sync({force: true})
    .then(() => {
        return Promise.map(housesRaw, house => House.create(house));
    })
    .then(() => {
        return Promise.map(usersRaw, user => User.create(user));
    })
    .then(() => {
        return Promise.map(bathroomsRaw, bathroom => Bathroom.create(bathroom));
    })
    .then(() => {
        return Promise.map(showersRaw, shower => Shower.create(shower));
    })
    .catch(console.error);