const User = require("./User");
const GameRoom = require("./game_room");

//create associations

GameRoom.hasMany(User);

User.belongsTo(GameRoom, {
  foreignKey: "room_id",
});

module.exports = { User, GameRoom };



