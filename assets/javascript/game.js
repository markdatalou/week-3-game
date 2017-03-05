// GLOBAL VARIABLES (Accessible by all functions)
// ==================================================================================================

// Array of Word Options (all lowercase)
var wordsList   = ["january", "february", "march", "april", "may", "june", "july", "august", "september", "october", "november", "december"];
var chosenWord  = ""; 			// word that is randomly chosen
var lettersInChosenWord = []; 	// holds the individual letters that are in the chosenWord
var numBlanks	= 0; 			// number of blanks to show based on the chosenWord - this will vary by word
var blanksAndSuccesses = []; 	// Holds a mix of blank and solved letters (ex: 'd, _ _, e,m,b,e,_ _') 
var wrongGuesses = []; 			// Holds all of the wrong guesses

// Game counters
var winCounter  = 0; 			// keeps track of wins
var lossCounter = 0; 			// keeps track of losses
var numGuesses  = 9; 			// keeps track of guesses

/**********************************************************/
/*                        FUNCTIONS                       */
/**********************************************************/

//========================================================
// start() - function to start the game
//========================================================
 
function start() {
	
	numGuesses = 9;															// reset number of guesses left

	chosenWord = wordsList[Math.floor(Math.random() * wordsList.length)]; 	// random selection of chosenWord from wordList

	lettersInChosenWord = chosenWord.split(""); 							// the word is broken into individual letters

	numBlanks = lettersInChosenWord.length; 								// we cound the number of letters in the word

	blanksAndSuccesses = []; 												// reset the guess and success array at each round

	wrongGuesses = []; 														// reset the wrong guesses from the previous round.

	// Fill up the blanksAndSuccesses list with appropriate number of blanks. This is based on number of letters in word chosen
	for (var i=0; i <numBlanks; i++){
		blanksAndSuccesses.push("_");										// push a blank into the blankAndSuccesses arrary
	}

	// console.log(blanksAndSuccesses); 									// DEBUG print the initial blanks in console.
	
	document.getElementById("guessesLeft").innerHTML = numGuesses; 					// Reprints the guessesLeft to 9		
	
	// Prints the blanks at the beginning of each round in the HTML
	document.getElementById("wordblanks").innerHTML= blanksAndSuccesses.join(" ");	// Initialize HTML with blanks at start of round

	// Clears the wrong guesses from the previous round
	document.getElementById('wrongGuesses').innerHTML = wrongGuesses.join(" ");



}

//=================================================
// checkLettesr() function checks for matches
//=================================================

function checkLetters(letter) {

	var letterInWord = false; 				// Boolean toggled based on whether or not a user letter is found in the word

	// Check if letter is in the chosen word
	for (var i=0; i<numBlanks; i++) {
		if(chosenWord[i] == letter) {
			letterInWord = true; 			// if the letter exists, toggle this boolean to true.  
 		}
	}

	// If the letter exists in the word, determine specific position in word (1st char, 2nd char, ect.)
	if(letterInWord){
	
		// loop through the word 
		for (var i=0; i<numBlanks; i++){

			// Populate the blanksAndSuccesses with every instance of the letter.
			if(chosenWord[i] == letter) {
				blanksAndSuccesses[i] = letter; // set the specific positon in blanks and successes equal to the letter when there is a match.
			}
		}
		
	}
	// If the letter is not in the word
	else {
		wrongGuesses.push(letter); 				// add the letter to the list of wrong letters
		numGuesses--; 							// decrement numGuesses counter
	}
}

//=========================================================
// roundDone() function - cleans up after each guess is made
//=========================================================

function roundDone(){

	document.getElementById("wordblanks").innerHTML = blanksAndSuccesses.join(" "); // display guesses and blanks onto the page
	document.getElementById("wrongGuesses").innerHTML = wrongGuesses.join(" "); 	// display wrong guesses onto the page
	document.getElementById("guessesLeft").innerHTML= numGuesses;					// display guesses left onto the page

	// If user has guessed the correct letters 
	if (lettersInChosenWord.toString() == blanksAndSuccesses.toString()) {
		winCounter++; 							// increment win counter 

		
		document.getElementById("winCounter").innerHTML= winCounter;					// display latest # winds
		document.getElementById("wordblanks").innerHTML = blanksAndSuccesses.join(" ");	// display latest guesses and blanks
		alert("You win!. You chose: " + chosenWord); 									// alert user they've won this round
		start(); 																		// restart the game 
	}

	// If user has run out of guesses
	else if(numGuesses == 0) {
		lossCounter++; 	 																// increment the loss counter 
		alert("You lose"); 																// alert user they've loss this round

		// Update the loss counter in the HTML
		document.getElementById("lossCounter").innerHTML= lossCounter; 					// display latest # losses
		start(); 																		// restart the game
	}

}

//============================================================
// MAIN PROCESS 
//===========================================================


// Start the Game by running the start() function
start();

// Capture key clicks.
document.onkeyup = function(event) {
	letterGuessed = String.fromCharCode(event.keyCode).toLowerCase(); 	// converts all key clicks to lowercase lettesr
	
	checkLetters(letterGuessed); 										// runs the code to check for correctness 
	roundDone(); 														// runs the code after each round is done
}