var io;
var gameSocket;

/**
 * This function is called by index.js to initialize a new game instance.
 *
 * @param sio The Socket.IO library
 * @param socket The socket object for the connected client.
 */
exports.initGame = function (sio, socket) {
  io = sio;
  gameSocket = socket;
  gameSocket.emit("connected", { message: "You are connected!" });

  // Host Events
  gameSocket.on("hostCreateNewGame", hostCreateNewGame);
  // gameSocket.on('hostRoomFull', hostPrepareGame);
  gameSocket.on("hostCountdownFinished", hostStartGame);
  gameSocket.on("hostNextRound", hostNextRound);

  // Player Events
  gameSocket.on("playerJoinGame", playerJoinGame);
  gameSocket.on("playerAnswer", playerAnswer);
  gameSocket.on("playerRestart", playerRestart);
};

/* *******************************
 *                             *
 *       HOST FUNCTIONS        *
 *                             *
 ******************************* */

/**
 * The 'START' button was clicked and 'hostCreateNewGame' event occurred.
 */
<<<<<<< HEAD
 function hostCreateNewGame() {
    // Create a unique Socket.IO Room
    var thisGameId = ( Math.random() * 100000 ) | 0;

    // Return the Room ID (gameId) and the socket ID (mySocketId) to the browser client
    this.emit('newGameCreated', {gameId: thisGameId, mySocketId: this.id});

    // Join the Room and wait for the players
    this.join(thisGameId.toString());
};
=======
function hostCreateNewGame() {
  // Create a unique Socket.IO Room
  var thisGameId = (Math.random() * 100000) | 0;

  // Return the Room ID (gameId) and the socket ID (mySocketId) to the browser client
  this.emit("newGameCreated", { gameId: thisGameId, mySocketId: this.id });

  // Join the Room and wait for the players
  this.join(thisGameId.toString());
}

/*
 * Two players have joined. Alert the host!
 * @param gameId The game ID / room ID
 */
function hostPrepareGame(gameId) {
  var sock = this;
  var data = {
    mySocketId: sock.id,
    gameId: gameId,
  };
  //console.log("All Players Present. Preparing game...");
  io.sockets.in(data.gameId).emit("beginNewGame", data);
}
>>>>>>> f1babd293f58ae50af25a8f282a95a01b3ac169a

/*
 * The Countdown has finished, and the game begins!
 * @param gameId The game ID / room ID
 */
function hostStartGame(gameId) {
    console.log('Game Started!');
    sendWord(0,gameId);
};


/**
 * A player clicked the 'START GAME' button.
 * Attempt to connect them to the room that matches
 * the gameId entered by the player.
 * @param data Contains data entered via player's input - playerName and gameId.
 */
 function playerJoinGame(data) {
    //console.log('Player ' + data.playerName + 'attempting to join game: ' + data.gameId );

    // A reference to the player's Socket.IO socket object
    var sock = this;

    // Look up the room ID in the Socket.IO manager object.
    var room = gameSocket.manager.rooms["/" + data.gameId];

    // If the room exists...
    if( room != undefined ){
        // attach the socket id to the data object.
        data.mySocketId = sock.id;

        // Join the room
        sock.join(data.gameId);

        //console.log('Player ' + data.playerName + ' joining game: ' + data.gameId );

        // Emit an event notifying the clients that the player has joined the room.
        io.sockets.in(data.gameId).emit('playerJoinedRoom', data);

    } else {
        // Otherwise, send an error message back to the player.
        this.emit('error',{message: "This room does not exist."} );
    }
}





//  example of a listener 
// gameSocket.on('hostCreateNewGame', hostCreateNewGame); 

//  using an Express route to request the library files from the server 
{/* <script src="/socket.io/socket.io.js"></script> */}


//<script type=text/template"> 

// Enclosing function 
// function() {
//     IO { 
//     //  All code related to Socket.IO connections goes here. 
//     IO.socket = io.connect();
//     IO.socket.on('playerJoinedRoom', IO.playerJoinedRoom );
//     }

//     App {
//     // Generic game logic code.

//     Host {
//     // Game logic for the 'Host' (big) screen.
//     }

//     Player {
//     // Game logic specific to 'Player' screens.
//     }
//     }       
// } 

IO.init()
App.init() 


// create click handlers for the START and JOIN buttons that appear on the title screen.
App.$doc.on('click', '#btnStartGame', App.Host.onCreateClick);
App.$doc.on('click', '#btnJoinGame', App.Player.onJoinClick);
