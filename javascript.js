var playerScore = 0;
var computerScore = 0;
var playerSelection = "";
var computerSelection = "";
var roundNumber = 1;
var selectionMade = false;
var char = 0;
var timer = 0;

const roundNumberUI = document.querySelector('.player-instructions');
const playerScoreUI = document.querySelector('#player-score');
const computerScoreUI = document.querySelector('#computer-score');
const gameTitle = document.querySelector('.game-title');
const playerChoiceUI = document.querySelector('#player-choice')
const playerChoiceImg = playerChoiceUI.querySelector('img');
const computerChoiceUI = document.querySelector('#computer-choice')
const computerChoiceImg = computerChoiceUI.querySelector('img');

const selectionContainer = document.querySelector('.selection-container');
const playerButtons = selectionContainer.querySelectorAll('img');

const playerRockPNG = "./images/rock-left.png"
const playerPaperPNG = "./images/paper-left.png"
const playerScissorsPNG = "./images/scissors-left.png"
const computerRockPNG = "./images/rock-right.png"
const computerPaperPNG = "./images/paper-right.png"
const computerScissorsPNG = "./images/scissors-right.png"

playerButtons.forEach((img) => {
          img.addEventListener('click', () => {
                if (selectionMade === false) {
                    selectionMade = true;
                    img.classList.add('clicked');
                    playerSelection = img.id;
                    playRound();
                }
              });

          });

function getComputerChoice() {
    const computerChoice = ["rock", "paper", "scissors"]
    var i = Math.floor(3 * Math.random());
    return computerChoice[i]
}

function playRound() {
    if (playerScore >= 5 || computerScore >= 5) return;

    roundNumberUI.textContent = "ROUND " + roundNumber;
    animateTitle();
}

function showScores() {
    var computerSelection = getComputerChoice();
    if (playerSelection === "rock") {
        if (computerSelection === "rock") {
            tiedGame(playerSelection, computerSelection);
        } else if (computerSelection === "paper") {
            computerWins(playerSelection, computerSelection);
        } else if (computerSelection === "scissors") {
            playerWins(playerSelection, computerSelection);
        }
    }
    if (playerSelection === "paper") {
        if (computerSelection === "paper") {
            tiedGame(playerSelection, computerSelection);
        } else if (computerSelection === "scissors") {
            computerWins(playerSelection, computerSelection);
        } else if (computerSelection === "rock") {
            playerWins(playerSelection, computerSelection);
        }
    }
    if (playerSelection === "scissors") {
        if (computerSelection === "scissors") {
            tiedGame(playerSelection, computerSelection);
        } else if (computerSelection === "rock") {
            computerWins(playerSelection, computerSelection);
        } else if (computerSelection === "paper") {
            playerWins(playerSelection, computerSelection);
        }
    }

    if (playerScore === 5 || computerScore === 5) {
      endMatch();
    }
    roundNumber++;
}

function animateTitle() {
    onTick();
    timer = setInterval(onTick, 500);
}

function endMatch() {
    if (playerScore === 5) {
      winner = "You won the match!";
    } else if (computerScore === 5) {
      winner = "The computer won the match.";
    }
    selectionContainer.innerHTML = `<div class="selection-container">
    <h1 class="winner-announce">${winner}</h1>
    <button onclick="window.location.reload();" id="reset-game">Reset</button>
</div>`;
}

function tiedGame(playerSelection, computerSelection) {
    console.log("It's a tie! You both chose " + playerSelection + ".")
    displayScores()
}

function computerWins(playerSelection, computerSelection) {
    console.log("You lose! " + computerSelection.charAt(0).toUpperCase() + computerSelection.slice(1) + " beats " + playerSelection + ".")
    computerScore++
    displayScores()
}

function playerWins(playerSelection, computerSelection) {
    console.log("You win! " + playerSelection.charAt(0).toUpperCase() + playerSelection.slice(1) + " beats " + computerSelection + ".")
    playerScore++
    displayScores()
}

function displayScores() {
  playerScoreUI.textContent = playerScore;
  computerScoreUI.textContent = computerScore;
}

function gameInstructions() {
  alert("First to five is the winner!")
}

// gameInstructions();



function onTick() {
    if (char <=2) {
        const span = gameTitle.querySelectorAll('span')[char];
        span.classList.add('animate-title');}
        char++

    if (char === 4) {
        for (i=0; i<=2; i++) {
            const span = gameTitle.querySelectorAll('span')[i]
            span.classList.remove('animate-title');
        }
        playerButtons.forEach((img) => {
            img.classList.remove('clicked');
          })
        clearInterval(timer);
        timer = null;
        char = 0;
        timerMS = 0;
        selectionMade = false;
        showScores();
        return;
    }
}