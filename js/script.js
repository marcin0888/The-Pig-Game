"use strict";

//Selecting elements
const player0El = document.querySelector(".player--0");
const player1El = document.querySelector(".player--1");
const score0El = document.querySelector("#score--0");
const score1El = document.getElementById("score--1");
const current0El = document.getElementById("current--0");
const current1El = document.getElementById("current--1");

const diceEl = document.querySelector(".dice");
const btnNew = document.querySelector(".btn--new");
const btnRoll = document.querySelector(".btn--roll");
const btnHold = document.querySelector(".btn--hold");
const info = document.querySelector(".btn--info");
const pig1 = document.querySelector(".pig1");
const pig2 = document.querySelector(".pig2");
const pig3 = document.querySelector(".pig3");

let scores, currentScore, activePlayer, playing;

//Sterting conditions

const init = function () {
  scores = [0, 0];
  currentScore = 0;
  activePlayer = 0;
  playing = true;

  score0El.textContent = 0;
  score1El.textContent = 0;
  current0El.textContent = 0;
  current1El.textContent = 0;

  diceEl.classList.add("hidden");
  info.classList.add("hidden");
  pig1.classList.add("hidden");
  pig2.classList.add("hidden");
  pig3.classList.add("hidden");
  player0El.classList.remove("player--winner");
  player1El.classList.remove("player--winner");
  player0El.classList.add("player--active");
  player1El.classList.remove("player--active");
};

init();

const switchPlayer = function () {
  document.getElementById(`current--${activePlayer}`).textContent = 0;
  currentScore = 0;
  activePlayer = activePlayer === 0 ? 1 : 0;
  player0El.classList.toggle("player--active");
  player1El.classList.toggle("player--active");
};

//Rolling dice functionality
btnRoll.addEventListener("click", function () {
  if (playing) {
    //Generating random dice roll
    const dice = Math.trunc(Math.random() * 6) + 1;
    //Display dice
    diceEl.classList.remove("hidden");
    diceEl.src = `img/dice-${dice}.png`;

    //Check for rolled 1: if true, switch to next player
    if (dice !== 1) {
      currentScore = currentScore + dice;
      document.getElementById(`current--${activePlayer}`).textContent =
        currentScore;
    } else {
      switchPlayer();
    }
  }
});

btnHold.addEventListener("click", function () {
  if (playing) {
    //Add current score to active player score
    scores[activePlayer] += currentScore;
    document.getElementById(`score--${activePlayer}`).textContent =
      scores[activePlayer];
    //Check if score >= 100
    if (scores[activePlayer] >= 100) {
      playing = false;
      diceEl.classList.add("hidden");

      //Finish the game
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.add("player--winner");
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.remove("player--active");
      info.classList.remove("hidden");
      pig1.classList.remove("hidden");
      pig2.classList.remove("hidden");
      pig3.classList.remove("hidden");
      info.textContent = `Player ${activePlayer + 1} won`;
    }
    //Switch to another player
    else {
      switchPlayer();
    }
  }
});

btnNew.addEventListener("click", init);
