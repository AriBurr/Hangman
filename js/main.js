$(document).ready(function(){
  start();
});

function displayChars(key){
  //grab each character from keyword
  key.forEach(function(val){
    //the divs to be displayed
    var divDisplay = "<div class='divDisplay'><span class='fontDisplay'>" + val + "</span></div>";
    //insert into each div
    $("#display-key-word").append(divDisplay);
  });
}

function guessAction(key){

  var guessRightCounter = 0;
  var guessWrongCounter = 0;

  //when guess button is clicked
  $("#submit-guess").on("click", function(e){
    var guess = $("#guess").val();
    e.preventDefault();

    //function call checks if guess is correct
    array = guessCheck(guess, key);
    //loops through the correctly guessed array of indexes
    array.forEach(function(val){
      //takes index and shows corresponding div
      $("#display-key-word div:nth-child(" + (val + 1) + ")").children().removeClass("fontDisplay");
      $("#win-lose").html("<h1> Got one! </h1>");
      guessRightCounter++;
      win(guessRightCounter);
    });
    //checking if there where any correct guesses
    if(array.length === 0){
      //function that displays wrong counter
      $(".hang-wrapper div:nth-of-type(" + (guessWrongCounter + 1) + ")").removeClass("incorrect-guess");
      //if wrong than
      $("#win-lose").html("<h1> Try again! </h1>");
      guessWrongCounter++;
      lose(guessWrongCounter);
    }

    $("#guess").val("");

  });

}

//checks if guess is inside key, if so, returns array of indexes that correspond to keyword
function guessCheck(guess, key){
  indexKey = [];
  key.forEach(function(val, index){
    if(guess === val){
      indexKey.push(index);
    }
  });
  return indexKey;
}

function lose(guessWrong){
  if(guessWrong === 6){
    $("#win-lose").html("<h1> You lose! </h1>");
  }
}

function win(guessRight){
  if(guessRight === keywordChars.length){
    $("#win-lose").html("<h1> You win! </h1>");
  }
}

function reset(){
  $("#reset").on("click", function(e){
    start();
  });
}

function start(){
  $.get( "http://setgetgo.com/randomword/get.php", function( data ) {
    var word = data;
    keywordChars =  word.split("");
    displayChars(keywordChars);
    guessAction(keywordChars);
  });
}
