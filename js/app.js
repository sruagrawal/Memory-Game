/*
 * Create a list that holds all of your cards
 */
var cards = ['fa fa-diamond', 'fa fa-paper-plane-o', 'fa fa-anchor', 'fa fa-bolt', 'fa fa-cube', 'fa fa-leaf', 'fa fa-bicycle', 'fa fa-bomb', 'fa fa-diamond', 'fa fa-paper-plane-o', 'fa fa-anchor', 'fa fa-bolt', 'fa fa-cube', 'fa fa-leaf', 'fa fa-bicycle', 'fa fa-bomb'];

var moves = document.getElementsByClassName('moves')[0];
var movNum = 0;

var stars = document.getElementsByClassName('fa-star');

var restart = document.getElementsByClassName('restart')[0];

var matchedCards = document.getElementsByClassName('match').length;

var gameOverMod = document.getElementById('endGame');

restart.addEventListener('clicked', newGame());
/*
 * Display the cards on the page
 *   - shuffle the list of cards using the provided "shuffle" method below
 *   - loop through each card and create its HTML
 *   - add each card's HTML to the page
 */

cards = shuffle(cards);
var deck = document.getElementsByClassName('deck')[0];
for(var x = 0; x < cards.length; x++){
  var card = document.createElement('li');
  card.className = 'card';
  var value = document.createElement('i');
  value.className = cards[x];
  card.appendChild(value);
  deck.appendChild(card);
}


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

deck = deck.children;

for(var x = 0; x < deck.length; x++){
  deck[x].addEventListener('click', function(e){
    if(e.target.className != 'card match' && e.target != openList){
      show(e.target);
      open(e.target);
    }
  });
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

function show(card)
{
  card.className += ' open show';
}

var openList = null;
function open(card)
{
  if(openList == null)
    openList = card;
  else {
    if(openList.children[0].className == card.children[0].className)
      match(card);
    else {
      wrong(card);
    }
    incMoves();
  }
}

function wrong(card){
  card.className += ' wrong';
  openList.className += ' wrong'
  setTimeout(() => hide(card), 300);
}

function hide(card){
  openList.className = 'card';
  openList = null;
  card.className = 'card';
}

function match(card){
  openList.className = 'card match';
  card.className = 'card match';
  openList = null;
  matchedCards = document.getElementsByClassName('match').length;
  if(matchedCards == 16)
    gameOver();
}

function incMoves(){
  movNum++;
  moves.innerHTML = movNum;
  if(movNum % 10 ==0)
    stars[0].className = 'fa fa-star-o';
}

function newGame(){

}

function gameOver(){
  gameOverMod.style = "display: inline";
  var finalMov = document.getElementById('finalMoves');
  finalMov.innerHTML = movNum+1;
  var finStars = document.getElementById('finalStars');
  finStars.innerHTML = stars.length;
}
