/** 
DISCLOSURE: The initial structure of this code was generated with the help of ChatGPT. 
Subsequent modifications and improvements were made separately to meet specific project requirements.
*/

class MemoryGame {
    /** 
     * Static variables to manage the game state
     */
    static nextExpectedNumber = 1;  // The next expected button number in sequence
    static totalButtons = 0;        // Total number of buttons in the current game
    static gameButtons = [];        // Array to store the buttons created for the game
    static intervalId = null;       // ID for the interval used during button shuffling
    static isShuffling = false;     // Flag to indicate if the buttons are currently being shuffled

    /** 
     * Function to start the game
     * It takes the number of buttons as input and begins the game logic
     */
    static startGame(buttonCount) {
        MemoryGame.resetGame();
        MemoryGame.totalButtons = buttonCount;

        alert(gameStartMessage);

        for (let i = 1; i <= buttonCount; i++) {
            const newButton = new GameButton(i, MemoryGame.getRandomColor());
            document.body.appendChild(newButton.element);  
            MemoryGame.gameButtons.push(newButton);  
        }

        setTimeout(() => {
            MemoryGame.isShuffling = true;  
            let shuffleCount = 0;  

            MemoryGame.intervalId = setInterval(() => {
                MemoryGame.shuffleButtons();  
                shuffleCount++;

                if (shuffleCount === buttonCount) {
                    clearInterval(MemoryGame.intervalId);
                    MemoryGame.intervalId = null;
                    MemoryGame.hideAllButtonNumbers();  
                    MemoryGame.isShuffling = false;  
                }
            }, 2000);  
        }, buttonCount * 1000);  
    }

    /** 
     * Function to reset the game state
     * This function removes all buttons from the screen and resets game variables
     */
    static resetGame() {
        MemoryGame.nextExpectedNumber = 1;
        MemoryGame.totalButtons = 0;
        MemoryGame.gameButtons = [];
        MemoryGame.isShuffling = false;

        clearInterval(MemoryGame.intervalId);

        document.querySelectorAll('.gameButton').forEach(button => {
            button.remove();
        });

        document.getElementById('submitButton').disabled = false;
        document.getElementById('buttonForm').style.display = 'block';  
    }

    /** 
     * Function to randomly shuffle the buttons within the bounds of the browser window
     */
    static shuffleButtons() {
        const windowWidth = window.innerWidth;  
        const windowHeight = window.innerHeight;  

        for (const button of MemoryGame.gameButtons) {
            const randomX = Math.random() * (windowWidth - 100);  
            const randomY = Math.random() * (windowHeight - 100);  
            button.element.style.position = 'absolute';
            button.element.style.left = `${randomX}px`;
            button.element.style.top = `${randomY}px`;
        }
    }

    /** 
     * Function to hide the numbers on all buttons after shuffling
     */
    static hideAllButtonNumbers() {
        MemoryGame.gameButtons.forEach(button => {
            button.hideButtonNumber();
        });
    }

    /** 
     * Function to reveal the numbers on all buttons (for debugging or testing purposes)
     */
    static revealAllButtonNumbers() {
        MemoryGame.gameButtons.forEach(button => {
            button.showButtonNumber();
        });
    }

    /** 
     * Function to end the game
     * Displays a message and then resets the game after 3 seconds
     */
    static endGame() {
        alert(gameEndMessage);  
        setTimeout(() => {
            MemoryGame.resetGame();  
            document.getElementById('buttonForm').style.display = 'block';  
        }, 3000);
    }

    /** 
     * Function to generate a random color in hexadecimal format (e.g., #FF5733)
     */
    static getRandomColor() {
        const letters = '0123456789ABCDEF';  
        let color = '#';
        for (let i = 0; i < 6; i++) {
            color += letters[Math.floor(Math.random() * 16)];
        }
        return color;  
    }
}

/** 
 * Function to create the form for inputting the number of buttons
 */
function createForm() {
    const formContainer = document.createElement('div');
    formContainer.id = 'buttonForm';  

    formContainer.innerHTML = `
        <p>How many buttons to create?</p>
        <form id="buttonFormInner">
            <input type="text" id="numButtons" placeholder="Enter a number between 3 and 7">
            <input type="submit" value="Go!" id="submitButton">
        </form>
    `;

    document.body.appendChild(formContainer);

    /** 
     * Add event listener to handle form submission
     */
    document.getElementById('buttonFormInner').addEventListener('submit', function (event) {
        event.preventDefault();  

        const buttonCount = parseInt(document.getElementById('numButtons').value);  

        if (buttonCount >= 3 && buttonCount <= 7 && !isNaN(buttonCount)) {
            MemoryGame.startGame(buttonCount);  
            formContainer.style.display = 'none';  
        } else {
            alert(invalidInputMessage);  
        }
    });
}

/** 
 * Function to render the form when the DOM content is fully loaded
 */
function render() {
    createForm();  
}

/** 
 * Attach the render function to the DOMContentLoaded event
 */
document.addEventListener('DOMContentLoaded', render);