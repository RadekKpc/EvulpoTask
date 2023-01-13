/**
 * Changes options' borders to show which answer is correct
 * @param {number} correct_answer_index
 */
const showCorrectAnswers = (correct_answer_index) => {
	let options = document.getElementsByClassName('option');
    [...options].forEach((option, index) => {
        if(index === correct_answer_index) {
            option.classList.add("green_border");
        } else {
            option.classList.add("red_border");
        }
    });
}

/**
 * Shows hint button and set its oclick function to show right answer
 * @param {number} correct_answer_index
 */
export const initializeHintButton = (correct_answer_index) => {
    let hintButton = document.querySelector('#hint-button');
    hintButton.style.display = 'block';
    hintButton.onclick = () => showCorrectAnswers(correct_answer_index);
}

export const hideHintButton = () => {
    let hintButton = document.querySelector('#hint-button');
    hintButton.style.display = 'none';
}

