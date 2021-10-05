const User = require("./User");
const GameRoom = require("./game_room");

// //create associations
// //users hasOne gameroom
// User.hasOne(GameRoom, {
//   foreignKey: "room_id",
// });

// //gameroom belongsTo user
// GameRoom.belongsTo(User, {
//   foreignKey: "room_id",
// });

// //gameroom hasmany user
// GameRoom.hasMany(User, {
//   foreignKey: "room_id",
// });


GameRoom.hasMany(User);
User.belongsTo(GameRoom, {
  foreignKey: "room_id",
});

module.exports = { User, GameRoom };



