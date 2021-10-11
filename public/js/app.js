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
  console.log("Im in buildCard");
  $(".column").empty();

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
});

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
      rowNumbers.push("FREE");
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


chatSendBtn.addEventListener("click", function (e) {
  e.preventDefault();
  if (input.value) {
    socket.emit("chat message", input.value);
    input.value = "";
  }
});

socket.on("chat message", function (msg) {
  var item = document.createElement("li");
  item.textContent = msg;
  messages.appendChild(item);
  window.scrollTo(0, document.body.scrollHeight);
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

// socket.on("current time", function (data) {
//   console.log(data);
//   console.log(Player.hasStarted);
//   if (!Player.hasStarted) {
//     Player.startTime = data;
//     Player.hasStarted = true;
//   }
// });

var Host = {
  isHost: "",

  // socket.on("beginGame", onBeginGame),

  init: function () {
    Host.timer(99);
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
        // endGame();
      }
    }, 1000);
  },
  callBall: function() {

  //numbers array
  const numbers = [
    1, 2, 3, 4, 5, 6, 7, 8, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22,
    23, 24, 25, 26, 27, 28, 29, 30, 31, 32, 33, 34, 35, 36, 37, 38, 39, 40, 41,
    42, 43, 44, 45, 56, 57, 58, 59, 50, 51, 52, 53, 54, 55, 56, 57, 58, 59, 60,
    61, 62, 63, 64, 65, 66, 67, 68, 69, 70, 71, 72, 73, 74, 75,
  ];

  //random number generator
  function getRandomInt(numbers) {
    return Math.floor(Math.random() * 76);
  }

  let currentNumber = getRandomInt(numbers);

  switch (true) {
    case currentNumber <= 15 && currentNumber > 0:
      $("#bingoCount").append("B " + currentNumber);
      break;
    case currentNumber < 31:
      $("#bingoCount").append("I " + currentNumber);
      break;
    case currentNumber < 46:
      $("#bingoCount").append("N " + currentNumber);
      break;
    case currentNumber < 61:
      $("#bingoCount").append("G " + currentNumber);
      break;
    case currentNumber < 76:
      $("#bingoCount").append("O " + currentNumber);
      break;
    default:
      alert("Out of numbers");
      // console.log('default');
      break;
  }

  }
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
















// $(function() {
//   //array for all cards
//   var allCards = [[]];
//   // Set winning combinations to array
//   var winners = [
//       [0,6,12,18,19],
//       [4,8,12,16,20],
//       [0,1,2,3,4],
//       [5,6,7,8,9],
//       [10,11,12,13,14],
//       [15,16,17,18,19],
//       [20,21,22,23,24],
//       [0,5,10,15,20],
//       [1,6,11,16,21],
//       [2,7,12,17,22],
//       [3,8,13,18,23],
//       [4,9,14,19,24]
//   ];
//   var possibleWinners = winners.length;

//   // Initialize selected array with 12 freebie
//   var selected = ['12'];
//     // Push clicked object ID to 'selected' array
//     // selected.push($(this).attr('.number'));
//     // Compare winners array to selected array for matches
//     for(var i = 0; i < possibleWinners; i++) {
//         var cellExists = 0;

//         for(var j = 0; j < 5; j++) {
//             if($.inArray(winners[i][j], selected) > -1) {
//                 cellExists++;
//             }
//         }
//         // If all 5 winner cells exist in selected array alert success message
//         if(cellExists == 5) {
//             alert('Winner!');
//         }
//     };
//   // Count the number of squares clicked
//   $('.number').data('clicked', 0)
//       .click(function(){
//           var counter = $(this).data('clicked');
//           $(this).data('clicked', counter ++);
//           console.log(counter);
//       })
// });