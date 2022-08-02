const game = document.getElementById('game');

const scoreDisplay = document.getElementById('score');

let score = 0;

const jeopardyCategories = [
  {
    genre: 'WHO',
    questions: [
      {
        question: 'Who wrote The Chronicles of Narnia?',
        answers: ['JK Rowling', 'JRR Tolkien', 'CS Lewis'],
        correct: 'CS Lewis',
        level: 'easy',
      },
      {
        question: 'Who wrote The Lord of the Rings?',
        answers: ['L.Carroll', 'JRR Tolkien', 'CS Lewis'],
        correct: 'JRR Tolkien',
        level: 'medium',
      },
      {
        question: 'Who wrote Harry Potter?',
        answers: ['L.Carroll', 'JRR Tolkien', 'JK Rowling'],
        correct: 'JK Rowling',
        level: 'hard',
      },
    ],
  },

  {
    genre: 'WHERE',
    questions: [
      {
        question: 'Where is Belarus situated?',
        answers: ['Europe', 'Afrika', 'South America'],
        correct: 'Europe',
        level: 'easy',
      },
      {
        question: 'Where is Stockholm is the capital?',
        answers: ['Danmark', 'Norway', 'Sweden'],
        correct: 'Sweden',
        level: 'medium',
      },
      {
        question: 'Where is the Colloseum?',
        answers: ['Barcelona', 'Rome', 'Paris'],
        correct: 'Rome',
        level: 'hard',
      },
    ],
  },
  {
    genre: 'WHEN',
    questions: [
      {
        question: 'When did the Second World War begin?',
        answers: ['1914', '1939', '1941'],
        correct: '1939',
        level: 'easy',
      },
      {
        question: 'When is the Swedish National day?',
        answers: ['6th of June', '4th of July', '9th of August'],
        correct: '6th of June',
        level: 'medium',
      },
      {
        question: 'When was the first of the Star Wars movies released?',
        answers: ['1999', '1977', '1983'],
        correct: '1977',
        level: 'hard',
      },
    ],
  },
];

function addCategory(category) {
  const column = document.createElement('div');
  column.classList.add('genre-column');

  const genreTitle = document.createElement('div');
  genreTitle.classList.add('genre-title');
  genreTitle.innerText = category.genre;
  column.appendChild(genreTitle);
  game.append(column);

  category.questions.forEach((question) => {
    const card = document.createElement('div');
    card.classList.add('genre-card');
    column.append(card);
    if (question.level == 'easy') {
      card.innerHTML = 100;
    }
    if (question.level == 'medium') {
      card.innerHTML = 200;
    }
    if (question.level == 'hard') {
      card.innerHTML = 300;
    }

    card.setAttribute('data-question', question.question);
    card.setAttribute('data-answer-1', question.answers[0]);
    card.setAttribute('data-answer-2', question.answers[1]);
    card.setAttribute('data-answer-3', question.answers[2]);
    card.setAttribute('data-correct', question.correct);
    card.setAttribute('data-value', card.getInnerHTML());

    card.addEventListener('click', flipCard);
  });
}

jeopardyCategories.forEach((category) => {
  addCategory(category);
});

function flipCard() {
  this.innerHTML = '';
  this.style.fontSize = '15px';
  this.style.lineHeight = '30px';
  const textDisplay = document.createElement('div');
  textDisplay.classList.add('card-text');
  textDisplay.innerHTML = this.getAttribute('data-question');
  const firstButton = document.createElement('button');
  const secondButton = document.createElement('button');
  const thirdButton = document.createElement('button');

  firstButton.classList.add('first-btn');
  secondButton.classList.add('second-btn');
  thirdButton.classList.add('third-btn');

  firstButton.innerHTML = this.getAttribute('data-answer-1');
  firstButton.addEventListener('click', getResult);

  secondButton.innerHTML = this.getAttribute('data-answer-2');
  secondButton.addEventListener('click', getResult);

  thirdButton.innerHTML = this.getAttribute('data-answer-3');
  thirdButton.addEventListener('click', getResult);

  this.append(textDisplay, firstButton, secondButton, thirdButton);

  /* ###################################  disable other cards when one is clicked: ###################### */

  const allCards = Array.from(document.querySelectorAll('card'));
  allCards.forEach((card) => removeEventListener('click', flipCard));

  /* ##################################################################################################### */
}

/* ################################### pushing the btn-s with the answers: #################################### */

function getResult() {
  const allCards = Array.from(document.querySelectorAll('.card'));
  allCards.forEach((card) => card.addEventListener('click', flipCard));
  const cardOfBtn = this.parentElement;

  if (cardOfBtn.getAttribute('data-correct') == this.innerHTML) {
    score = score + parseInt(cardOfBtn.getAttribute('data-value'));
    scoreDisplay.innerHTML = score;
    cardOfBtn.classList.add('correct-answer');

    setTimeout(() => {
      while (cardOfBtn.firstChild) {
        cardOfBtn.removeChild(cardOfBtn.lastChild);
      }
      cardOfBtn.innerHTML = cardOfBtn.getAttribute('data-value') + ' points';
    }, 100);
  } else {
    cardOfBtn.classList.add('wrong-answer');

    setTimeout(() => {
      while (cardOfBtn.firstChild) {
        cardOfBtn.removeChild(cardOfBtn.lastChild); /* delete ALL children */
      }
      cardOfBtn.innerHTML = '0 points';
    }, 100);
  }

  cardOfBtn.removeEventListener('click', flipCard);
}
