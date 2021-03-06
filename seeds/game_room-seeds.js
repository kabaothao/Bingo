const { GameRoom } = require("../models");

const roomData = [
  {
    balls_drawn: "B1",
    is_gameover: 1,
    winner_id: 1,
    admin_id: 1,
  },
];

const seedRoom = () => GameRoom.bulkCreate(roomData);

module.exports = seedRoom;

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
