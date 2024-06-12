document.addEventListener('DOMContentLoaded', () => {
    const grid = document.querySelector('#grid');
    const restartButton = document.querySelector('#restart');
    const scoreDisplay = document.querySelector('.score');
    const timerDisplay = document.querySelector('.timer');

    const cardArray = [
        { name: 'A', id: 1 },
        { name: 'A', id: 2 },
        { name: 'B', id: 3 },
        { name: 'B', id: 4 },
        { name: 'C', id: 5 },
        { name: 'C', id: 6 },
        { name: 'D', id: 7 },
        { name: 'D', id: 8 },
        { name: 'E', id: 9 },
        { name: 'E', id: 10 },
        { name: 'F', id: 11 },
        { name: 'F', id: 12 },
        { name: 'G', id: 13 },
        { name: 'G', id: 14 },
        { name: 'H', id: 15 },
        { name: 'H', id: 16 },
        { name:  'I', id:17 },
        { name:  'I', id:18}
    ];


    let firstCard = null;
    let secondCard = null;
    let lockBoard = false;
    let score = 0;
    let seconds = 0;
    let timer; 
    



    document.querySelector(".score").textContent = score;
    // Shuffle the cards
    cardArray.sort(() => 0.5 - Math.random());

    // Create the cards
    cardArray.forEach(item => {
        const card = document.createElement('div');
        card.classList.add('card');
        card.innerHTML = `
            <div class="card-inner">
                <div class="card-front">${item.name}</div>
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
            document.querySelector(".score").textContent = score;

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
        lockBoard = true;
        setTimeout(() => {
            firstCard.classList.remove('flipped');
            secondCard.classList.remove('flipped');
            resetBoard();
        }, 1000);
    }

    function resetBoard() {
        [firstCard, secondCard, lockBoard] = [null, null, false];
    }

    // function restart(){
    //     resetBoard();
    //     score = 0;
    //     ddocument.querySelector(".score").textContent = score;
    // }
    function startTimer() {
        timer = setInterval(() => {
            seconds++;
            document.querySelector(".timer").textContent = `Time: ${seconds}s`;
        if (seconds >= 60) {
            clearInterval(timer);
            resetBoard();
            console.log('GAME OVER');

        }
    }, 1000);
    }

    startTimer(); // Start the timer when the game begins
});


