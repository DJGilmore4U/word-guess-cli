// Constructor File contains the methods which will check the letters guessed against the random word selected in list.js //
function checkForLetter(letter, word) {
    // Checks if the letter guessed is contained in the random word //
    if (word.indexOf(letter) != -1) {
        return true;
    }
    else {
        return false;
    }
}
// Exports the module for use elseware //
module.exports = checkForLetter;