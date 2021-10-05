const { User } = require('../models');

const userData = [
    {   
        username: "Test",
        email: "test@test.com",
        password: "password123"
    }
]

const userSeed = () => User.bulkCreate(userData);

module.exports = userSeed;