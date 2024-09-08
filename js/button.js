/** 
DISCLOSURE: The initial structure of this code was generated with the help of ChatGPT. 
Subsequent modifications and improvements were made separately to meet specific project requirements.
*/

/** 
 * Class representing a game button.
 */
class GameButton {
    /**
     * Creates a new GameButton instance.
     * @param {number} number - The number displayed on the button.
     * @param {string} color - The background color of the button.
     */
    constructor(number, color) {
        this.buttonNumber = number;  // The button number that is displayed on the button
        this.buttonColor = color;    // The background color of the button

        // Create the button element in the DOM
        this.element = document.createElement('button');
        this.element.style.width = '10em';
        this.element.style.height = '5em';
        this.element.style.backgroundColor = color;
        this.element.classList.add('gameButton');  // Add a CSS class for styling
        this.element.textContent = number;  // Display the button's number as its text

        // Bind the click event handler to ensure `this` refers to the instance
        this.onClickHandler = this.handleClick.bind(this);
        this.element.addEventListener('click', this.onClickHandler);  // Add a click event listener
    }

    /** 
     * Handles the button click event.
     * Checks if the game is in a shuffling state and whether the button is clicked in the correct order.
     */
    handleClick() {
        // If the game is currently shuffling, prevent button clicks
        if (MemoryGame.isShuffling) {
            alert(waitForShuffleMessage);  // Alert the user to wait for the shuffle to complete
            return;
        }

        // If the clicked button number matches the next expected number
        if (this.buttonNumber === MemoryGame.nextExpectedNumber) {
            this.showButtonNumber();  // Show the button's number
            MemoryGame.nextExpectedNumber++;  // Increment the next expected number

            // If all buttons have been clicked in the correct order, the game ends
            if (MemoryGame.nextExpectedNumber > MemoryGame.totalButtons) {
                alert(successMemoryMessage);  // Alert the user of their success
                MemoryGame.endGame();  // End the game
            }
        } else {
            // If the button was clicked in the wrong order
            alert(incorrectOrderMessage);  // Alert the user that the order was incorrect
            MemoryGame.revealAllButtonNumbers();  // Reveal all button numbers
            MemoryGame.endGame();  // End the game
        }
    }

    /** 
     * Hides the button's number by setting the text to an empty string.
     */
    hideButtonNumber() {
        this.element.textContent = '';  // Clear the button's displayed number
    }

    /** 
     * Shows the button's number by setting the text to the button's number.
     */
    showButtonNumber() {
        this.element.textContent = this.buttonNumber;  // Display the button's number
    }
}