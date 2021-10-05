//Coordination of seeds files
const sequelize = require('../config/connection');

const userSeed = require('./userSeed');

const seedDatabase = async () => {
    await sequelize.sync({ force: true });
       
    await userSeed();
    console.log('users are SECCESSFULY seeded')

    process.exit(0);
};

seedDatabase();