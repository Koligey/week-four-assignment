//This is the business logic

function Player(userName) {
  this.userName = userName;
  this.score = 0;
};


function Turn(player) {
  this.total = 0;
  this.randomNumber = 0;
  this.player = player;
};

Turn.prototype.diceRoller = function(playerOne, playerTwo) {
  var randomNumber = Math.floor(Math.random() * 6) + 1;
  this.total += randomNumber;

  if (randomNumber == 1) {
    this.total = 0;
    this.endTurn(playerOne, playerTWo);
    return randomNumber;
  }
  else {
    this.randomNumber += randomNumber;
    return randomNumber;
  };
};

Turn.prototype.endTurn = function(playerOne, playerTwo) {

  this.player.score += this.total;
  this.total = 0;
  this.randomNumber = 0;

  if (this.player == playerOne) {
    this.player = playerTwo;
    $("#playerOne").toggleClass("active");
    $("#playerTwo").toggleClass("active");
  }
  else if (this.player == playerTwo) {
    this.player = playerOne;
    $("#playerTwo").toggleClass("active");
    $("#playerOne").toggleClass("active");
  };
};


//This is the user interface:

$(document).ready(function() {
  var playerOne = new Player("Player One");
  var playerTwo = new Player("Player Two");

  var currentTurn = new Turn(playerOne);

  var total = currentTurn.total;

  $("#cumulative-total").text(total);


  $('#playerOne-score').text(playerOne.score);
  $('#playerTwo-score').text(playerTwo.score);

  $("form#dice-roll").submit(function(event) {
    event.preventDefault();

    var result = currentTurn.diceRoller(playerOne, playerTwo);

    $('#current-roll').text(result);

    $('#cumulative-total').text(currentTurn.total);

    if ((currentTurn.total + currentTurn.player.score) >= 100) {
      if (currentTurn.player == playerOne) {
        $('#playerOne-score').text(currentTurn.total + currentTurn.player.score);
        alert("Congratulations, Player 1!! You win!!!");
      }
      else if (currentTurn.player == playerTwo) {
        $('#playerTwo-score').text(currentTurn.total + currentTurn.player.score)
        alert("Congratulations, Player 2! You win!!!");
      };
    };
  });


  $("form#end-turn").submit(function(event) {
    event.preventDefault();

    currentTurn.endTurn(playerOne, playerTwo);

    $('#playerOne-score').text(playerOne.score);
    $('#playerTwo-score').text(playerTwo.score);

    $('#current-roll').text(currentTurn.randomNumber);
    $('#cumulative-total').text(currentTurn.total);
  });
});
