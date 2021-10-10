const path = require("path");
const express = require("express");
const session = require("express-session");
const exphbs = require("express-handlebars");
const routes = require("./controllers");
// const helpers = require('./utils/helpers');
const hbs = exphbs.create({ });
// const bingo = require("./bingo");

const sequelize = require("./config/connection");
const SequelizeStore = require("connect-session-sequelize")(session.Store);

const app = express();
const PORT = process.env.PORT || 3001;

// socket.io nonsense
const http = require("http");
const server = http.createServer(app);
const socketio = require("socket.io");
const io = socketio(server);

io.sockets.on("connection", (socket) => {
  console.log("user connected on " + socket.id);
  // bingo.initGame(io, socket);
  socket.on("chat message", (msg) => {
    socket.emit("chat message", msg);
    console.log("message: " + msg);
  });
  socket.on("disconnect", () => {
    console.log("user disconnected from " +socket.id);

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

// sequelize.sync({ force: false }).then(() => {
//   app.listen(PORT, () => console.log("Now listening"));
// });
