var humanScore = 0;
var catScore = 0;
var humanSelection = "";
var catSelection = "";
var roundNumber = 1;
var selectionMade = false;
var char = 0;
var timer = 0;
var drawGame = false;
const pointsHTML = ["&#9312;", "&#9313;", "&#9314;", "&#9315;", "&#9316;"];
var catChoiceJpn = "";
var humanChoiceJpn = "";

const roundNumberUI = document.querySelector('.human-instructions');
const humanScoreDiv = document.querySelector('.human-score');
const catScoreDiv = document.querySelector('.cat-score');
const gameTitle = document.querySelector('.game-title');
const catChoiceDiv = document.querySelector('.cat-choice-div');
const humanChoiceDiv = document.querySelector('.human-choice-div');
const humanChoiceImg = document.getElementById('human-choice');
const catChoiceImg = document.getElementById("cat-choice");
const gameInfoUI = document.querySelector('.game-info');
const selectionContainer = document.querySelector('.selection-container');
const humanButtons = selectionContainer.querySelectorAll('img');
var catScoreUI = catScoreDiv.querySelectorAll('p');
var humanScoreUI = humanScoreDiv.querySelectorAll('p');

const humanRockPNG = "./images/rock-left.png";
const humanPaperPNG = "./images/paper-left.png";
const humanScissorsPNG = "./images/scissors-left.png";
const catRockPNG = "./images/cat-rock.png";
const catPaperPNG = "./images/cat-paper.png";
const catScissorsPNG = "./images/cat-scissors.png";
const blankPNG = "./images/blank.png";
const startGameAudio1 = new Audio('./audio/start-game-1.mp3');
const startGameAudio2 = new Audio('./audio/start-game-2.mp3');
const drawGameAudio = new Audio('./audio/draw-game.mp3');
const humanWinnerAudio = new Audio('./audio/human-winner.mp3');
const catWinnerAudio = new Audio('./audio/cat-winner.mp3');
const gameInfoAudio = new Audio('./audio/game-info.mp3');
const startGameString1 = "最初はグー"
const startGameString2 = "にゃんけんぽん！"
const drawGameString = "あいこでしょ"

newPlaybackRate = 1.2; // Speeds up audio playback rate to match animation
startGameAudio1.playbackRate = newPlaybackRate;
startGameAudio2.playbackRate = newPlaybackRate;
drawGameAudio.playbackRate = newPlaybackRate;
humanWinnerAudio.playbackRate = newPlaybackRate;
catWinnerAudio.playbackRate = newPlaybackRate;
gameInfoAudio.playbackRate = newPlaybackRate;

gameInfoAudio.play(); // Plays audio instructions when game first loads

humanButtons.forEach((img) => {
          img.addEventListener('click', () => {
                if (selectionMade === false) {
                    selectionMade = true; // locks player from making new selection until round is complete
                    img.classList.add('clicked'); // css highlights player selection
                    humanSelection = img.id;
                    playRound();
                }
              });
          });

function playRound() {
    roundNumberUI.classList.add("round");
    roundNumberUI.textContent = "ラウンド " + roundNumber;
    humanChoiceDiv.classList.remove("winner");
    humanChoiceDiv.classList.remove("loser");
    catChoiceDiv.classList.remove("winner");
    catChoiceDiv.classList.remove("loser");
    animateTitle();
}      

function getCatChoice() {
    const catChoice = ["rock", "paper", "scissors"]
    var i = Math.floor(3 * Math.random());
    return catChoice[i]
}

function showScores() {
    var catSelection = getCatChoice();

    switch (humanSelection) {
        case "rock":
            humanChoiceImg.src = humanRockPNG;
            humanChoiceJpn = "グー";
            break;
        case "paper":
            humanChoiceImg.src = humanPaperPNG;
            humanChoiceJpn = "パー";
            break;
        case "scissors":
            humanChoiceImg.src = humanScissorsPNG;
            humanChoiceJpn = "チョキ";
            break;
    }

    switch (catSelection) {
        case "rock":
            catChoiceImg.src = catRockPNG;
            catChoiceJpn = "グー";
            break;
        case "paper":
            catChoiceImg.src = catPaperPNG;
            catChoiceJpn = "パー";
            break;
        case "scissors":
            catChoiceImg.src = catScissorsPNG;
            catChoiceJpn = "チョキ";
            break;
    }

    if (humanSelection === "rock") {
        if (catSelection === "rock") {
            tiedGame(humanSelection, catSelection);
        } else if (catSelection === "paper") {
            catWins(humanSelection, catSelection);
        } else if (catSelection === "scissors") {
            humanWins(humanSelection, catSelection);
        }
    }
    if (humanSelection === "paper") {
        if (catSelection === "paper") {
            tiedGame(humanSelection, catSelection);
        } else if (catSelection === "scissors") {
            catWins(humanSelection, catSelection);
        } else if (catSelection === "rock") {
            humanWins(humanSelection, catSelection);
        }
    }
    if (humanSelection === "scissors") {
        if (catSelection === "scissors") {
            tiedGame(humanSelection, catSelection);
        } else if (catSelection === "rock") {
            catWins(humanSelection, catSelection);
        } else if (catSelection === "paper") {
            humanWins(humanSelection, catSelection);
        }
    }

    if (humanScore === 5 || catScore === 5) {
      endMatch();
    }
    roundNumber++;
}

function animateTitle() {
    onTick();
    timer = setInterval(onTick, 500);
}

function endMatch() {
    roundNumberUI.classList.remove("round");
    if (humanScore === 5) {
      winner = "おめでとう！勝ったね！やったねー！";
      humanWinnerAudio.play();
    } else if (catScore === 5) {
      winner = "ニャーニャー！猫が勝者だよー！やったね、ニャンコ！";
      catWinnerAudio.play();
    }
    selectionContainer.innerHTML = `<div class="selection-container">
    <h1 class="winner-announce">${winner}</h1>
    <button onclick="window.location.reload();" id="reset-game">もう一回遊ぼう！</button>
</div>`;
}

function tiedGame(humanSelection, catSelection) {
    displayScores()
    drawGame = true;
    gameInfoUI.textContent = "引き分けだね！";

}

function catWins(humanSelection, catSelection) {
    humanChoiceDiv.classList.add("loser");
    catChoiceDiv.classList.add("winner");
    catScore++
    drawGame = false;
    displayScores()
    gameInfoUI.textContent = catChoiceJpn + "は" + humanChoiceJpn + "に勝る!"
}

function humanWins(humanSelection, catSelection) {
    humanChoiceDiv.classList.add("winner");
    catChoiceDiv.classList.add("loser");
    humanScore++
    drawGame = false;
    displayScores()
    gameInfoUI.textContent = humanChoiceJpn + "は" + catChoiceJpn + "に勝る!"
}

function displayScores() {
    if (catScore > 0) {
        catScoreUI.item(catScore - 1).innerHTML = pointsHTML[catScore - 1];
    }
    if (humanScore >0) {
        humanScoreUI.item(humanScore - 1).innerHTML = pointsHTML[humanScore - 1];
    }
}

function onTick() {
    if (char == 0) {
        humanChoiceImg.classList.add("bounce");
        catChoiceImg.classList.add("bounce");
        humanChoiceImg.src = humanRockPNG;
        catChoiceImg.src = catRockPNG;
        if (drawGame === true) {
            gameInfoUI.textContent = drawGameString;
            drawGameAudio.play();
            char = 3;
            return;
        } else {
        gameInfoUI.textContent = startGameString1;
        startGameAudio1.play();
        }
    }

    if (char == 2) {
        gameInfoUI.textContent = startGameString2;
        startGameAudio2.play();
    }
    if (char === 3) {
        humanChoiceImg.classList.remove("bounce");
        catChoiceImg.classList.remove("bounce");
        humanButtons.forEach((img) => {
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
    char++;
}