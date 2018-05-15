/*
 * Create a list that holds all of your cards
 */
var cardDeck = $('.card');
// Variable for move counter
var numberOfMoves = 0;

/*
 * Display the cards on the page
 *   - shuffle the list of cards using the provided "shuffle" method below
 *   - loop through each card and create its HTML
 *   - add each card's HTML to the page
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

// Loop through each card and create its html
var newDeck = [];
for(var x = 0; x < cardDeck.length; x++){
  var cardHtml = cardDeck[x].html;
  newDeck.push(cardHTML)
  //TODO add cardHtml to the page
}

/*
 * set up the event listener for a card. If a card is clicked:
 *  - display the card's symbol (put this functionality in another function that you call from this one)
 *  - add the card to a *list* of "open" cards (put this functionality in another function that you call from this one)
 *  - if the list already has another card, check to see if the two cards match
 *    + if the cards do match, lock the cards in the open position (put this functionality in another function that you call from this one)
 *    + if the cards do not match, remove the cards from the list and hide the card's symbol (put this functionality in another function that you call from this one)
 *    + increment the move counter and display it on the page (put this functionality in another function that you call from this one)
 *    + if all cards have matched, display a message with the final score (put this functionality in another function that you call from this one)
 */

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
  FUNCTIONS
*/



/*
shuffle the cards
get the icon html from each of the cards
add the html back to the page
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
  }
  else{
    cardsNoMatch();
  }
}


//display the cards symbol by adding the open and show classes
function openShow(x){
  x.addClass('open show');
}


//add the nomatch class then remove it
function cardsNoMatch(){
  $('.open').addClass('nomatch').delay(800).queue(function(next){
      $(this).removeClass("nomatch");
      next();
  });
}


//resets the cards
function resetCards(){
  //remove show and open
  $('.open').removeClass('open show');
  //remove them from the list. set the array to empty
  openCards = [];
}


//adds to the move counter and displays it
function moveCounter(){
  numberOfMoves ++;
  $('.moves').text(numberOfMoves);
}


//will determine if all of the matches have been made
function howManyMatches(){
   var numMatchedCards = $('.match').length;
   if (numMatchedCards === 16){
     gameWon();
     stopTime();
   }
}


//time counter
var time = 0;
var timeVar = setInterval(function(){
    time = time + 1;
  },1000);

//stop time counter
function stopTime(){
  clearInterval(timeVar);
}


//creates pop up congratulating winner
function gameWon(){
  // use setTimeout to delay the message for 2 seconds so the user can see a clear picture of all the matches
}


//MODAL
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
