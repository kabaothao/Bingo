const seedUser = require("./user-seeds");
const seedRoom = require("./game_room-seeds");

const sequelize = require("../config/connection");

const seedAll = async () => {
  await sequelize.sync({ force: true });
  console.log("\n----- DATABASE SYNCED -----\n");

  await seedUser();
  console.log("\n----- USER SEEDED -----\n");

  await seedRoom();
  console.log("\n----- GAME ROOM SEEDED -----\n");

  process.exit(0);
};

seedAll();
