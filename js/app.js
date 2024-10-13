let card = document.getElementsByClassName("card");
let cards = [...card]
const deck = document.getElementById("card-deck");
let moves = 0;
let counter = document.querySelector(".moves");
const stars = document.querySelectorAll(".fa-star");
let matchedCard = document.getElementsByClassName("match");
let starsList = document.querySelectorAll(".stars li");
let closeicon = document.querySelector(".close");
let modal = document.getElementById("popup1")
var second = 0, minute = 0; hour = 0;
var timer = document.querySelector(".timer");
var interval;
var openedCards = [];
const startButton = document.getElementById('start-button');
const overlay = document.getElementById('start-overlay');
const cardDeck = document.getElementsByClassName('container')[0];


function shuffle(array) {
    var currentIndex = array.length, temporaryValue, randomIndex;
    Array.prototype.open = deck.dataset.open
    Array.prototype.matched = deck.dataset.match
    while (currentIndex !== 0) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;
        temporaryValue = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = temporaryValue;
    }
    return array;
};

var displayCard = function (){
    this.classList.toggle("open");
    this.classList.toggle("show");
    this.classList.toggle("disabled");
};

function cardOpen() {
    openedCards.push(this);
    var len = openedCards.length;
    if(len == [].open){
        moveCounter();
        if(openedCards[0] === openedCards[1]){
            matched();
        } else {
            unmatched();
        }
    }
};
function matched(){
    openedCards[0].classList.add("match", "disabled");
    openedCards[1].classList.add("match", "disabled");
    openedCards[0].classList.remove("show", "open", "no-event","animate");
    openedCards[1].classList.remove("show", "open", "no-event","animate");
    openedCards = [];
}
function unmatched(){
    openedCards[0].classList.add("unmatched");
    openedCards[1].classList.add("unmatched");
    disable();
    setTimeout(function(){
        openedCards[0].classList.remove("show", "open", "no-event","unmatched","animate");
        openedCards[1].classList.remove("show", "open", "no-event","unmatched","animate");
        enable();
        openedCards = [];
    },1100);
}

function disable(){
    Array.prototype.filter.call(cards, function(card){
        card.classList.add('disabled');
    });
}

function enable(){
    Array.prototype.filter.call(cards, function(card){
        card.classList.remove('disabled');
        for(var i = 0; i < matchedCard.length; i++){
            matchedCard[i].classList.add("disabled");
        }
    });
}
function moveCounter(){
    moves++;
    counter.innerHTML = moves;
    if(moves == 1){
        second = 0;
        minute = 0; 
        hour = 0;
        startTimer();
    }
    if (moves > 6 && moves < 14){
        for( i= 0; i < 3; i++){
            if(i > 1){
                stars[i].style.visibility = "collapse";
            }
        }
    }
    else if (moves > 16){
        for( i= 0; i < 3; i++){
            if(i > 0){
                stars[i].style.visibility = "collapse";
            }
        }
    }
}

function startTimer(){
        let interval = setInterval(function(){
        timer.innerHTML = minute+"mins "+second+"secs";
        second++;
        if(second == 60){
            minute++;
            second=0;
        }
        if(minute == 60){
            hour++;
            minute = 0;
        }
    },1000);
}
function congratulations(){
    if (matchedCard.length == [].matched){
        clearInterval(interval);
        finalTime = timer.innerHTML;
        modal.classList.add("show");
        var starRating = document.querySelector(".stars").innerHTML;
        document.getElementById("finalMove").innerHTML = moves;
        document.getElementById("starRating").innerHTML = starRating;
        document.getElementById("totalTime").innerHTML = finalTime;
        closeModal();
    };
}

function closeModal(){
    closeicon.addEventListener("click", function(e){
        modal.classList.remove("show");
        startGame();
    });
}

function playAgain(){
    modal.classList.remove("show");
    startGame();
}
for (var i = 0; i < cards.length; i++){
    card = cards[i];
    card.addEventListener("click", displayCard);
    card.addEventListener("click", cardOpen);
    card.addEventListener("click",congratulations);
};
function startGame(){
    cards = shuffle(cards);
    cardsAppearance(cards)
    for (var i = 0; i < cards.length; i++){
        deck.innerHTML = "";
        [].forEach.call(cards, function(item) {
            deck.appendChild(item);
        });
        cards[i].classList.remove("show", "open", "match", "disabled");
    }
    moves = 0;
    counter.innerHTML = moves;
    for (var i= 0; i < stars.length; i++){
        stars[i].style.color = "#FFD700";
        stars[i].style.visibility = "visible";
    }
    second = 0;
    minute = 0; 
    hour = 0;
    timer.innerHTML = "0 mins 0 secs";
    clearInterval(interval);
}

function cardsAppearance (cards){
    cards.forEach(card => {
        const xFrom = `${Math.random() * 500 - 250}px`; 
        const yFrom = `${Math.random() * 500 - 250}px`; 
        card.style.setProperty('--x-from', xFrom);
        card.style.setProperty('--y-from', yFrom);
        const randomDelay = Math.random() * 5; 
        card.style.setProperty('--random-delay', randomDelay);
        card.classList.add('animate');
      });
}

  startButton.addEventListener('click', () => {
    overlay.style.opacity = 0;
    setTimeout(() => {
      overlay.style.display = 'none';
    }, 500);
    cardDeck.style.display = 'flex';
    startGame()
})