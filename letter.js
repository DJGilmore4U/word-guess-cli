// Constructor File controls whether or not a letter appears as a hidden character or a correctly guessed letter //
var lettersToDisplay = function (word, goodGuesses) {
    this.gameWord = word;
    this.goodLetters = goodGuesses;
    this.displayText = '';
    // To begin this declares that the player is not yet a winner //
    this.winner = false;
    // Displays the word to the player //
    this.parseDisplay = function () {
        var shown = '';
        // If statement that checks for no goodGuesses yet //
        if (this.goodLetters == undefined) {
            for (var i = 0; i < this.gameWord.length; i++) {
                // If not the letter
                shown += ' _ ';
            }
        }
        else {
            // For loop runs through the word itself and then checks for possible correct guess //
            for (var i = 0; i < this.gameWord.length; i++) {
                var letterWasFound = false;
                for (var g = 0; g < this.goodLetters.length; g++) {
                    if (this.gameWord[i] == this.goodLetters[g]) {
                        shown += this.goodLetters[g];
                        letterWasFound = true;
                    }
                }
                // If no letter was found //
                if (!letterWasFound) {
                    shown += ' _ ';
                }
            }
        }
        // Makes the text pretty for display //
        this.displayText = shown.trim();
        console.log(this.displayText);

        // Checks for player win //
        if (this.displayText == this.gameWord) {
            this.winner = true;
        }
    }
};
// exports the module to use elseware //
module.exports = lettersToDisplay;