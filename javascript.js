var playerScore = 0;
var computerScore = 0;
var roundNumber = 0;

function getComputerChoice() {
    var computerChoice = ["rock", "paper", "scissors"]
    var i = Math.floor(3 * Math.random());
    return computerChoice[i]
}

function playRound(playerSelection, computerSelection) {

    console.log("You chose " + playerSelection + ".")
    console.log("The computer chose " + computerSelection + ".")

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
    console.log("SCORE: You: " + playerScore + " | Computer: " + computerScore);
}

function getPlayerChoice() {
    let playerSelection;
    while (playerSelection !== "rock" && playerSelection !== "paper" && playerSelection !== "scissors") {
        playerSelection = prompt("Rock, Paper, or Scissors?");
        if (playerSelection === null) {
            return "cancel"
        } else {
            playerSelection = playerSelection.toLowerCase();
            if (playerSelection === "rock" || playerSelection === "paper" || playerSelection === "scissors") {
                return playerSelection;
            } else {
                alert("Not an option. Please enter either 'rock', 'paper', or 'scissors'.")
            }
        }
    }
}

function game() {
    playerScore = 0;
    computerScore = 0;
    roundNumber = 1;

    // Loop to play game five times
    while (roundNumber <= 5) {
    
    let playerSelection = getPlayerChoice();
    if (playerSelection === "cancel") {
        console.log("Goodbye!")
        return
    }
    let computerSelection = getComputerChoice();
    console.log("")
    console.log("--ROUND " + roundNumber + "--")
    playRound(playerSelection, computerSelection);
    roundNumber++ // Increment round number
    }
    console.log("")
    if (playerScore > computerScore) {
        console.log("YOU WIN!")
    }
    if (playerScore === computerScore) {
        console.log("It's a tie!")
    }
    if (playerScore < computerScore) {
        console.log("YOU LOSE.")
    }
    displayScores();
}

// Call function to begin game
game();
