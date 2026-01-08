console.log("game-common.js loaded");
console.log("homeIcon:", document.getElementById('home-icon'));
const correctSound = new Audio("audio/CorrectSoundEffect.mp3");
const wrongSound   = new Audio("audio/WrongSoundEffects.mp3");

// optional (adjust volume)
correctSound.volume = 0.3;
wrongSound.volume   = 0.3;

let cards = [];
let flippedCards = [];
let matchedPairs = 0;
let gametimer;
let revealtimer;
let totalTime;
let initialTime = 0;
let isRevealing = true;
let lives = 3;
let isGamePaused = false;


function startGame(cardsData, timeLimit) {

    const tempState = sessionStorage.getItem('tempGameState');
    const gameBoard = document.getElementById('game-board');

    if (tempState) {
        const gameState = JSON.parse(tempState);
    
        // Validate game state
        if (!gameState.cards || gameState.matchedPairs === undefined || gameState.totalTime === undefined || gameState.lives === undefined) {
            console.error('Invalid game state found. Starting a new game.');
            sessionStorage.removeItem('tempGameState');
            return;
        }
    
        // Restore game state
        matchedPairs = gameState.matchedPairs;
        totalTime = gameState.totalTime;
        initialTime = timeLimit;
        lives = gameState.lives;
        cards = gameState.cards;
    
        updateLivesDisplay();

        if (gameBoard) {
            gameBoard.innerHTML = '';
            cards.forEach(savedCard => {
                const cardElement = createCardElement(savedCard);
                if (savedCard.flipped) {
                    cardElement.classList.add('flipped'); // Restore the flipped state of the card
                }
                gameBoard.appendChild(cardElement);
            });
        }
    
        flippedCards = [];
        isRevealing = false;
        sessionStorage.removeItem('tempGameState'); // Clear temporary state
        starttimer();
    } else {
   

    // Start a new game (chapter-based)
    cards = shuffle(cardsData);   // cards from chapter1.js
    matchedPairs = 0;
    lives = 3;
    totalTime = timeLimit;        // time passed from chapter file
    initialTime = timeLimit;
    isRevealing = true;


    if (gameBoard) {
        gameBoard.innerHTML = '';


            cards.forEach(card => {
                const cardElement = createCardElement(card);
                gameBoard.appendChild(cardElement);
            });

            flipAllCards(true);
            revealtimer = setTimeout(() => {
                flipAllCards(false);
                isRevealing = false;
            }, 10000);
        }
        starttimer();
    }
}

// Create Card Element Function
function createCardElement(card) {
    const cardElement = document.createElement('div');
    cardElement.classList.add('card');

    // store matching key
    cardElement.dataset.id = card.name;

    const frontImageSrc = card.img;                 // image from chapter data
    const backImageSrc = 'images/frontcard.png';    // card back image

    cardElement.innerHTML = `
        <div class="card-inner">
            <img class="front" src="${frontImageSrc}" alt="Card Front">
            <img class="back" src="${backImageSrc}" alt="Card Back">
        </div>
    `;

    cardElement.addEventListener('click', () => {
        if (
            !cardElement.classList.contains('flipped') &&
            flippedCards.length < 2 &&
            !isRevealing
        ) {
            flipCard(cardElement);
        }
    });

    return cardElement;
}

// Flip All Cards Function
function flipAllCards(flip) {
    document.querySelectorAll('.card').forEach(card => {
        if (flip && !card.classList.contains('flipped')) {
            card.classList.add('flipped');
        } else if (!flip && card.classList.contains('flipped')) {
            card.classList.remove('flipped');
        }
    });
}

// Flip Individual Card Function
function flipCard(card) {
    if (isRevealing || card.classList.contains('flipped') || flippedCards.length >= 2) return;

    card.classList.toggle('flipped');
    flippedCards.push(card);

    if (flippedCards.length === 2) {
        checkForMatch();
    }
}



function checkForMatch() {
    const [card1, card2] = flippedCards;
    const id1 = card1.dataset.id;
    const id2 = card2.dataset.id;

    if (id1 === id2) {
        // ✅ correct sound
        correctSound.currentTime = 0;
        correctSound.play().catch(()=>{});

        matchedPairs++;
        flippedCards = [];

        if (matchedPairs === cards.length / 2) {
            clearInterval(gametimer);
            goToFeedbackPage(true);
        }

    } else {
        // ❌ wrong sound
        wrongSound.currentTime = 0;
        wrongSound.play().catch(()=>{});

        lives--;
        updateLivesDisplay();

        if (lives <= 0) {
            clearInterval(gametimer);
            goToFeedbackPage(false);
            return; // stop here
        }

        setTimeout(() => {
            card1.classList.remove('flipped');
            card2.classList.remove('flipped');
            flippedCards = [];
        }, 1000);
    }
}


// timer Logic
function starttimer() {
    if (gametimer) clearInterval(gametimer);
    updatetimerDisplay();
    gametimer = setInterval(() => {
        totalTime = Math.max(0, totalTime - 1);
        updatetimerDisplay();
        if (totalTime <= 0) {
            clearInterval(gametimer);
            goToFeedbackPage(false);

        }
    }, 1000);
}

function updatetimerDisplay() {
    const minutes = Math.floor(totalTime / 60).toString().padStart(2, '0');
    const seconds = (totalTime % 60).toString().padStart(2, '0');
    document.getElementById('timer').textContent = `Masa: ${minutes}:${seconds}`; //Masa Display
}

// Update Lives Displayx
function updateLivesDisplay() {
    const livesElement = document.getElementById('lives');
    const emptyHearts = "🖤 ".repeat(3 - lives);
    const filledHearts = "❤️ ".repeat(lives);
    livesElement.innerHTML = emptyHearts + filledHearts;
}

// Shuffle Array Function
function shuffle(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
}

// Preload Images Function
function preloadImages() {
  cards.forEach(card => {
    const img = new Image();
    img.src = card.img || card.image;
  });
}

function goToFeedbackPage(isWin) {
  const chapter = Number(document.body.dataset.chapter || 1);

  const feedbackData = {
    chapter,
    isWin,
    score: matchedPairs,
    totalPairs: Math.floor(cards.length / 2),

    timeLeft: totalTime,                           // ✅ ADD THIS
    initialTime: initialTime,                      // ✅ ADD THIS (optional but useful)
    timeUsed: Math.max(0, (initialTime - totalTime)),

    livesLeft: lives
  };

  localStorage.setItem("chapterFeedback", JSON.stringify(feedbackData));
  window.location.href = "feedback.html";
}




document.addEventListener('DOMContentLoaded', () => {
    preloadImages();

    const homeIcon = document.getElementById('home-icon');
    if (homeIcon) {
        homeIcon.addEventListener('click', (event) => {
            event.preventDefault();
            clearInterval(gametimer);

            const gameState = {
                cards: cards.map(card => ({
                    name: card.name,
                    img: card.img,
                    flipped: document.querySelector(`[data-id="${card.name}"]`)?.classList.contains('flipped') || false
                })),
                matchedPairs,
                totalTime,
                lives,
                difficulty: document.body.dataset.difficulty
            };

            console.log("Saving gameState:", gameState);

            sessionStorage.setItem('gameState', JSON.stringify(gameState));

            window.location.href = 'stopgame.html';
        });
    }

    const playAgainBtn = document.getElementById('play-again');

    if (playAgainBtn) {
        playAgainBtn.addEventListener('click', () => {

            const savedDifficulty = sessionStorage.getItem('difficulty');

            if (savedDifficulty) {
                // Example: savedDifficulty = "chapter-3"
                window.location.href = `${savedDifficulty}.html`;
            } else {
                // If somehow missing, go back to chapter selection
                window.location.href = 'start.html';
            }
        });
    }

    const continueGameBtn = document.getElementById('continue-game');

    if (continueGameBtn) {
        continueGameBtn.addEventListener('click', () => {

            const savedState = sessionStorage.getItem('gameState');
            if (!savedState) {
                alert("Tiada permainan disimpan.");
                return;
            }

            const gameState = JSON.parse(savedState);

            // Save into tempGameState so the game page can restore it
            sessionStorage.setItem('tempGameState', JSON.stringify(gameState));

            // Difficulty must exist
            if (!gameState.difficulty) {
                alert("Ralat: Tahap permainan tidak dijumpai.");
                return;
            }

            // Redirect back to the correct difficulty page
            window.location.href = `${gameState.difficulty}.html`;
        });
    } 

    const currentDifficulty = document.body.dataset.difficulty;
    if (currentDifficulty) {
        sessionStorage.setItem('difficulty', currentDifficulty);
    }

});

