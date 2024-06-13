const grid = document.querySelector('#grid');
const scoreDisplay = document.querySelector('.score');
const timerDisplay = document.querySelector('.timer');
const messageDisplay = document.querySelector('.message');
const restart = document.querySelector('#restart');
const WinMessage = "You Win!";
const LostMessage = "You Lost! Try again!";

const cardArray = [
    { name: 'img1.png', img: 'littleManHeart' },
    { name: 'img1.png', img: 'littleManHeart' },
    { name: 'img2.png', img: 'dragon' },
    { name: 'img2.png', img: 'dragon' },
    { name: 'img3.png', img: 'Water' },
    { name: 'img3.png', img: 'Water' },
    { name: 'img4.png', img: 'neonguy' },
    { name: 'img4.png', img: 'neonguy' },
    { name: 'img5.png', img: 'Paysage' },
    { name: 'img5.png', img: 'Paysage' },
    { name: 'img8.png', img: 'Landscape' },
    { name: 'img8.png', img: 'Landscape' },
    { name: 'img6.png', img: 'LittleMan' },
    { name: 'img6.png', img: 'LittleMan' },
    { name: 'img7.png', img: 'PixelMen' },
    { name: 'img7.png', img: 'PixelMen' },
    { name: 'img9.png', img: 'PinkTree' },
    { name: 'img9.png', img: 'PinkTree' },
    { name: 'img10.png', img: 'Triforce' },
    { name: 'img10.png', img: 'Triforce' },
    { name: 'img11.png', img: 'SkeletHead' },
    { name: 'img11.png', img: 'SkeletHead' },
    { name: 'img12.png', img: 'Love' },
    { name: 'img12.png', img: 'Love' }
];

let firstCard = null;
let secondCard = null;
let lockBoard = false;
let score = 0;
let seconds = 0;
let timer;
let gameOver = false;

// scoreDisplay.textContent = score;
    // Shuffle the cards
cardArray.sort(() => 0.5 - Math.random());

    // Create the cards
cardArray.forEach(item => {
    const card = document.createElement('div');
    card.classList.add('card');
    card.innerHTML = `
        <div class="card-inner">
            <div class="card-front">
                <img src="${item.name}" alt="${item.img}">
            </div>
            <div class="card-back"></div>
        </div>
        `;
    card.setAttribute('data-name', item.name);
    grid.appendChild(card);

    card.addEventListener('click', flipCard);
});

function flipCard() {
    if (lockBoard) return;
    if (this === firstCard) return;
    this.classList.add('flipped');

    if (!firstCard) {
        firstCard = this;
        return;
    }

    secondCard = this;
    lockBoard = true;
    checkForMatch();
}

function checkForMatch() {
    let isMatch = firstCard.getAttribute('data-name') === secondCard.getAttribute('data-name');
    if (isMatch) {
        disableCards();
        score++;
        scoreDisplay.textContent = score;
    } else {
        unflipCards();
    }
}

function disableCards() {
    firstCard.removeEventListener('click', flipCard);
    secondCard.removeEventListener('click', flipCard);
    resetBoard();
}

function unflipCards() {
    setTimeout(() => {
        firstCard.classList.remove('flipped');
        secondCard.classList.remove('flipped');
        resetBoard();
    }, 1000);
}

function resetBoard() {
    [firstCard, secondCard, lockBoard] = [null, null, false];
}

function startTimer() {
    timer = setInterval(() => {
        seconds++;
        timerDisplay.textContent = `Time: ${seconds}s`;
    }, 1000);
}



startTimer(); // Start the timer when the game begins



