const { User } = require("../models");

const userData = [
  {
    username: "joe",
    password: "12345678",
    room_id: 1,
  },
];

const seedUser = () => User.bulkCreate(userData);

module.exports = seedUser;

// -- CREATE TABLE user (
//     --     id INT AUTO_INCREMENT PRIMARY KEY NOT NULL,
//     --     username VARCHAR (255),
//     --     password VARCHAR (255),
//     --     room_id INT,
//     --     FOREIGN KEY room_id REFERENCES game_room(id)
//     -- )

//     -- CREATE TABLE game_room (
//     --     id INT AUTO_INCREMENT PRIMARY KEY NOT NULL,
//     --     balls_drawn VARCHAR,
//     --     is_gameover BIT,
//     --     winner_id INT,
//     --     admin_id INT,
//     -- )
