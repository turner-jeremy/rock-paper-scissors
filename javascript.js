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
catChoiceJpn = "";
humanChoiceJpn = "";

const roundNumberUI = document.querySelector('.human-instructions');
const humanScoreDiv = document.querySelector('.human-score');
const catScoreDiv = document.querySelector('.cat-score');
const gameTitle = document.querySelector('.game-title');
const humanChoiceImg = document.getElementById('human-choice');
const catChoiceImg = document.getElementById("cat-choice");
const gameInfoUI = document.querySelector('.game-info');
const gameStatusUI = document.querySelector('.game-status');

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

const startGameString1 = "最初はグー"
const startGameString2 = "にゃんけんぽん！"
const drawGameString = "あいこでしょ"

humanButtons.forEach((img) => {
          img.addEventListener('click', () => {
                if (selectionMade === false) {
                    selectionMade = true;
                    img.classList.add('clicked');
                    humanSelection = img.id;
                    playRound();
                }
              });

          });

function getCatChoice() {
    const catChoice = ["rock", "paper", "scissors"]
    var i = Math.floor(3 * Math.random());
    return catChoice[i]
}

function playRound() {
    if (humanScore >= 5 || catScore >= 5) return;
    roundNumberUI.classList.add("round");
    roundNumberUI.textContent = "ラウンド " + roundNumber;
    humanChoiceImg.classList.remove("winner");
    humanChoiceImg.classList.remove("loser");
    catChoiceImg.classList.remove("winner");
    catChoiceImg.classList.remove("loser");
    // humanChoiceImg.src = blankPNG;
    // catChoiceImg.src = blankPNG;
    animateTitle();
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
      winner = "おめでとう！マッチ勝ってしまったね！やったねー！";
    } else if (catScore === 5) {
      winner = "ニャーニャー！猫が勝者だよー！やったね、ニャンコ！";
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
    humanChoiceImg.classList.add("loser");
    catChoiceImg.classList.add("winner");
    catScore++
    drawGame = false;
    displayScores()
    gameInfoUI.textContent = catChoiceJpn + "は" + humanChoiceJpn + "に勝る!"
}

function humanWins(humanSelection, catSelection) {
    humanChoiceImg.classList.add("winner");
    catChoiceImg.classList.add("loser");
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
        gameStatusUI.textContent = "";
        humanChoiceImg.src = humanRockPNG;
        catChoiceImg.src = catRockPNG;

        if (drawGame === true) {
            gameInfoUI.textContent = drawGameString;
            char = 3;
            return;
        } else {
        gameInfoUI.textContent = startGameString1;
        }
    }

    if (char == 2) {
        gameInfoUI.textContent = startGameString2;
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