const cardsArray = [
  { name: 'dog', icon: '<i class="fa-solid fa-dog"></i>' },
  { name: 'hippo', icon: '<i class="fa-solid fa-hippo"></i>' },
  { name: 'fish', icon: '<i class="fa-solid fa-fish"></i>' },
  { name: 'cat', icon: '<i class="fa-solid fa-cat"></i>' },
  { name: 'spider', icon: '<i class="fa-solid fa-spider"></i>' },
  { name: 'frog', icon: '<i class="fa-solid fa-frog"></i>' },
  { name: 'dog', icon: '<i class="fa-solid fa-dog"></i>' },
  { name: 'hippo', icon: '<i class="fa-solid fa-hippo"></i>' },
  { name: 'fish', icon: '<i class="fa-solid fa-fish"></i>' },
  { name: 'cat', icon: '<i class="fa-solid fa-cat"></i>' },
  { name: 'spider', icon: '<i class="fa-solid fa-spider"></i>' },
  { name: 'frog', icon: '<i class="fa-solid fa-frog"></i>' }
];

let flippedCards = [];
let matchedPairs = 0;

const gameBoard = document.getElementById('gameBoard');
const resetBtn = document.getElementById('resetBtn');

shuffleCards();
displayCards();

resetBtn.addEventListener('click', resetGame);

function shuffleCards() {
  for (let i = cardsArray.length - 1; i >= 0; i--) {
    const randIndex = Math.floor(Math.random() * (i + 1));
    [cardsArray[i], cardsArray[randIndex]] = [cardsArray[randIndex], cardsArray[i]];
  }
}

function displayCards() {
  cardsArray.forEach((card, index) => {
    const cardDiv = document.createElement('div');
    cardDiv.setAttribute('id', index);
    cardDiv.classList.add('cardback', 'active');
    cardDiv.addEventListener('click', flipCard);
    gameBoard.appendChild(cardDiv);
  });
}

function flipCard() {
  if (flippedCards.length < 2 && this.classList.contains('active')) {
    const cardId = this.getAttribute('id');
    flippedCards.push(this);
    this.classList.remove('cardback');
    this.innerHTML = cardsArray[cardId].icon;

    if (flippedCards.length === 2) {
      setTimeout(checkMatch, 1000);
    }
  }
}

function checkMatch() {
  const card1Id = flippedCards[0].getAttribute('id');
  const card2Id = flippedCards[1].getAttribute('id');

  if (card1Id === card2Id) {
    flippedCards[0].innerHTML = '';
    flippedCards[0].classList.add('cardback');
    flippedCards = [];
    return;
  }

  if (cardsArray[card1Id].name === cardsArray[card2Id].name) {
    flippedCards.forEach(card => {
      card.classList.remove('active');
      card.style.border = 'none';
      card.style.backgroundColor = '#f5e8ba';
      card.innerHTML = '';
    });
    matchedPairs++;
    checkGameOver();
  } else {
    flippedCards.forEach(card => {
      card.innerHTML = '';
      card.classList.add('cardback');
    });
  }

  flippedCards = [];
}

function checkGameOver() {
  if (matchedPairs === cardsArray.length / 2) {
    gameBoard.innerHTML = 'You Won!';
    gameBoard.classList.remove('game');
    gameBoard.classList.add('won');
    resetBtn.style.display = 'block';
  }
}

function resetGame() {
  gameBoard.innerHTML = '';
  gameBoard.classList.remove('won');
  gameBoard.classList.add('game');
  matchedPairs = 0;
  flippedCards = [];
  shuffleCards();
  displayCards();
  resetBtn.style.display = 'none';
}
