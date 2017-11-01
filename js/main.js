$(document).ready(function(){
  //keyword fits with 14 characters without overflow
  keyword = "constantinple"
  keyword_chars = keyword.split("");
  var wrong_counter = 0;
  display_chars(keyword_chars);
  guess_action(keyword_chars, wrong_counter);
});



function display_chars(key){
  //grab each character from keyword
  key.forEach(function(val){
    //the divs to be displayed
    var divDisplay = "<div class='divDisplay'><span class='fontDisplay'>" + val + "</span></div>";
    //insert into each div
    $("#display-key-word").append(divDisplay);
  });
}

function guess_action(key, wrong){
  //when guess button is clicked
  $("#submit-guess").on("click", function(e){
    var guess = $("#guess").val();
    e.preventDefault();

    //function call checks if guess is correct
    array = guess_check(guess, key);

    //loops through the correctly guessed array of indexes
    array.forEach(function(val){
      //takes index and shows corresponding div
      $("#display-key-word div:nth-child(" + (val + 1) + ")").children().removeClass("fontDisplay");
    });
    //checking if there where any correct guesses
    if(array.length === 0){
      //function that displays wrong counter
      $(".hang-wrapper div:nth-of-type(" + (wrong + 1) + ")").removeClass("incorrect-guess");
      //if wrong than
      wrong++;
    }

    $("#guess").val("");
  });

}

//checks if guess is inside key, if so, returns array of indexes that correspond to keyword
function guess_check(guess, key){
  index_key = [];
  key.forEach(function(val, index){
    if(guess === val){
      index_key.push(index);
    }
  });
  return index_key;
}

function lose(wrong){
  if(wrong >= 6){
    alert("You lose!");
  }
}
