const grid = document.querySelector('.grid');
const spanPlayer = document.querySelector('.player');
const timer = document.querySelector('.timer');
console.log("Ei, o que você está fazendo aqui? Essa área é apenas para funcionários!")
const personagens = [
  'anabelle',
  'freira-de-rosto',
  'freira-inteira',
  'freira',
  'it-balao',
  'it',
  'jason-floresta',
  'poço',
  'samara',
];

const createElement = (tag, className) => {
  const element = document.createElement(tag);
  element.className = className;
  return element;
}

let firstCard = '';
let secondCard = '';

const checkEndGame = () => {
  const disabledCards = document.querySelectorAll('.disabled-card');

  if (disabledCards.length === 20) {
    clearInterval(this.loop)
    alert(`Parabéns ${spanPlayer.innerHTML}, você conseguiu sobreviver!`);
  }
}

const checkCards = () => {
  const firstPersongem = firstCard.getAttribute('data-characters');
  const secondPersongem = secondCard.getAttribute('data-characters');

  if (firstPersongem === secondPersongem) {

    firstCard.firstChild.classList.add('disabled-card');
    secondCard.firstChild.classList.add('disabled-card');

    firstCard = '';
    secondCard = '';

    checkEndGame();

  } else {

    setTimeout(() => {

     firstCard.classList.remove('reveal-card');
     secondCard.classList.remove('reveal-card');

     firstCard = '';
     secondCard = '';



    }, 500);
  }
}

const revealCard =({ target }) => {

  if (target.parentNode.className.includes('reveal-card')) {
    return;
  }

  if (firstCard === '') {
    target.parentNode.classList.add('reveal-card');
    firstCard = target.parentNode;
  
  } else if (secondCard === '') {

    target.parentNode.classList.add('reveal-card');
    secondCard = target.parentNode;

    checkCards();
  }
}
  
const createCard = (personagem) => {

  const card = createElement('div', 'card');
  const front = createElement('div', 'face front');
  const back = createElement('div', 'face back');

  front.style.backgroundImage = `url('../Imagem/${personagem}.jpg')`;

  card.appendChild(front);
  card.appendChild(back);

  card.addEventListener('click', revealCard);
  card.setAttribute('data-characters', personagem)

  return card;
}

const loadGame = () => {
  const duplicatePersonagens = [ ...personagens, ...personagens ];

  const shuffleadArray = duplicatePersonagens.sort(() => Math.random() - 0.5 );

  shuffleadArray.forEach((personagem) => {
    const card = createCard(personagem);
    grid.appendChild(card);
  });
}

const startTimer = () => {

  this.loop = setInterval(() => {
    const currentTime = Number(timer.innerHTML);
    timer.innerHTML = currentTime + 1;
  }, 1000);
}

window.onload = () => {
  
  const playerName = localStorage.getItem('player');
  startTimer();

  spanPlayer.innerHTML = playerName;

  loadGame();
}

