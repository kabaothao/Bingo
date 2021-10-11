const { Model, DataTypes } = require("sequelize");
const bcrypt = require("bcrypt");
const sequelize = require("../config/connection");

class GameRoom extends Model {}

GameRoom.init(
  {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    balls_drawn: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    is_gameover: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
    },
    winner: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    admin: {
      type: DataTypes.STRING,
      allowNull: true,
    },
  },
  {
    sequelize,
    timestamps: false,
    freezeTableName: true,
    underscored: true,
    modelName: "game_room",
  }
);

module.exports = GameRoom;
