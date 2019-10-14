const app = {
    dartValue: null,
    targetValue: null,
    numberOfPlayers: 1,
    currentPlayer: 0,
    throwsRemaining: 3,
    targetValuePressed: false,
    gameStart: false,
    gameOver: false,
    undoModalOpen: false,
    players: [  
    {
      20: 0,
      19: 0,
      18: 0,
      17: 0,
      16: 0,
      15: 0,
      25: 0,
      score: 0
      
    },
      {
      20: 0,
      19: 0,
      18: 0,
      17: 0,
      16: 0,
      15: 0,
      25: 0,
      score: 0
    },
    {
      20: 0,
      19: 0,
      18: 0,
      17: 0,
      16: 0,
      15: 0,
      25: 0,
      score: 0
    },
    {
      20: 0,
      19: 0,
      18: 0,
      17: 0,
      16: 0,
      15: 0,
      25: 0,
      score: 0
    }],
    
    previousScores: [], // For "undo" button
    previousDartThrown: [],
    
    onTwenty() {

        if (!this.targetValuePressed) {
            return;
        }
        this.dartValue = 20;
        this.doScoring();
      // counter goes up, once it hits 3, reset to zero and switch player 



      if (this.targetValuePress) {} //what if someone hits a score before hitting a target value? 
      
    },
    onNineteen() {
        if (!this.targetValuePressed) {
            return;
        }
        this.dartValue = 19;
        this.doScoring();
        
    },
    onEighteen() {
        if (!this.targetValuePressed) {
            return;
        }
        this.dartValue = 18;
        this.doScoring();
    },

    onSeventeen() {
        if (!this.targetValuePressed) {
            return;
        }
        this.dartValue = 17;
        this.doScoring();
    },

    onSixteen() {
        if (!this.targetValuePressed) {
            return;
        }
        this.dartValue = 16;
        this.doScoring();
    },

    onFifteen() {
        if (!this.targetValuePressed) {
            return;
        }
        this.dartValue = 15;
        this.doScoring();
    },

    onBull() {

        if (this.targetValue === 3 || !this.targetValuePressed) {  // Prevents "triple" bullseye which isn't possible in game
            this.targetValuePressed = false;
            return;
        }

        this.dartValue = 25;
        this.doScoring();
    },
    
    onTrip() {
        if (!this.targetValuePressed) {
            return;
        }
        this.dartValue = T;
        this.doScoring();
    },
 /* 
    onSingle() {
        if (!this.gameStart) {
            return;
        }
        this.targetValue = 1;
        this.targetValuePressed = true;
    },
  
    onDouble() {
        if (!this.gameStart) {
            return;
        }
        this.targetValue = 2;
        this.targetValuePressed = true;
    },
  
    onTriple() {
        if (!this.gameStart) {
            return;
        }
        this.targetValue = 3;
        this.targetValuePressed = true;
    },
    
    */
    doScoring() {                   // Example: 40 + 60 = 100; Take the remainder and then reset to max value and point other players. 
        this.players[this.currentPlayer][this.dartValue] = (this.players[this.currentPlayer][this.dartValue] + (this.targetValue * this.dartValue));
        let remainder = ((this.players[this.currentPlayer][this.dartValue]) - (this.dartValue * 3)); // Remainder of points to give to other players 
        
        
        this.updateDartboardView(this.dartValue, this.currentPlayer, this.players[this.currentPlayer][this.dartValue]);

        console.log(`Remainder: ${remainder}`)

        if (remainder > 0) {
            this.players[this.currentPlayer][this.dartValue] = (this.dartValue * 3); // Reset the current player's dart value to maximum
            

            // Point other players 
      
            for (let i = 0; i < this.numberOfPlayers; i++) { 
                if (i === this.currentPlayer) {
                } else if (this.players[i][this.dartValue] < (this.dartValue * 3)) { // if the opponents aren't closed, point them with remainder 
                    
                    this.players[i]['score'] = ((this.players[i]['score']) + (remainder));
                    
                    $("#player-" + (i + 1)).text(this.players[i]['score']) // Update Score View 
                    this.updateScoreView();

                }
            } 
        };  

        var audio = new Audio('./sounds/knob.ogg');
        audio.play();

        this.checkWin();

        console.log(this.players)

        this.previousDartThrown.push(this.dartValue);
        this.onDartScore();

    },

    updateScoreView() {
        for (let i = 0; i < this.numberOfPlayers; i++) {        
            $("#player-" + (i + 1)).text(this.players[i]['score']) // Update Score View 
        }
    }, 

    updateDartboardView(dartValue, playerNum, playerDartScore) {
        let player = 0;

                                                                                                                    /*
        This extra logic at the top here is chunky... but necessary. 
        The problem here is our array of players starts at 0, and the child elements to target start with 1.
        We also need to skip the 3rd child element since that is the column of numbers. 
        In hindsight, it would have been better to create an empty object in the players array to occupy index 0. 
                                                                                                                    */

        if (playerNum === 0) {
            player = 1;
        } else if (playerNum === 1) {
            player = 2;
        } else if (playerNum === 2) {
            player = 4;
        } else {
            player = 5;
        }

        if (playerDartScore  >= (dartValue * 3)) {

            $("#" + dartValue).find('td:nth-child' + '(' + player + ')').find('span').text('X');
            $("#" + dartValue).find('td:nth-child' + '(' + player + ')').find('span').addClass('number-circle number-circle-blue');

            
    
        } else if (playerDartScore  === (dartValue * 2)) {
    
            $("#" + dartValue).find('td:nth-child' + '(' + player + ')').find('span').text('X');
            $("#" + dartValue).find('td:nth-child' + '(' + player + ')').find('span').removeClass('number-circle number-circle-blue');
    
        } else if (playerDartScore  === dartValue) {
    
            $("#" + dartValue).find('td:nth-child' + '(' + player + ')').find('span').text('/');
            $("#" + dartValue).find('td:nth-child' + '(' + player + ')').find('span').removeClass('number-circle number-circle-blue');
    
        } else if (playerDartScore === 0) {
            $("#" + dartValue).find('td:nth-child' + '(' + player + ')').find('span').text('');
            $("#" + dartValue).find('td:nth-child' + '(' + player + ')').find('span').removeClass('number-circle number-circle-blue');
            
        } else {
    
            return;
    
        } 
    },

    onDartScore() {

        this.throwsRemaining--;
        
        if (this.throwsRemaining < 1) {
            this.nextPlayer();
        }
        this.targetValuePressed = false;

        // After a miss or dart throw, we must take a snapshot of the current game standings for use with the 'undo' feature
        // Since objects are assigned by reference, let's use JSON to skirt this issue. 

        let currentGameStats = JSON.stringify(this.players);
        this.previousScores.push(currentGameStats);

        console.log(this.previousScores)
        console.log(this.dartValue);
        console.log(this.previousDartThrown);
        $("#throws-left").text(this.throwsRemaining);
    },
    
    nextPlayer() {

        var audio = new Audio('./sounds/next-turn.ogg');
        audio.play();


        if (this.currentPlayer === (this.numberOfPlayers - 1)) {
            this.currentPlayer = 0;
        } else {
            this.currentPlayer++;
        }

        this.throwsRemaining = 3;
        this.updateActivePlayerCSS();

    },

    updateActivePlayerCSS() {
        
        for (let i = 1; i < 6; i++) {
            $('#player-box-' + i).removeClass('player-active'); // good
            $("table").find('th:nth-child(' + i + ')').removeClass('player-active-header');
            $("table").find('td:nth-child(' + i + ')').removeClass('player-active-board');
            $("table").find('tr:last-child td:nth-child(' + i + ')').removeClass('border-bottom');

        } 

        $('#player-box-' + (this.currentPlayer + 1)).addClass('player-active') // good 

        let player = this.currentPlayer 

        if (this.currentPlayer === 0) {
            player = 1;
        } else if (this.currentPlayer === 1) {
            player = 2;
        } else if (this.currentPlayer === 2) {
            player = 4;
        } else {
            player = 5;
        }
        
         $("table").find('th:nth-child(' + player + ')').addClass('player-active-header');
         $("table").find('td:nth-child(' + player + ')').addClass('player-active-board');
         $("table").find('tr:last-child td:nth-child(' + player + ')').addClass('border-bottom');

      $("table").find('.number-circle').removeClass('number-circle-blue');

      // current player
      $("table").find('td:nth-child' + '(' + player + ')').find('.number-circle').addClass('number-circle-blue');

    },

    onDartMiss() {
        if (!this.gameStart) {
            return;
        }
        var audio = new Audio('./sounds/miss.ogg');
        audio.play();
        
        this.previousDartThrown.push('miss');
        this.onDartScore();

        $("#throws-left").text(this.throwsRemaining);
    },


    checkWin() {

        let total = Object.values(this.players[this.currentPlayer]).reduce((a, b) => a + b); 

        total = total - this.players[this.currentPlayer]['score']; // need to omit 'score' property from total


        // If only 1 player 
        if (this.numberOfPlayers === 1 && total >= 390) {
            console.log(`${this.currentPlayer} Wins!`);
            $('.win-message').removeClass('hidden');
            this.gameOver = true;
            return;
         }

        let arrayOfScores = [];

        for (var i = 0; i < this.numberOfPlayers; i++) {
            if (i === this.currentPlayer) {
            } else {
                arrayOfScores.push(this.players[i]['score']);
            }
        }


        const allDartsClosed = ()  => {   

         let lowestScore = Math.min(...arrayOfScores);
         console.log(lowestScore)

         if (total >= 390 && this.players[this.currentPlayer]['score'] < lowestScore) {
            console.log(`${this.currentPlayer} Wins!`);
            $("#winner").text(`Player ${this.currentPlayer + 1} Wins!`);
            $(".win-message").removeClass('hidden')
            this.gameOver = true;

         }
        }

        allDartsClosed();

    },

  //   pickNumberOfPlayers() {
// 
//         if (!this.gameStart) {
//        
//             if (this.numberOfPlayers >= 4) {
//                 this.numberOfPlayers = 1;
//             } else {
//                 this.numberOfPlayers++
//             }
//             
//             $('.player-select-num').text(this.numberOfPlayers);
//             console.log(this.numberOfPlayers)
//         }
// 
//     },

    onUndoModal() {
        if (!this.undoModalOpen) {
            $(".undo-modal").removeClass('hidden'); // if not open, open it 
            this.undoModalOpen = true;
        }
        
        else {
            this.onUndoConfirm();
            $(".undo-modal").addClass('hidden'); // close after confirming 
            this.undoModalOpen = false;
        }
    },

    onUndoConfirm() {
        console.log('undo')
        let pastTurns = [];

        this.throwsRemaining++;
        if(this.throwsRemaining > 3) {
            this.currentPlayer--; 
            if (this.currentPlayer < 0) {
                this.currentPlayer = (this.numberOfPlayers - 1); // Once again, should have had an empty object to occupy player object at index 0 to avoid confusing logic.
            }
            this.throwsRemaining = 1;
        }

        $("#throws-left").text(this.throwsRemaining);
        
        // reload scores here


      this.players = JSON.parse(this.previousScores[(this.previousScores.length - 2)]);
      console.log("Current Player Array Scores:")
      console.log(this.players)
      this.previousScores.splice(-1,1) // very important to remove from array 
      console.log(this.previousDartThrown)


      // need to update the scores UI
      // need to keep track of previous dart value in array as well, slice it as well. 
      // for a miss, we'll avoid all of this

      let lastDartValue = this.previousDartThrown[(this.previousDartThrown.length - 1)];
      console.log(`last dart value is: ${lastDartValue}`)
      this.previousDartThrown.splice(-1, 1);
        console.log(this.previousDartThrown)
        this.updateActivePlayerCSS();


      if (lastDartValue != 'miss') {
        
        
        this.updateDartboardView(lastDartValue, this.currentPlayer, this.players[this.currentPlayer][lastDartValue]);
        this.updateActivePlayerCSS();
        this.updateScoreView();

        

            console.log(this.currentPlayer);
            console.log(this.throwsRemaining);
      }
    },

    playGame() {
        if (!this.gameStart) {
            $(".player-select").addClass('hidden');
            this.gameStart = true;
            this.previousScores.push(JSON.stringify(this.players)); // Start keeping track of previous scores for 'undo' feature

            $('#main-logo').addClass("flicker");
            setTimeout(() => {
                var audio = new Audio('./sounds/sizzle.wav');
                audio.play(); 
            }, 250)
            console.log('game started')
            console.log(this.numberOfPlayers)
        }

        if (this.gameStart && this.gameOver) {
            location.reload();                 // We'll just reset the JavaScript - maybe not elegant but a perfectly fine solution 
        }

        if (this.gameStart && this.undoModalOpen) {
            $(".undo-modal").addClass('hidden'); // close after canceling 'undo'
            this.undoModalOpen = false;
        }
     


    },

    setupInitialViewCSS() {
        $("table").find('th:nth-child(1)').addClass('player-active-header');
        $("table").find('td:nth-child(1)').addClass('player-active-board');
        $("table").find('tr:last-child td:nth-child(1)').addClass('border-bottom');
        
    },

    keyBoardEvents(e) {
        switch(e.keyCode) {
            case 98: 
                console.log('2 key pressed') // twenty
                this.onTwenty();
                break;
            case 105: 
                console.log('9 key pressed') // nineteen
                this.onNineteen();
                break;
            case 104: 
                console.log('8 key pressed') // eighteen 
                this.onEighteen();
                break;
            case 103: 
                console.log('7 key pressed') // seventeen
                this.onSeventeen();
                break;
            case 102: 
                console.log('6 key pressed') // sixteen
                this.onSixteen();
                break;
            case 101: 
                console.log('5 key pressed') // fifteen
                this.onFifteen(); 
                break;
            case 66:
                console.log('B key pressed') // bullseye
                this.onBull();
                break;
            case 84:
                console.log('T key pressed'); // triple
                this.onTriple();
                break;
            case 68:
                console.log('D key pressed'); // double 
                this.onDouble();
                break;
            case 83:
                console.log('S key pressed'); // single
                this.onSingle(); 
                break;
            case 80:
                console.log('P key pressed') // # of players select
                this.pickNumberOfPlayers();
                break;
            case 77:
                console.log('M key pressed') // miss
                this.onDartMiss();
                break;
            case 85: 
                console.log('U key pressed') // undo
                this.onUndoModal();
                break;
            case 89:
                console.log('Y key pressed') // start 
                this.playGame();
                break;
        }
    },
  
    cacheDOM() {
        this.twenty = document.getElementById("twenty");
        this.nineteen = document.getElementById("nineteen");
        this.eighteen = document.getElementById("eighteen");
        this.seventeen = document.getElementById("seventeen");
        this.sixteen = document.getElementById("sixteen");
        this.fifteen = document.getElementById("fifteen");
        this.bull = document.getElementById("bull-button");

        this.single = document.getElementById("single");
        this.double = document.getElementById("double");
        this.triple = document.getElementById("triple");

        this.miss = document.getElementById("miss");
        this.playerSelection = document.getElementById("playerSelection");
        this.onPlayGame = document.getElementById("play-game-button");
        this.undo = document.getElementById("undo-button");

    },
  
    bindEvents() {

        document.body.onkeyup = this.keyBoardEvents.bind(this); // Need to bind to the app object otherwise 'this' will point to the DOM


        /* 
        The following were uesd for onscreen controls while deving without the physical buttons
        Keeping them here for debugging purposes 

        this.twenty.onclick = this.onTwenty.bind(this);     
        this.nineteen.onclick = this.onNineteen.bind(this);
        this.eighteen.onclick = this.onEighteen.bind(this);
        this.seventeen.onclick = this.onSeventeen.bind(this);
        this.sixteen.onclick = this.onSixteen.bind(this);
        this.fifteen.onclick = this.onFifteen.bind(this);
        this.bull.onclick = this.onBull.bind(this);

        this.single.onclick = this.onSingle.bind(this);
        this.double.onclick = this.onDouble.bind(this);
        this.triple.onclick = this.onTriple.bind(this);

        this.miss.onclick = this.onDartMiss.bind(this);
        this.playerSelection.onclick = this.pickNumberOfPlayers.bind(this);
        this.onPlayGame.onclick = this.playGame.bind(this);
        this.undo.onclick = this.onUndoModal.bind(this);
        */

    },
  
    init() {
      this.cacheDOM();
      this.bindEvents();
      this.setupInitialViewCSS();
    }
  
  }
  
  app.init();
  

