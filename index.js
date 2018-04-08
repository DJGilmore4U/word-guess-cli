// This contains the logic of the game. The game will end when the player guesses the correct word or runs out of guesses.
// Declares dependencies //
var inquirer = require('inquirer');
var guessWordList = require('./list.js');
var checkForLetter = require('./word.js');
var lettersToDisplay = require('./letter.js');
var colors = require('colors');

// Declaring Gloval Variables //
var alphabet = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z'];
var lettersAlreadyGuessed = [];
var lettersCorrectlyGuessed = [];
var displayGame;

// Game Object and Function//
var game = {
    wordList: guessWordList, // imports array of words //
    guessesRemaining: 13, // Guesses allowed per word //
    currentWrd: null,
    startGame: function () {
        // Sets number of allowed player guesses to 13 //
        this.guessesRemaining = 13;
        // Gets random word from array in list.js //
        var g = Math.floor(Math.random() * this.wordList.length);
        this.currentWrd = this.wordList[g];
        // Tells Player that Game is On! //
        console.log('This is tough list of words... Do you think you can do it? Give it a shot!'.zebra);
        // Displays game progress //
        displayGame = new lettersToDisplay(this.currentWrd);
        displayGame.parseDisplay();
        console.log('Guesses Left: '.blue + game.guessesRemaining + ' !'.blue);
        // Asks player to pick a letter //
        keepPromptingUser();
    }
};
// User Prompt Function //
function keepPromptingUser() {
    console.log(''); // Keeps things clean in bash //
    // Checks for remaining guesses and asks user for a letter //
    if (game.guessesRemaining > 0) {
        inquirer.prompt([
            {
                type: "value",
                name: "letter",
                message: "Guess a Letter: "
            }
        ]).then(function (userInput) {
            // Stores player selection //
            var inputLetter = userInput.letter.toLowerCase();
            // If it is a valid selection //
            if (alphabet.indexOf(inputLetter) == -1) {
                console.log('Sorry to tell you but "'.random + inputLetter + '" could not be found in the word. Try again!'.random);
                console.log('Guesses Left: '.blue + game.guessesRemaining);
                console.log('Burner letters: '.red + lettersAlreadyGuessed);
                keepPromptingUser();
            }
            else if (alphabet.indexOf(inputLetter) != -1 && lettersAlreadyGuessed.indexOf(inputLetter) != -1) {
                console.log('You already guessed "'.yellow + inputLetter + '"! Make sure you check your list of burner letters before submitting you guess!'.yellow);
                console.log('Guesses Left: '.blue + game.guessesRemaining);
                console.log('Burner letters: '.red + lettersAlreadyGuessed);
                keepPromptingUser();
            }
            else {
                lettersAlreadyGuessed.push(inputLetter);
                // Check for the existence of the letter in the word //
                var letterInWord = checkForLetter(inputLetter, game.currentWrd);
                // If the letter exists in the word this updates the letter in the object //
                if (letterInWord) {
                    // Adds selection to the list of correct letters //
                    lettersCorrectlyGuessed.push(inputLetter);
                    // Show the unguessed letter spaces in random word //.
                    displayGame = new lettersToDisplay(game.currentWrd, lettersCorrectlyGuessed);
                    displayGame.parseDisplay();
                    // Checks to see if the player won, updates remaining guesses //
                    if (displayGame.winner) {
                        console.log('You win! Congrats!'.rainbow);
                        return;
                    }
                    else {
                        console.log('Guesses Left: '.blue + game.guessesRemaining);
                        console.log('Burner letters: '.red + lettersAlreadyGuessed);
                        keepPromptingUser();
                    }
                }
                else {
                    game.guessesRemaining--;
                    displayGame.parseDisplay();
                    console.log('Guesses Left: '.blue + game.guessesRemaining);
                    console.log('Burner letters: '.red + lettersAlreadyGuessed);
                    keepPromptingUser();
                }
            }
        });
    }
    // If out of guesses, Player loses the game //
    else {
        console.log('Sorry... I told you it was a tough list of words... Try again!'.america);
        console.log('Good try though... The word was "'.america + game.currentWrd + '", in case you were curious.'.america);
        console.log('---------------------------GAME OVER---------------------------'.america);
        console.log('--------Type "node index.js" + <enter> to play again!----------'.america);
    }
}
// Creates a new Game Object //
game.startGame();