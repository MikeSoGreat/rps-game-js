let pcMove = "";
let result = "";
let chosenMoves = "";

let score = JSON.parse(localStorage.getItem("score")) || {
  wins: 0,
  losses: 0,
  ties: 0,
};

scoreCounter();

function playGame(userMove) {
  pcMove = Math.random();
  if (pcMove < 1 / 3) {
    pcMove = "✊";
  } else if (pcMove > 1 / 3 && pcMove < 2 / 3) {
    pcMove = "✋";
  } else {
    pcMove = "✌️";
  }

  if (pcMove === userMove) {
    score.ties++;
    result = "It's a Tie!";
  } else if (
    (pcMove === "✊" && userMove === "✋") ||
    (pcMove === "✋" && userMove === "✌️") ||
    (pcMove === "✌️" && userMove === "✊")
  ) {
    score.wins++;
    result = "You Win!";
  } else {
    score.losses++;
    result = "You Lose!";
  }

  localStorage.setItem("score", JSON.stringify(score));

  resultElm = document.querySelector(".js-result");
  whatHappened = document.querySelector(".js-what-happened");
  whatHappened.innerHTML = `You <span class="js-user-move user-move"></span> <span class="js-pc-move pc-move"></span> PC`;
  chosenMovesElm = document.querySelector(".js-who-picked-what");
  userMoveElm = document.querySelector(".js-user-move");
  pcMoveElm = document.querySelector(".js-pc-move");

  scoreCounter();

  resultElm.innerHTML = result;
  // chosenMovesElm.innerHTML = chosenMoves;
  userMoveElm.innerHTML = userMove;
  pcMoveElm.innerHTML = pcMove;

  if (result === "You Win!") {
    userMoveElm.classList.add("winner-user");
    pcMoveElm.classList.add("loser-pc");
  } else if (result === "You Lose!") {
    userMoveElm.classList.add("loser-user");
    pcMoveElm.classList.add("winner-pc");
  } else if (result === "It's a Tie!") {
    userMoveElm.classList.add("tie-user");
    pcMoveElm.classList.add("tie-pc");
  }
}

function scoreCounter() {
  winsElm = document.querySelector(".js-game-wins") || 0;
  tiesElm = document.querySelector(".js-game-ties") || 0;
  lossesElm = document.querySelector(".js-game-losses") || 0;

  winsElm.innerHTML = score.wins;
  lossesElm.innerHTML = score.losses;
  tiesElm.innerHTML = score.ties;
}

function resetScore() {
  score = {
    wins: 0,
    losses: 0,
    ties: 0,
  };

  scoreCounter();

  localStorage.removeItem("score");
}
