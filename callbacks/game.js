const imageArray = document.querySelectorAll(".user img"); // All user images
for (let index = 0; index < imageArray.length; index++) { // Add event listener to all user images with addBorder as the function
    const element = imageArray[index]; // Get the current image
    element.addEventListener("click", addBorder); // Add the event listener
}

function addBorder(event) {
    imageArray.forEach(img => img.classList.remove("border")); // Remove border from all images
    event.target.classList.add("border"); // Add border to the clicked image
    shuffleCards(500); // Start the computer's shuffle when a player image is clicked
} // Add border function from the JS Events worksheet 

const choices = ["rock", "paper", "scissors"]; // Computer Choices
const computerImages = document.querySelectorAll('.computer img'); // Computer Images
const result = document.querySelector('.result'); // Result of the game
const win = document.querySelector('.win'); // Win text
const lose = document.querySelector('.lose'); // Lose text

function shuffleCards(interval) {
    let index = 0; // First image
    const questionMarkImage = computerImages[0]; // Save reference to question mark image
    let shuffleInterval; // Interval for shuffling images

    // Hide all images except the question mark initially
    computerImages.forEach((img) => {
        img.hidden = true;
    });
    questionMarkImage.hidden = false; // Show the question mark image

    function shuffleImages() {
        computerImages.forEach((img) => {
            img.hidden = true; // Hide all images
        });
        
        // Show the current image (index + 1 to skip the question mark)
        computerImages[index + 1].hidden = false;
        
        index = (index + 1) % choices.length; // Move to the next image
    }

    
    shuffleInterval = setInterval(shuffleImages, interval); // Shuffle images every set interval

    setTimeout(() => { // Stop shuffling after 3 seconds and show the final choice
        clearInterval(shuffleInterval); // Stop the shuffling
        
        // Choose a random computer throw
        const randomIndex = Math.floor(Math.random() * choices.length);
        const computerThrow = choices[randomIndex];
        
        // Hide all images
        computerImages.forEach((img) => {
            img.hidden = true;
        });
        
        // Show the final chosen image
        for (let i = 1; i < computerImages.length; i++) {
            if (computerImages[i].id === computerThrow) {
                computerImages[i].hidden = false;
                break;
            }
        }
        
        decideWinner(computerThrow); // Use computerthrow as argument to decide the winner
        
    }, 3000);
}

function decideWinner(computerThrow) {
    const playerThrow = document.querySelector(".user img.border").id; // Get the player's throw
    console.log(`Player Throw: ${playerThrow}, Computer Throw: ${computerThrow}`); // Use this to verify if the visual matches up with the random choice
    win.hidden = true; // Hide win text for repeat games
    lose.hidden = true; // Hide lose text for repeat games
    result.textContent = "Result: "; // Clear previous result text
    if (playerThrow === computerThrow) { // Check for a tie
        result.textContent += "Tie!";
    } else if ( // Check for a win
        (playerThrow === "rock" && computerThrow === "scissors") ||
        (playerThrow === "paper" && computerThrow === "rock") ||
        (playerThrow === "scissors" && computerThrow === "paper")
    ) {
        win.hidden = false;
    } else { // If all else fails, its a loss
        lose.hidden = false;
    }
}
