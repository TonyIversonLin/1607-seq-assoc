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
        return fieldAndFaker.reduce((rawObj, [field, fakerProps]) => {
            const [fakerProp, fakerMethod] = fakerProps.split('.');
            rawObj[field] = faker[fakerProp][fakerMethod]();
            return rawObj;
        }, {});
    });

};

Array.prototype.mapMerge = function (fnProducesMergeObject) {
    return this.map(e => {
        return Object.assign({}, e, fnProducesMergeObject());
    })
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
        return Promise.map(housesRaw, House.create.bind(House));
    })
    .then((createdHouses) => {
        const usersWithHouse = usersRaw.mapMerge(() => ({ houseId: _.sample(createdHouses).id }));
        const bathroomsWithHouse = bathroomsRaw.mapMerge(() => ({ houseId: _.sample(createdHouses).id }));
        return Promise.all([
            Promise.map(usersWithHouse, User.create.bind(User)),
            Promise.map(bathroomsWithHouse, Bathroom.create.bind(Bathroom))
        ]);
    })
    .spread((createdUsers, createdBathrooms) => {

        const showersWithBathroom = showersRaw.mapMerge(() => ({ bathroomId: _.sample(createdBathrooms).id }));

        return Promise.map(showersWithBathroom, Shower.create.bind(Shower))
            .then(createdShowers => {
                return Promise.map(createdShowers, createdShower => {
                    const size = Math.random() > .2 ? 1 : 2;
                    const randomUsers = _.sampleSize(createdUsers, size).map(u => u.id);
                    return createdShower.setUsers(randomUsers);
                })
            });
    })
    .then(() => {
        console.log('Done!');
        process.kill(0);
    })
    .catch(console.error);