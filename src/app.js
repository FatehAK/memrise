(() => {
  let openCards = [];
  let moves = 0;
  let time = 0;
  let timer;
  let clockRunning = true;
  let matched = 0;
  const CARD_PAIRS = 8;

  const deck = document.querySelector('.deck');
  deck.addEventListener('click', cardClick, false);
  console.log('## 2');
  // handle clicks on the card
  function cardClick(event) {
    const targetCard = event.target;
    // checks for valid card
    if (
      targetCard.classList.contains('card') &&
      !targetCard.classList.contains('match') &&
      openCards.length < 2 &&
      !openCards.includes(targetCard)
    ) {
      if (clockRunning) {
        startTimer();
        clockRunning = false;
      }
      cardToggle(targetCard);
      // push card to array
      openCards.push(targetCard);
      // check if two cards are open
      if (openCards.length === 2) {
        cardMatch();
        moveCount();
        starCount();
      }
    }
  }

  // toggle the card classes on click
  function cardToggle(card) {
    card.classList.toggle('open');
    card.classList.toggle('show');
    card.classList.toggle('flipInY');
  }

  // handle cards when match is found
  function cardMatch() {
    // check match on basis of classnames
    if (openCards[0].firstElementChild.className === openCards[1].firstElementChild.className) {
      openCards[0].classList.toggle('match');
      openCards[1].classList.toggle('match');
      // remove animations added earlier
      openCards[0].classList.remove('flipInY');
      openCards[1].classList.remove('flipInY');
      openCards[0].classList.remove('shake');
      openCards[1].classList.remove('shake');
      // add animation to matched cards
      openCards[0].classList.add('rubberBand');
      openCards[1].classList.add('rubberBand');
      openCards = [];
      // increment matched for each card pair matched
      matched++;
    } else {
      // no match found
      setTimeout(function () {
        // add animation to unmatched cards
        openCards[0].classList.add('shake');
        openCards[1].classList.add('shake');
        openCards[0].classList.add('fixed');
        openCards[1].classList.add('fixed');
        // toggle cards classes again
        cardToggle(openCards[0]);
        cardToggle(openCards[1]);
      }, 1000);
      setTimeout(function () {
        openCards[0].classList.remove('fixed');
        openCards[1].classList.remove('fixed');
        // empty the array before new cards are added
        openCards = [];
      }, 2000);
    }
    // call to check if win condition is reached
    checkWin();
  }

  // calls the shuffle function on the deck of cards
  function cardShuffle() {
    // get array from nodelist
    const cards = Array.from(document.querySelectorAll('.deck li'));
    const shuffleCards = shuffle(cards);
    for (const card of shuffleCards) {
      // append the newly shuffled cards
      deck.appendChild(card);
    }
  }

  // increments the moves and adds them to the page
  function moveCount() {
    moves++;
    const move = document.querySelector('.moves');
    move.innerHTML = `${moves}`;
  }

  // adds stars based on move count
  function starCount() {
    if (moves === 16 || moves === 24) {
      const stars = document.querySelectorAll('.stars li');
      for (const star of stars) {
        // consider only those stars that are visible
        if (star.style.display !== 'none') {
          star.style.display = 'none';
          break;
        }
      }
    }
  }

  // starts the clock and adds it to the page
  function startTimer() {
    timer = setInterval(function () {
      time++;
      const clock = document.querySelector('.clock');
      const seconds = time % 60;
      const minutes = Math.floor(time / 60);
      if (seconds < 10) {
        clock.innerHTML = `${minutes} : 0${seconds}`;
      } else {
        clock.innerHTML = `${minutes} : ${seconds}`;
      }
    }, 1000);
  }

  // handles the shuffling of cards
  function shuffle(array) {
    let currentIndex = array.length;
    let temporaryValue;
    let randomIndex;
    while (currentIndex !== 0) {
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex -= 1;
      temporaryValue = array[currentIndex];
      array[currentIndex] = array[randomIndex];
      array[randomIndex] = temporaryValue;
    }
    return array;
  }

  // check for win condition when matched is equal to total card pairs
  function checkWin() {
    if (matched === CARD_PAIRS) {
      resetTimer();
      displayStats();
      toggleModal();
    }
  }

  // toggle the modal when needed
  function toggleModal() {
    const dialog = document.querySelector('.dialog');
    dialog.classList.toggle('hide');
  }

  // write stats to the modal
  function displayStats() {
    const time = document.querySelector('.clock').innerHTML;
    let moves = document.querySelector('.moves').innerHTML;
    const stars = document.querySelectorAll('.stars li');
    const modalStar = document.querySelector('.box-star');
    const modalInfo = document.querySelector('.box-info');
    moves++;
    modalInfo.innerHTML = `with ${moves} moves and took ${time} to complete`;
    // reset modalStar to avoid star appending
    modalStar.innerHTML = '';
    for (const star of stars) {
      if (star.style.display !== 'none') {
        // create star elements and add it to the modal
        const starElement = document.createElement('I');
        starElement.className = 'fa fa-star';
        starElement.style.fontSize = '34px';
        starElement.style.color = '#f0f000';
        modalStar.appendChild(starElement);
      }
    }
  }

  // reset the timer on game end or reset
  function resetTimer() {
    clearInterval(timer);
  }

  // reset the game to its initial state
  function resetGame() {
    matched = 0;
    resetTimer();
    clockRunning = true;
    // reset time
    time = 0;
    const clock = document.querySelector('.clock');
    clock.innerHTML = '0 : 00';
    // reset moves
    moves = 0;
    document.querySelector('.moves').innerHTML = `${moves}`;
    const stars = document.querySelectorAll('.stars li');
    // reset stars
    for (const star of stars) {
      star.style.display = 'inline-block';
    }
    // reset card state
    const cards = document.querySelectorAll('.deck li');
    for (const card of cards) {
      card.className = 'card animated';
    }
    // shuffle cards on reset
    cardShuffle();
  }

  // handle functionality to replay the game
  function replayGame() {
    resetGame();
    toggleModal();
  }

  // listeners for the buttons
  document.querySelector('.restart').addEventListener('click', resetGame);
  document.querySelector('.box-replay').addEventListener('click', replayGame);

  // shuffle cards on page load
  document.addEventListener('DOMContentLoaded', cardShuffle);
})();
