function getComputerChoice() {
    // Create string array and fill with possible choices
    var computerChoice = ["rock", "paper", "scissors"]
    // Generate random number between 0-2
    var i = Math.floor(3 * Math.random());
    // Return string from random index as computer's "choice"
    return computerChoice[i]
}

// Create function that plays a single round of Rock Paper Scissors. 
// The function should take two parameters - the playerSelection (case-insensitive) and computerSelection
// Return a string that declares the winner of the round like so: "You Lose! Paper beats Rock"

function playRound(playerSelection, computerSelection) {

    console.log("You chose " + playerSelection + ".")
    console.log("The computer chose " + computerSelection + ".")

// If player chooses Rock
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

function game() {
    let numOfRounds = 1;

    // Loop to play game five times
    while (numOfRounds <= 5) {
    
    //Prompt player for their choice, exit game if cancelled
    let playerSelection = prompt("Rock, Paper, or Scissors?");
    if (playerSelection === null) {
        console.log("Goodbye!")
        return
    } else {
        // Convert player choice to lowercase
        playerSelection = playerSelection.toLowerCase();
    }

    let computerSelection = getComputerChoice();
    console.log("")
    console.log("--ROUND " + numOfRounds + "--")
    playRound(playerSelection, computerSelection);
    numOfRounds++ // Increment round number
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
var playerScore = 0;
var computerScore = 0;

game();
