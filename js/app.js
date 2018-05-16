//List for all the functions
var symbols = ["fa-diamond","fa-paper-plane-o","fa-anchor","fa-bolt","fa-cube","fa-anchor","fa-leaf","fa-bicycle","fa-diamond","fa-bomb","fa-leaf","fa-bomb","fa-bolt","fa-bicycle","fa-paper-plane-o","fa-cube"];

// Variable for move counter
var numberOfMoves = 0;

//Variable for match counter
var matchCounter = 0;

// creates an array to keep the open cards in
var openCards = [];

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


/* Main Function */
//time counter
var time = 0;
var timeVar = setInterval(function(){
    time = time + 1;
  },1000);

/* Main Function */
//display the cards symbol by adding the open and show classes
function openShow(x){
  x.addClass('open show');
}

/* Main Function */
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


/* Secondary Function */
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
    howManyMatches();
  }
  else{
    cardsNoMatch();
  }
}

/* Tertiary Function */
//add the nomatch class then remove it
function cardsNoMatch(){
  $('.open').addClass('nomatch').delay(800).queue(function(next){
      $(this).removeClass("nomatch");
      next();
  });
}

/* Tertiary Function */
//will determine if all of the matches have been made
function howManyMatches(){
   if (matchCounter === 16){
     gameWon();
     clearInterval(timeVar);
   }
   else{
     console.log("Keep Playing!");
   }
}

/* Secondary Function */
//resets the cards
function resetCards(){
  //remove show and open
  $('.open').removeClass('open show');
  //remove them from the list. set the array to empty
  openCards = [];
}


/* Secondary Function */
//adds to the move counter and displays it
function moveCounter(){
  numberOfMoves ++;
  $('.moves').text(numberOfMoves);
}


/* Ending Function */
//creates pop up congratulating winner
function gameWon(){
  // use setTimeout to delay the message for 2 seconds so the user can see a clear picture of all the matches
}



/*
  RESTART GAME FUNCTIONS
*/

/*Main Function*/
function restartGame(){
  //shuffle the symbols
  shuffle(symbols);
  //remove the cards from the deck
  $('li').remove();
  //loop through the shuffled symbols
  for(var l = 0; l < symbols.length; l++){
    //append the html to the deck with the current symbol
    var newHTML = '<li class="card"><i class="fa ' + symbols[l].text() + '"></i></li>';
    $('.deck').append(newHTML);
  }
}


/*Secondary Function*/
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

// Get the modal
var modal = $('.modal');

// Get the button that plays again
var restartButton = document.getElementByClass("restart");

// Get the <span> element that closes the modal
var closer = $(".close").text();

// When the user wins the game, open the modal
function showModal() {
    modal.css('display','block');
}

// When the user clicks on (x), close the modal
closer.onclick = function() {
    modal.style.display = "none";
}

// When the user clicks on Play Again button, restart the game
restartButton.onclick = function() {
    modal.style.display = "none";

}

// When the user clicks anywhere outside of the modal, close it
window.on('click', function(evt) {
    if (evt.target == modal) {
        modal.style.display = "none";
        shuffle(cardDeck);
    }
});
