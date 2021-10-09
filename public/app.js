var IO = {
    /**
     * This is called when the page is displayed. It connects the Socket.IO client
     * to the Socket.IO server
     */
    init: function() {
        IO.socket = io.connect();
        IO.bindEvents();
    },

     /**
         * While connected, Socket.IO will listen to the following events emitted
         * by the Socket.IO server, then run the appropriate function.
         */
      bindEvents : function() {
        IO.socket.on('connected', IO.onConnected );
        IO.socket.on('newGameCreated', IO.onNewGameCreated );
        IO.socket.on('playerJoinedRoom', IO.playerJoinedRoom );
        IO.socket.on('beginNewGame', IO.beginNewGame );
        // IO.socket.on('gameOver', IO.gameOver);
        // IO.socket.on('error', IO.error );
    },

    /**
         * The client is successfully connected!
         */
     onConnected : function() {
        // Cache a copy of the client's socket.IO session ID on the App
        App.mySocketId = IO.socket.socket.sessionid;
        // console.log(data.message);
    },

    /**
         * A new game has been created and a random game ID has been generated.
         * @param data {{ gameId: int, mySocketId: * }}
         */
     onNewGameCreated : function(data) {
        App.Host.gameInit(data);
    },

    /**
     * A player has successfully joined the game.
     * @param data {{playerName: string, gameId: int, mySocketId: int}}
     */
    playerJoinedRoom : function(data) {
        // When a player joins a room, do the updateWaitingScreen funciton.
        // There are two versions of this function: one for the 'host' and
        // another for the 'player'.
        //
        // So on the 'host' browser window, the App.Host.updateWiatingScreen function is called.
        // And on the player's browser, App.Player.updateWaitingScreen is called.
        App[App.myRole].updateWaitingScreen(data);
    },

     /**
         * An error has occurred.
         * @param data
         */
      error : function(data) {
        alert(data.message);
    }

};


var App = {

    /**
     * Keep track of the gameId, which is identical to the ID
     * of the Socket.IO Room used for the players and host to communicate
     *
     */
    gameId: 0,

    /**
     * This is used to differentiate between 'Host' and 'Player' browsers.
     */
    myRole: '',   // 'Player' or 'Host'

    /**
     * The Socket.IO socket object identifier. This is unique for
     * each player and host. It is generated when the browser initially
     * connects to the server when the page loads for the first time.
     */
    mySocketId: '',


    /* *************************************
     *                Setup                *
     * *********************************** */

    /**
     * This runs when the page initially loads.
     */
    init: function () {
        App.cacheElements();
        App.showInitScreen();
        App.bindEvents();

        // Initialize the fastclick library
        // FastClick.attach(document.body);????????????????????????????????????????????
    },

    /**
         * Create references to on-screen elements used throughout the game.
         */
    //  cacheElements: function () {
    //     App.$doc = $(document);

        // Templates
        // App.$gameArea = $('#gameArea');
        // App.$templateIntroScreen = $('#intro-screen-template').html();
        // App.$templateNewGame = $('#create-game-template').html();
        // App.$templateJoinGame = $('#join-game-template').html();
        // App.$hostGame = $('#host-game-template').html();
    // },

 /**
         * Create some click handlers for the various buttons that appear on-screen.
         */
  bindEvents: function () {
    // Host
    App.$doc.on('click', '#btnCreateGame', App.Host.onCreateClick);

    // Player
    App.$doc.on('click', '#btnJoinGame', App.Player.onJoinClick);
    App.$doc.on('click', '#btnStart',App.Player.onPlayerStartClick);
},

// /**
//          * Show the initial Anagrammatix Title Screen
//          * (with Start and Join buttons)
//          */
//  showInitScreen: function() {
//     App.$gameArea.html(App.$templateIntroScreen);
//     App.doTextFit('.title');
// },


 /* *******************************
           *         HOST CODE           *
           ******************************* */
 Host : {

    /**
     * Contains references to player data
     */
    players : [],

    /**
     * Flag to indicate if a new game is starting.
     * This is used after the first game ends, and players initiate a new game
     * without refreshing the browser windows.
     */
    isNewGame : false,

    /**
     * Keep track of the number of players that have joined the game.
     */
    numPlayersInRoom: 0,


    /**
     * Handler for the "Start" button on the Title Screen.
     */
    onCreateClick: function () {
        // console.log('Clicked "Create A Game"');
        IO.socket.emit('hostCreateNewGame');
    },
}
}

   

IO.init();
App.init();


