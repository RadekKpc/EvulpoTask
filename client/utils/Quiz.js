/**
 * The complete question
 * @typedef {Object} Question
 * @property {string} id - unique indentifier
 * @property {string} topic - the category of the question like "Math","Geography" etc.
 * @property {string} question - the question itself
 * @property {string[]} options - available answers for question
 * @property {number} correct_answer - index of correct answer in options array
 * @property {number} score - indicates how difficult the question is
 */

/**
 * Render the question
 * @param {Question} question
 * @param {number} selectedAnswer
 */
export const setUpQuestion = (question, selectedAnswer) => {
	let optionsContainer = document.querySelector('#options-wrapper')
	let questionContainer = document.querySelector('#question');

	question.options.forEach((option, index) => {
        if(index === selectedAnswer) {
            optionsContainer.innerHTML+= "<div class='chosen option'><p class='text'>" + option + "</p></div>"
        } else {
            optionsContainer.innerHTML+= "<div class='unchosen option'><p class='text'>" + option + "</p></div>"
        }
	});
	questionContainer.innerHTML = question.question;
}

export default class Quiz {
    constructor() {
        this.questions = [];
        this.selectedAnswers = [];
        this.currentQuestion = 0;
    }

    /**
     * Set up question, and initialize all answers to not selected
     * @param {Question} questions - The part of quize
     */
    setQuestions(questions) {
        this.questions = questions;
        // -1 means not selected answer
        this.selectedAnswers = questions.map(_ => -1);
    }

    startQuiz() {
        setUpQuestion(this.questions[this.currentQuestion], -1);
    }
}