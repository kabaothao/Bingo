const numbers = new Set()
      .add("B1")
      .add("B2")
      .add("B3")
      .add("B4")
      .add("B5")
      .add("B6")
      .add("B7")
      .add("B8")
      .add("B9")
      .add("B10")
      .add("B11")
      .add("B12")
      .add("B13")
      .add("B14")
      .add("B15")
      .add("I16")
      .add("I17")
      .add("I18")
      .add("I19")
      .add("I20")
      .add("I21")
      .add("I22")
      .add("I23")
      .add("I24")
      .add("I25")
      .add("I26")
      .add("I27")
      .add("I28")
      .add("I29")
      .add("I30")
      .add("N31")
      .add("N32")
      .add("N33")
      .add("N35")
      .add("N35")
      .add("N36")
      .add("N37")
      .add("N38")
      .add("N39")
      .add("N40")
      .add("N41")
      .add("N42")
      .add("N43")
      .add("N44")
      .add("N45")
      .add("G46")
      .add("G47")
      .add("G48")
      .add("G49")
      .add("G50")
      .add("G51")
      .add("G52")
      .add("G53")
      .add("G54")
      .add("G55")
      .add("G56")
      .add("G57")
      .add("G58")
      .add("G59")
      .add("G60")
      .add("O61")
      .add("O62")
      .add("O63")
      .add("O64")
      .add("O65")
      .add("O66")
      .add("O67")
      .add("O68")
      .add("O69")
      .add("O70")
      .add("O71")
      .add("O72")
      .add("O73")
      .add("O74")
      .add("O75")
      const numbers = [1-75]
      let currentNumber = []
      let previousNumber = []
  
      $("#generateCardBtn").click(() => { function setGame() {
        console.log(currentNumber);
          currentNumber = Array.from(numbers);
          previousNumber = [];
          document.append('bingoCount').innerHTML = "Game time started";
      }
  
      function callNum() {
        var index = Math.floor(Math.random() * currentNumber.length);
        var remove = currentNumber.splice(index, 1);
        document.getElementById('bingoCount').innerHTML =  remove;
        previousNumber.push(remove);
      }
    })
  
      // We need these to check eith what users marked on their card 
      function numCalled() {
        var prevoutput = "";
        for (x = 0; x < previousNumber.length; x++) {
          prevoutput += `${previousNumber[x]}<br/>`;
        }
        // document.getElementById('numberscalled').innerHTML = prevoutput;
        // console.log("So far We called:", prevoutput);
      }
      drawnLast   : document.getElementById( 'bingoCount' )
  
  
  
    //   // To check if a winner is a winner, where "b" is what user has marked
    //   function arraysEqual(numCalled, b) {
    //       if (numCalled === b) return true;
    //       if (numCalled == null || b == null) return false;
    //       if (numCalled.length !== b.length) return false;
        
    //       // If you don't care about the order of the elements inside
    //       // the array, you should sort both arrays here.
    //       // Please note that calling sort on an array will modify that array.
    //       // you might want to clone your array first.
        
    //       for (var i = 0; i < numCalled.length; ++i) {
    //         if (numCalled[i] !== b[i]) return false;
    //       }
    //       return true;
    //     }
        
  
  
//   Create a "winners" array of all the possible winning combinations
  
//   Create a "selected" array, prepopulated with cell C3, since that's a freebie
  
//   Clear the "selected" array if someone opts to play again
  
//   Compare your "winners" array to your "selected" array and if there are 5 matches (all of the winning numbers) then alert that there's a winner. You'd obviously replace the alert with whatever action you wanted to take when there's a winner...
  
  
  
  
  
  
  
  
  var BINGO = BINGO || {};
  
  BINGO.ballCount;
  BINGO.ballsArr  = [];
  // BINGO.cardCells = document.getElementsByClassName( 'js-card-cell' );
  BINGO.domElems  = {
      drawButton  : document.getElementById( 'generateCardBtn' ),
      // drawHistory : document.getElementById( 'js-history' ),
      drawnLast   : document.getElementById( 'bingoCount' )
  };
  
  /******************************************************************************
   * POPULATE BALLS
   * Populates ballsArr[] with 75 balls ranging from B-1 to O-75.
  BINGO.populateBallsArray = () => {
    console.log(populateBallsArray);
  
    for ( let i = BINGO.ballCount; i >= 1; i-- ) {
  
        if ( i >= 1  && i <= 15 ) BINGO.ballsArr.push( 'B-' + i );
        if ( i >= 16 && i <= 30 ) BINGO.ballsArr.push( 'I-' + i );
        if ( i >= 31 && i <= 45 ) BINGO.ballsArr.push( 'N-' + i );
        if ( i >= 46 && i <= 60 ) BINGO.ballsArr.push( 'G-' + i );
        if ( i >= 61 && i <= 75 ) BINGO.ballsArr.push( 'O-' + i );
  
    }
  
  };
  (BINGO.init = () => {
  
    BINGO.ballCount = 75;
  
    BINGO.populateBallsArray();
    BINGO.addClassOnClick( BINGO.cardCells, 'marked' );
  
  })();
  //valid check
  BINGO.isValidNumber = ( num, arr = [] ) => {
  
    if ( !arr.includes( num ) ) {
  
        return true;
  
    } else {
  
        return false;
  
    }
  
  };
  
  //random number gen
  BINGO.generateRandomNumber = ( max, min = 0, arr = [] ) => {
  
    const _max = Math.floor( max );
    const _min = Math.ceil( min );
    const _arr = arr;
    // random number between and including range
    const _num = Math.floor( Math.random() * ( _max - _min + 1 ) ) + _min;
  
    // Make sure random number doesn't already exist in the array
    if ( BINGO.isValidNumber( _num, _arr ) ) {
  
        _arr.push( _num );
  
        return _num;
  
    } else {
  
        // recursive call if invalid
        return BINGO.generateRandomNumber( _max, _min, _arr );
  
    }
  
  };
  
  
  //BALL selector
  
  BINGO.randomBallSelector = () => {
  
    const _ballCount  = BINGO.ballsArr.length;
    const _randomBall = BINGO.generateRandomNumber( _ballCount - 1 );
  
    return BINGO.ballsArr[ _randomBall ];
  
  };
  
  /******************************************************************************
   * POP BALL
   * Receives a randomized ball number and removes it from ballsArr[].
   * @param  {String} ball  - randomized ball number from B-1 to O-75
   * @return {Object} BINGO - makes method chaining possible
   *****************************************************************************/
   BINGO.popBall = ball => {
  
    const _ballIndex = BINGO.ballsArr.indexOf( ball );
  
    if ( _ballIndex > -1 ) BINGO.ballsArr.splice( _ballIndex, 1 );
  
    return BINGO;
  
  };
  
  /******************************************************************************
  * UPDATE DRAW HISTORY
  * Receives a randomized ball number. Creates an 'li' that contains the
  * randomized ball number and appends it to the draw history in the DOM.
  * Also scrolls to the bottom of the list when a new ball is drawn.
  * @param  {String} ball  - randomized ball number from B-1 to O-75
  * @return {Object} BINGO - makes method chaining possible
  *****************************************************************************/
  // BINGO.updateDrawHistory = ball => {
  
  //   const _node     = document.createElement( 'li' );
  //   const _textnode = document.createTextNode( ball );
  
  //   // append ball number to 'li'
  //   _node.appendChild( _textnode );
  
  //   // update the DOM
  //   BINGO.domElems.drawHistory.appendChild( _node );
  
  //   // scroll to the bottom of the list in the DOM
  //   BINGO.domElems.drawHistory.scrollTop = BINGO.domElems.drawHistory.scrollHeight;
  
  //   return BINGO;
  
  // };
  
  /******************************************************************************
  * UPDATE LAST DRAWN
  * Receives a randomized ball number and updates the last drawn number in the
  * DOM.
  * @param  {String} ball  - randomized ball number from B-1 to O-75
  * @return {Object} BINGO - makes method chaining possible
  *****************************************************************************/
  BINGO.updateLastDrawn = ball => {
  
    BINGO.domElems.drawnLast.innerHTML = ball;
  
    return BINGO;
  
  };