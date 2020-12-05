document.addEventListener('DOMContentLoaded', function () {
  const cardsArray = [
    { name: 'change', img: './cards/change.png' },
    {
      name: 'dream',
      img: './cards/dream.png',
    },
    {
      name: 'energy',
      img: './cards/energy.png',
    },
    {
      name: 'fortune',
      img: './cards/fortune.png',
    },
    {
      name: 'freeze',
      img: './cards/freeze.png',
    },
    {
      name: 'health',
      img: './cards/health.png',
    },
    {
      name: 'love',
      img: './cards/love.png',
    },
    {
      name: 'mana',
      img: './cards/mana.png',
    },
    { name: 'poison', img: './cards/poison.png' },
  ];

  const gameGrid = cardsArray.concat(cardsArray).sort(function () {
    return 0.5 - Math.random();
  });

  let firstCard = '';
  let secondCard = '';
  let count = 0;
  let previousTarget = null;
  let delay = 800;
  let lowScore = localStorage.getItem('lowScore');
  let gameOver = true;

  const game = document.getElementById('game');
  const grid = document.createElement('section');
  let totalGuess = document.getElementById('total');
  totalGuess = 0;
  grid.setAttribute('class', 'grid');
  game.append(grid);

  if (lowScore) {
    document.getElementById('best').innerText = lowScore;
  }

  const newGame = () => {
    gameOver = false;
    gameGrid.forEach(function (item) {
      let name = item.name;
      let card = document.createElement('div');
      card.classList.add('card');
      card.dataset.name = name;

      let front = document.createElement('div');
      front.classList.add('front');

      let back = document.createElement('div');
      back.classList.add('back');
      back.style.backgroundImage = `url(${item.img})`;

      grid.append(card);
      card.append(front);
      card.append(back);
    });
  };

  let startGame = document.getElementById('newGame');
  startGame.addEventListener('click', function () {
    if (gameOver) {
      let matched = document.querySelectorAll('.match');
      document.getElementById('best').style.color = '#ffffff';
      matched.forEach(function (card) {
        card.remove();
      });
      totalGuess = 0;
      resetGuesses();
      newGame();
    } else {
      return;
    }
  });

  const match = () => {
    let selected = document.querySelectorAll('.selected');
    selected.forEach(function (card) {
      card.classList.add('match');
    });
    let matched = document.querySelectorAll('.match');
    if (matched.length === 18) {
      gameOver = true;
      let lowScore = +localStorage.getItem('lowScore') || Infinity;
      if (totalGuess < lowScore) {
        localStorage.setItem('lowScore', totalGuess);
        bestScore = document.getElementById('best');
        bestScore.innerText = totalGuess;
        bestScore.style.color = '#CE0000';
      }
    } else {
      false;
    }
  };

  const resetGuesses = () => {
    firstCard = '';
    secondCard = '';
    count = 0;
    previousTarget = null;

    let selected = document.querySelectorAll('.selected');
    selected.forEach(function (card) {
      card.classList.remove('selected');
    });
  };

  grid.addEventListener('click', function (event) {
    let chosenCard = event.target;

    if (
      chosenCard.nodeName === 'SECTION' ||
      chosenCard === previousTarget ||
      chosenCard.parentNode.classList.contains('selected') ||
      chosenCard.parentNode.classList.contains('match')
    ) {
      return;
    }

    if (count < 2) {
      count++;
      totalGuess++;

      if (count === 1) {
        firstCard = chosenCard.parentNode.dataset.name;
        chosenCard.parentNode.classList.add('selected');
      } else {
        secondCard = chosenCard.parentNode.dataset.name;
        chosenCard.parentNode.classList.add('selected');
      }

      if (firstCard && secondCard) {
        if (firstCard === secondCard) {
          setTimeout(match, delay);
        }
        setTimeout(resetGuesses, delay);
      }
      document.getElementById('total').innerText = totalGuess;
      previousTarget = chosenCard;
    }
  });
});
