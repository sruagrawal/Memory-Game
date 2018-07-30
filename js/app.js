/*
 * Create a list that holds all of your cards
 */
var cards = ['fa fa-diamond', 'fa fa-paper-plane-o', 'fa fa-anchor', 'fa fa-bolt', 'fa fa-cube', 'fa fa-leaf', 'fa fa-bicycle', 'fa fa-bomb', 'fa fa-diamond', 'fa fa-paper-plane-o', 'fa fa-anchor', 'fa fa-bolt', 'fa fa-cube', 'fa fa-leaf', 'fa fa-bicycle', 'fa fa-bomb'];

var movNum, deck, openList, counting, time;

var moves = document.getElementsByClassName('moves')[0];

var stars = document.getElementsByClassName('fa-star');

var seconds = document.getElementsByClassName('time')[0];

var repeatButton = document.getElementsByClassName('fa-repeat')[0];

var matchedCards = document.getElementsByClassName('match').length;

var gameOverMod = document.getElementById('endGame');

var repeatGameEnd = document.getElementById('repeatGame');

repeatGameEnd.addEventListener('click', () => newGame());
repeatButton.addEventListener('click', () => newGame());
newGame();


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

function cardTarget(){
  deck = deck.children;

  for(var x = 0; x < deck.length; x++){
    deck[x].addEventListener('click', function(e){
      if(counting == false)
      {
        counting = true;
        countSeconds();
      }
      if(e.target.className != 'card match' && e.target != openList){
        show(e.target);
        open(e.target);
      }
    });
  }
}

function show(card)
{
  card.className += ' open show';
}

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
    setTimeout(() => gameOver(), 500);
}

function incMoves(){
  movNum++;
  moves.innerHTML = movNum;
  if(movNum % 10 ==0 && stars[1]){
    stars[0].className = 'fa fa-star-o';
    stars = document.getElementsByClassName('fa fa-star');
  }
}

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

function resetStars(){
  usedStars = document.getElementsByClassName('fa fa-star-o');
  while(usedStars[0])
  {
    usedStars[0].className = 'fa fa-star';
  }
}

function gameOver(){
  counting = false;
  gameOverMod.style = "display: inline";
  var finalMov = document.getElementById('finalMoves');
  finalMov.innerHTML = movNum;
  var finStars = document.getElementById('finalStars');
  finStars.innerHTML = stars.length;
  var finSec = document.getElementById('finalSeconds');
  finSec.innerHTML = time+1;
}

function countSeconds(){
  time += 1;
  seconds.innerHTML = time;
  if(counting){
    setTimeout(countSeconds, 1000);
  }
}
