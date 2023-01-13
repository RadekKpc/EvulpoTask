import { hideHintButton } from './hintButtonUtils';

export const clearEvaluationMessage = () => {
    let evMessage = document.querySelector('#evaluation-message')
    evMessage.innerHTML = "";
}

/**
 * Changes the name of the action button and its onclick function
 * @param {string} buttonName
 * @param {function} onClick
 */
export const setUpActionButton = (buttonName, onClick) => {
    let actionButton = document.querySelector('#action-button');
    actionButton.innerHTML = buttonName;
    actionButton.onclick = onClick;
}

/**
 * Changes view to summary of the quiz
 * @param {number} score
 * @param {number} maxScore
 * @param {function} restartFunction - function that allows to start quiz again
 */
export const finishQuiz = (score, maxScore, restartFunction) => {
	let optionsContainer = document.querySelector('#options-wrapper');
	let questionContainer = document.querySelector('#question');
	let categoryContainer = document.querySelector('#category');
	let evMessage = document.querySelector('#evaluation-message');
    let actionButton = document.querySelector('#action-button');

    optionsContainer.innerHTML = "";
    questionContainer.innerHTML = "";
    categoryContainer.innerHTML = "";

    evMessage.innerHTML = `Your score is ${score}/${maxScore}!`;
    actionButton.innerHTML = "Try again :)";
    actionButton.onclick = restartFunction

    hideHintButton();
}