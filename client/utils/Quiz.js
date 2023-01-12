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

export default class Quiz {
    constructor() {
        this.questions = [];
        this.selectedAnswers = [];
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

    loadQuestions() {
        console.log(this.questions)   
    }
}