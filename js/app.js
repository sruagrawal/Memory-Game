/*
 * Create a list that holds all of your cards
 */
var cards = ['fa fa-diamond', 'fa fa-paper-plane-o', 'fa fa-anchor', 'fa fa-bolt', 'fa fa-cube', 'fa fa-leaf', 'fa fa-bicycle', 'fa fa-bomb', 'fa fa-diamond', 'fa fa-paper-plane-o', 'fa fa-anchor', 'fa fa-bolt', 'fa fa-cube', 'fa fa-leaf', 'fa fa-bicycle', 'fa fa-bomb'];

/**
 *  movNum - Number of moves the player uses, deck - holds all cards, openList - card that is open and shown
 *  counting - if the game has started (used for time), time - number of seconds the game has gone on for
 */
var movNum, deck, openList, counting, time;
/**
 * Variables that reference elements in html file
 */
var moves = document.getElementsByClassName('moves')[0];

var stars = document.getElementsByClassName('fa-star');

var seconds = document.getElementsByClassName('time')[0];

var repeatButton = document.getElementsByClassName('fa-repeat')[0];

var matchedCards = document.getElementsByClassName('match').length;

var gameOverMod = document.getElementById('endGame');

var repeatGameEnd = document.getElementById('repeatGame');

//If player restarts game
repeatGameEnd.addEventListener('click', () => newGame());
repeatButton.addEventListener('click', () => newGame());

//initiallizes game
newGame();

/**
 * @description Shuffles cards, creates thier HTML, and displays them on the page
 */
function newDeck(){
  cards = shuffle(cards);
  deck = document.getElementsByClassName('deck')[0];
  while(deck.children[0]){
    deck.removeChild(deck.children[0]);
  }
  for(var x = 0; x < cards.length; x++)
  {
    var card = document.createElement('li');
    card.className = 'card';
    var value = document.createElement('i');
    value.className = cards[x];
    card.appendChild(value);
    deck.appendChild(card);
  }
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

/**
 * @description Adds an Event Listener to each card. On click, card will start the game if it hasn't been started,
 * if the card is not matched yet or already open, it will show it and consider it for match
 */
function cardTarget(){
  deck = deck.children;

  for(var x = 0; x < deck.length; x++){
    deck[x].addEventListener('click', function(e){
      if(counting == false)
      {
        counting = true;
        countSeconds();
      }
      if(e.target.className != 'card match' && e.target.className != 'open show' && e.target != openList){
        show(e.target);
        open(e.target);
      }
    });
  }
}

/**
 * @description Shows the cards face to the player
 */
function show(card)
{
  card.className += ' open show';
}

/**
 * @description If it is the first card opened, it assigns it to openList. If it
 * the second card open, consider if it is a match. Increment the number of moves.
 */
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

/**
 * @description Cards are not a match. Briefly show that they are wrong and then hide them.
 */
function wrong(card){
  card.className += ' wrong';
  openList.className += ' wrong'
  setTimeout(() => hide(card), 300);
}

/**
 * @description Hide the card from the player. Set openList back to null so that
 * it can be reassigned once a new first card is picked.
 */
function hide(card){
  openList.className = 'card';
  openList = null;
  card.className = 'card';
}

/**
 * @description If the cards are a match, change thier class to match, reset openList.
 * Consider if the end game goal has been met.
 */
function match(card){
  openList.className = 'card match';
  card.className = 'card match';
  openList = null;
  matchedCards = document.getElementsByClassName('match').length;
  if(matchedCards == 16) //if game is over
    setTimeout(() => gameOver(), 500);
}

/**
 * @description Increases the number of moves the player has used and displays
 * to page. Also in charge of number of stars player receives.
 */
function incMoves(){
  movNum++;
  moves.innerHTML = movNum;
  if(movNum % 10 ==0 && stars[1]){
    stars[0].className = 'fa fa-star-o';
    stars = document.getElementsByClassName('fa fa-star');
  }
}

/**
 * @description Sets all variables back to default values and sets up a new game. If game over
 * modal is visible, hides it.
 */
function newGame(){
  counting = false;
  time = 0;
  seconds.innerHTML = time;
  movNum = 0;
  openList = null;
  moves.innerHTML = movNum;
  newDeck();
  cardTarget();
  resetStars();
  gameOverMod.style = "display: none";
}

/**
 * @description Resets the number of stars on the page.
 */
function resetStars(){
  usedStars = document.getElementsByClassName('fa fa-star-o');
  while(usedStars[0])
  {
    usedStars[0].className = 'fa fa-star';
  }
}

/**
 * @description Once the game over goal is met, timer needs to stop counting
 * and modal needs to be displayed with accurate final number of moves, stars and seconds.
 */
function gameOver(){
  counting = false;
  gameOverMod.style = "display: inline";
  var finalMov = document.getElementById('finalMoves');
  finalMov.innerHTML = movNum;
  var finStars = document.getElementById('finalStars');
  finStars.innerHTML = stars.length;
  var finSec = document.getElementById('finalSeconds');
  finSec.innerHTML = time+1; //Adding 1 for bug fix
}

/**
 * @description Timer for how long the game lasted. Displays current time used on page.
 */
function countSeconds(){
  time += 1;
  seconds.innerHTML = time;
  if(counting){
    setTimeout(countSeconds, 1000);
  }
}
