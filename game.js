let cardsImages = ["one", "one", "two", "two", "three", "three", "four", "four",
"five", "five", "six", "six", "seven", "seven", "eight", "eight", "nine", "nine"];

let cards = document.querySelectorAll("section div");
cards = [...cards];

let startButton = document.querySelector('.start');
let restartButton = document.querySelector('.restart');

let startTime = new Date().getTime();

let activeCard = "";
const activeCards = [];

const gamePairs = cards.length/2;
let gameResult = 0;

const clickCard = function(){
    activeCard = this;
    activeCard.classList.remove("hidden");
    // 1 click
    if(activeCards.length === 0){
        activeCards[0] = activeCard;
        activeCard.removeEventListener("click", clickCard)
        return;
    // 2 click
    } else {
        cards.forEach(card => {
            card.removeEventListener("click", clickCard)
            activeCards[1] = activeCard;
            setTimeout(function() {
                if (activeCards[0].className === activeCards[1].className){
                    // found pair
                    activeCards.forEach(card => card.classList.add("off"))
                    gameResult++;
                    if (gameResult == gamePairs){
                        const endTime = new Date().getTime();
                        const gameTime = (endTime - startTime)/1000;
                        alert(`End of game! Your result is: ${gameTime} seconds`);
                        location.reload();
                    }
                } else {
                    // haven't found pair
                    activeCards.forEach(card => card.classList.add("hidden"))
                }
                activeCard = "";
                activeCards.length = 0;
                cards.forEach(card => {
                    if (!card.classList.contains("off")){
                        card.addEventListener("click", clickCard)
                    }
                })
            }, 400)
        })
    }
};

const initGame = function(){
    cards.forEach(card =>{
        card.classList.add("hidden");
    })

    startButton.addEventListener("click", startGame);
}

const startGame = function(){
    startTime = new Date().getTime();
    restartButton.addEventListener("click", restartGame);
    startButton.removeEventListener("click", startGame);
    cards.forEach(card =>{
        card.classList.remove("hidden");
    })

    cards.forEach(card =>{
        let position = Math.floor(Math.random()*cardsImages.length);
        card.classList.add(cardsImages[position]);
        cardsImages.splice(position, 1);
    })

    setTimeout(function(){
        cards.forEach(card => {
            card.classList.add("hidden");
            card.addEventListener("click", clickCard)
        })
    }, 2000)
}

const restartGame = function() {
    gameResult = 0;
    positon = 0;
    activeCard = "";
    activeCards.length = 0;
    cardsImages = ["one", "one", "two", "two", "three", "three", "four", "four",
    "five", "five", "six", "six", "seven", "seven", "eight", "eight", "nine", "nine"];

    cards.forEach(card => {
        card.className = "";
    });

    startGame();
};

initGame();