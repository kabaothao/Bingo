const path = require("path");
const express = require("express");
const session = require("express-session");
const exphbs = require("express-handlebars");
const routes = require("./controllers");
// const helpers = require('./utils/helpers');
const hbs = exphbs.create({});
// const bingo = require("./bingo");

const sequelize = require("./config/connection");
const SequelizeStore = require("connect-session-sequelize")(session.Store);

const app = express();
const PORT = process.env.PORT || 3001;

// socket.io nonsense
const http = require("http");
const server = http.createServer(app);
const socket = require("socket.io");
const io = socket(server);
let users = [];
// let roomName = "";

io.on("connection", (socket) => {
  currentTime = 99;

  console.log("user connected on " + socket.id);
  // bingo.initGame(io, socket);

  socket.on("chat message", (msg) => {
    io.emit("chat message", msg);
    console.log("message: " + msg);
  });

  socket.on("join room", async (roomName) => {
    // console.log(roomName);
    socket.join(roomName);
    socket.on("current time", (data) => {
      currentTime = data;
      console.log(currentTime);
    });

    const clients = io.sockets.adapter.rooms.get(roomName);
    console.log(clients);
    var size = clients.size;
    console.log(size);

    if (size === 1) {
      await socket.emit("host", { boolean: true, message: "you're the host" });
      socket.emit("beginGame", { status: "game started" });
    } else {
      let startTime = 0;
      await socket.on("current time", (data) => {
        console.log(data);
        startTime = data;
      });
      await socket.emit("host", {
        boolean: false,
        message: "you're a player",
        startTime: currentTime,
      });
      socket.emit("beginGame", { status: "game started" });
    }
  });

  socket.on("disconnect", () => {
    console.log("user disconnected from " + socket.id);
  });
});

server.listen(PORT, () => {
  console.log(`listening on *:${PORT}`);
});
// end of socket.io nonsense

const sess = {
  secret: "Super secret secret",
  cookie: {},
  resave: false,
  saveUninitialized: true,
  store: new SequelizeStore({
    db: sequelize,
  }),
};

app.use(session(sess));

app.engine("handlebars", hbs.engine);
app.set("view engine", "handlebars");

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "public")));

app.use(routes);
