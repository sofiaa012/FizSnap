const timeLimit = 360; // 6 minutes (in seconds)

const cardsData = [
  { name: "gradient", img: "images/ch1/Q1.png" },
  { name: "gradient", img: "images/ch1/A1.png" },

  { name: "linearequation", img: "images/ch1/Q2.png" },
  { name: "linearequation", img: "images/ch1/A2.png" },

  { name: "length", img: "images/ch1/Q3.png" },
  { name: "length", img: "images/ch1/A3.png" },

  { name: "mass", img: "images/ch1/Q4.png" },
  { name: "mass", img: "images/ch1/A4.png" },

  { name: "time", img: "images/ch1/Q5.png" },
  { name: "time", img: "images/ch1/A5.png" },

  { name: "temperature", img: "images/ch1/Q6.png" },
  { name: "temperature", img: "images/ch1/A6.png" },

  { name: "current", img: "images/ch1/Q7.png" },
  { name: "current", img: "images/ch1/A7.png" },
  
];


// ===== HELPER FUNCTIONS =====
function shuffleArray(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
}

// Group cards into pairs
function groupPairs(cards) {
  const pairs = {};

  cards.forEach(card => {
    if (!pairs[card.name]) {
      pairs[card.name] = [];
    }
    pairs[card.name].push(card);
  });

  return Object.values(pairs);
}

// ===== SELECT RANDOM 7 PAIRS =====
const PAIRS_TO_USE = 6;

const allPairs = groupPairs(cardsData);
shuffleArray(allPairs);

const selectedPairs = allPairs.slice(0, PAIRS_TO_USE);

// Flatten into 14 cards
let gameCards = selectedPairs.flat();

// Final shuffle so positions are random
shuffleArray(gameCards);

// ===== USE gameCards FROM HERE ON =====
// Example: render cards
const gameBoard = document.getElementById("game-board");
gameBoard.innerHTML = "";

gameCards.forEach(card => {
  const cardElement = document.createElement("div");
  cardElement.classList.add("card");
  cardElement.dataset.name = card.name;

  const img = document.createElement("img");
  img.src = card.img;
  img.alt = card.name;

  cardElement.appendChild(img);
  gameBoard.appendChild(cardElement);
});