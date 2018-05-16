//List for all the functions
var symbols = ["fa-diamond","fa-paper-plane-o","fa-anchor","fa-bolt","fa-cube","fa-anchor","fa-leaf","fa-bicycle","fa-diamond","fa-bomb","fa-leaf","fa-bomb","fa-bolt","fa-bicycle","fa-paper-plane-o","fa-cube"];

// Variable for move counter
var numberOfMoves = 0;

//Variable for match counter
var matchCounter = 0;

// creates an array to keep the open cards in
var openCards = [];

// Get the modal
var modal = $('.modal');

// Get the button that restarts
var restartButton = $(".restart");

//stars
var stars = $('.fa-star');

//first star
var firstStar = stars[0];

//second star
var secStar = stars[1];


// adds the event listener to the whole deck but filters using the event target to identify each card with the click
 $('.deck').on('click',function(evt){
   var selectedCard = $(evt.target);
   //display the card'symbol
   openShow(selectedCard);
   addToOpenCard(selectedCard);
   timeVar();
 });


/*
  GAME FUNCTIONS
*/


/*
  TIME COUNTER
 */
//time counter
var time = 0;
function timeVar(){
  setInterval(function(){
    time = time + 1;
  },1000);
}


/*
  ADDS CLASSES
 */
//display the cards symbol by adding the open and show classes
function openShow(x){
  x.addClass('open show');
}


/*
  ACTUAL GAME FUNCTION
 */
function addToOpenCard(x){
  //add the card to a list of open cards
  openCards.push(x);
  //check to see if the list has another card
  if (openCards.length === 1){
    //keep the card open
    console.log('This is the beginning of the move.');
  }
  else{
      //the cards match, lock them in the open position
      cardMatch();
      //reset the cards by removing their open and show classes and taking them out of the list
      resetCards();
      //tick the move counter
      moveCounter();
    }
  }


/*
  DO CARDS MATCH
 */
//determine if the cards are a match or not
function cardMatch(){
  var firstCard = openCards[0].html();
  console.log('First Card is' + firstCard);
  var secondCard = openCards[1].html();
  console.log('Second Card is' + secondCard);
  //if the first card matches the second card
  if(firstCard === secondCard){
    //add match class to both
    $('.open').addClass('match');
    matchCounter = matchCounter + 1;
    gameWon();
  }
  else{
    cardsNoMatch();
  }
}


/*
  ADDS ANIMATION FOR NON-MATCHED CARDS
 */
//add the nomatch class then remove it
function cardsNoMatch(){
  $('.open').addClass('nomatch').delay(800).queue(function(next){
      $(this).removeClass("nomatch");
      next();
  });
}


/*
  GAME WON and MODAL POP UP
 */
//will determine if all of the matches have been made
function gameWon(){
   if (matchCounter === 16){
     setTimeout(function(){
       modal.css('display','block');
     }, 2000);
     clearInterval(timeVar);
   }
   else{
     console.log("Keep Playing!");
   }
}


/*
  RESET CARDS DURING GAMES
 */
//resets the cards
function resetCards(){
  //remove show and open
  $('.open').removeClass('open show');
  //remove them from the list. set the array to empty
  openCards = [];
}


/*
  MOVE COUNTER
 */
//adds to the move counter and displays it
function moveCounter(){
  numberOfMoves ++;
  $('.moves').text(numberOfMoves);
}


/*
  STAR RATING
*/
function starRating(){
  if(numberOfMoves===9){
    $(firstStar).addClass('starStyle');
  }
  if(numberOfMoves===17){
    $(secStar).addClass('starStyle');
  }
}



/*
  RESTART GAME FUNCTIONS
*/

/*
  RESET THE CARDS
*/
function restartGame(){
  //reset the stars back
  $('.star').removeClass('starStyle');
  //set number of moves back to 0
  numberOfMoves = 0;
  $('.moves').text(numberOfMoves);
  //shuffle the symbols
  shuffle(symbols);
  //remove the cards from the deck
  $('.card').remove();
  //loop through the shuffled symbols
  for(var l = 0; l < symbols.length; l++){
    //append the html to the deck with the current symbol
    var newHTML = '<li class="card"><i class="fa ' + symbols[l] + '"></i></li>';
    $('.deck').append(newHTML);
  }
}


/*
  SHUFFLE
*/
// Shuffle function from http://stackoverflow.com/a/2450976
function shuffle(array) {
    var currentIndex = array.length, temporaryValue, randomIndex;

    while (currentIndex !== 0) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;
        temporaryValue = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = temporaryValue;
    }

    return array;
}


/*
  MODAL FUNCTIONS
*/

// When the user clicks on (x), close the modal
$(".close").click(function() {
    modal.css('display', 'none');
})

// When the user clicks on Play Again button, restart the game
restartButton.click(function() {
    modal.css('display', 'none');
    restartGame();
});

// When the user clicks anywhere outside of the modal, close it
$(window).click(function(evt) {
    if (evt.target == modal) {
        modal.css('display', 'none');
    }
});
