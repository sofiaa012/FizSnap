const MomentumLimit = 360; // 6 minutes (in seconds)

// ===== ORIGINAL DATA (UNCHANGED) =====
const cardsData = [
  { name: "speed", img: "images/ch2/CQ1.png" },
  { name: "speed", img: "images/ch2/CA1.png" },

  { name: "velocity", img: "images/ch2/CQ2.png" },
  { name: "velocity", img: "images/ch2/CA2.png" },

  { name: "Acceleration", img: "images/ch2/CQ3.png" },
  { name: "Acceleration", img: "images/ch2/CA3.png" },

  { name: "Displacement", img: "images/ch2/CQ4.png" },
  { name: "Displacement", img: "images/ch2/CA4.png" },

  { name: "Momentum", img: "images/ch2/CQ5.png" },
  { name: "Momentum", img: "images/ch2/CA5.png" },

  { name: "Newtown", img: "images/ch2/CQ6.png" },
  { name: "Newtown", img: "images/ch2/CA6.png" },

  { name: "Weight", img: "images/ch2/CQ7.png" },
  { name: "Weight", img: "images/ch2/CA7.png" },

  { name: "Force", img: "images/ch2/CQ8.png" },
  { name: "Force", img: "images/ch2/CA8.png" },

  { name: "Nilai", img: "images/ch2/CQ9.png" },
  { name: "Nilai", img: "images/ch2/CA9.png" },

  { name: "Collison", img: "images/ch2/CQ10.png" },
  { name: "Collison", img: "images/ch2/CA10.png" },

  { name: "Explosion", img: "images/ch2/CQ11.png" },
  { name: "Explosion", img: "images/ch2/CA11.png" },

  { name: "DayaImpuls", img: "images/ch2/CQ12.png" },
  { name: "DayaImpuls", img: "images/ch2/CA12.png" },

  { name: "Impuls", img: "images/ch2/CQ13.png" },
  { name: "Impuls", img: "images/ch2/CA13.png" },
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