var socket = io();

var cardNumbers = [];
var allCards = [];
let timeLeft = 0;
let roomName = "";

var messages = document.getElementById("messages");
var form = document.getElementById("form");
var input = document.getElementById("input");
var chatSendBtn = document.getElementById("sendChatBtn");
var logOutBtn = document.getElementById("logoutBtn");
var timerEl = document.getElementById("timer");

$("#joinRoomBtn").click((e) => {
  e.preventDefault();
  roomName = $("#roomNumberInput").val();
  socket.emit("join room", roomName);
});

$("#generateCardBtn").click(() => {
  // event.stopPropagation();
  getCard();
});

let getCard = function () {
  console.log("Im in buildCard");
  generateBingoCards();

  for (let i = 1; i < 5; i++) {
    let cardNumbers = generateCardNumbers();
    // console.log(cardNumbers);

    cardNumbers.forEach((e, index) => {
      console.log(index);
      switch (index) {
        case 0:
        case 5:
        case 10:
        case 15:
        case 20:
          console.log("#A" + i + "1");
          $("#B" + i + "1").append(
            "<div class='number col-" + index + "'><span>" + e + "</span></div>"
          );
          $(".number").click(function () {
            $(this).addClass("dobbed");
          });
          break;
        case 1:
        case 6:
        case 11:
        case 16:
        case 21:
          $("#I" + i + "2").append(
            "<div class='number col-" + index + "'><span>" + e + "</span></div>"
          );
          $(".number").click(function () {
            $(this).addClass("dobbed");
          });
          break;
        case 2:
        case 7:
        case 12:
        case 17:
        case 22:
          $("#N" + i + "3").append(
            "<div class='number col-" + index + "'><span>" + e + "</span></div>"
          );
          $(".number").click(function () {
            $(this).addClass("dobbed");
          });
          break;
        case 3:
        case 8:
        case 13:
        case 18:
        case 23:
          $("#G" + i + "4").append(
            "<div class='number col-" + index + "'><span>" + e + "</span></div>"
          );
          $(".number").click(function () {
            $(this).addClass("dobbed");
          });
          break;
        case 4:
        case 9:
        case 14:
        case 19:
        case 24:
          $("#O" + i + "5").append(
            "<div class='number col-" + index + "'><span>" + e + "</span></div>"
          );
          $(".number").click(function () {
            $(this).addClass("dobbed");
          });
          break;
        default:
          console.log("At default");
      }
    });
  }
};

let generateBingoCards = function () {
  let bingoCardEl = document.getElementById("bingo_card");
  bingoCardEl.innerHTML = "";
  for (let i = 1; i < 5; i++) {
    bingoCardEl.innerHTML += `
    <div id="bingo_card" class="grid grid-cols-5 mt-3 text-center mr-2">
        <div class="text-3xl font-bold ball red">B</div>
        <div class="text-3xl font-bold ball orange">I</div>
        <div class="text-3xl font-bold ball blue">N</div>
        <div class="text-3xl font-bold ball green">G</div>
        <div class="text-3xl font-bold ball purple">O</div>
        <div id="B${i}1"></div>
        <div id="I${i}2"></div>
        <div id="N${i}3"></div>
        <div id="G${i}4"></div>
        <div id="O${i}5"></div>
      </div>`;
  }
  document.getElementById("bingo_cards").style.opacity = 1;
};

const isDuplicate = (rowNumbers) => {
  for (let i = 0; i < rowNumbers.length; i++) {
    const duplicateCheck = cardNumbers.some((e) => {
      return e === rowNumbers[i];
    });

    if (duplicateCheck === true) {
      return duplicateCheck;
    }
  }
};

const generateCardNumbers = () => {
  cardNumbers = [];
  for (let i = 0; i < 5; i++) {
    let rowNumbers = [];

    rowNumbers.push(Math.floor(Math.random() * (15 - 1)) + 1);
    rowNumbers.push(Math.floor(Math.random() * (30 - 16)) + 16);
    if (i === 2) {
      rowNumbers.push(
        '<i style="font-size:1.5em;color:orangered" class="fa fa-star" aria-hidden="true"></i>'
      );
    } else {
      rowNumbers.push(Math.floor(Math.random() * (45 - 31)) + 31);
    }
    rowNumbers.push(Math.floor(Math.random() * (60 - 46)) + 46);
    rowNumbers.push(Math.floor(Math.random() * (75 - 61)) + 61);

    isDuplicate(rowNumbers)
      ? i--
      : rowNumbers.forEach((e) => {
          cardNumbers.push(e);
        });
    // console.log(cardNumbers);
  }
  allCards.push(cardNumbers);
  // console.log(all);
  return cardNumbers;
};

let winner = false;

//numbers array
const numbers = [
  1, 2, 3, 4, 5, 6, 7, 8, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22,
  23, 24, 25, 26, 27, 28, 29, 30, 31, 32, 33, 34, 35, 36, 37, 38, 39, 40, 41,
  42, 43, 44, 45, 56, 57, 58, 59, 50, 51, 52, 53, 54, 55, 56, 57, 58, 59, 60,
  61, 62, 63, 64, 65, 66, 67, 68, 69, 70, 71, 72, 73, 74, 75,
];

// chatSendBtn.addEventListener("click", function (e) {
//   e.preventDefault();
//   if (input.value) {
//     socket.emit("chat message", input.value);
//     input.value = "";
//   }
// });

// socket.on("chat message", function (msg) {
//   var item = document.createElement("li");
//   item.textContent = msg;
//   messages.appendChild(item);
//   window.scrollTo(0, document.body.scrollHeight);
// });
var messages = document.getElementById("messages");
var closeBtn = document.getElementById("closeBtn");
var showComments = document.getElementById("showComments");
var form = document.getElementById("form");
var input = document.getElementById("input");

form.addEventListener("submit", function (e) {
  e.preventDefault();
  if (input.value) {
    socket.emit("chat message", input.value);
    input.value = "";
    messages.style.display = "inherit";
  }
});

socket.on("chat message", function (msg) {
  var item = document.createElement("li");
  item.textContent = msg;
  messages.appendChild(item);
  messages.scrollTo(0, document.body.scrollHeight);
  messages.style.display = "inherit";
});

closeBtn.addEventListener("click", function () {
  messages.style.display = "none";
});

showComments.addEventListener("click", function () {
  messages.style.display = "inherit";
});

socket.on("host", (data) => {
  console.log(data);
  if (data.boolean) {
    Host.isHost = data.boolean;
  }
  if (!data.boolean) {
    console.log("is player!!!!!");
    Player.isPlayer = true;
    Player.hasStarted = true;
    Player.startTime = data.startTime;
    console.log(Player.startTime);
  }
  // console.log(Host.isHost);
});

socket.on("beginGame", (data) => {
  console.log(data);
  if (Host.isHost === true) {
    console.log(Host.isHost);
    Host.init();
    // io.to(roomName).emit();
  } else {
    console.log("in else", data);

    Player.init();
  }
});

var Host = {
  isHost: "",

  init: function () {
    Host.timer(60);
    while()
  },

  timer: function (time) {
    timeLeft = time;
    console.log(time);
    timer = setInterval(function () {
      if (timeLeft > 0) {
        timeLeft--;
        timerEl.textContent = "00:" + timeLeft;
        socket.emit("current time", timeLeft);
      } else {
        timerEl.textContent = "00:00";
        clearInterval(Host.timer);
        Host.callBall();
      }
    }, 1000);
  },
};

//player frelated functions
var Player = {
  isPlayer: "",
  hasStarted: false,
  startTime: 0,

  init: function () {
    console.log(Player.startTime);
    Player.timer(Player.startTime);
  },

  timer: function (time) {
    timeLeft = time;
    console.log(time);
    timer = setInterval(function () {
      if (timeLeft > 0) {
        timeLeft--;
        timerEl.textContent = "00:" + timeLeft;
        // socket.emit("current time", timeLeft);
      } else {
        timerEl.textContent = "00:00";
        clearInterval(Host.timer);
        // endGame();
      }
    }, 1000);
  },

  // getTime:
};
