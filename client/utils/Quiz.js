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
const setUpQuestion = (question, selectedAnswer) => {
	let optionsContainer = document.querySelector('#options-wrapper')
	let questionContainer = document.querySelector('#question');

	question.options.forEach((option, index) => {
        if(index === selectedAnswer) {
            optionsContainer.innerHTML+= "<div class='option chosen'><p class='text'>" + option + "</p></div>"
        } else {
            optionsContainer.innerHTML+= "<div class='option'><p class='text'>" + option + "</p></div>"
        }
	});
	questionContainer.innerHTML = question.question;
}

const finishQuiz = () => {
    console.log("summup score")
}

export default class Quiz {
    constructor() {
        this.questions = [];
        this.selectedAnswers = [];
        this.currentQuestion = 0;
        this.questionsCount = 0;
        this.availableQuestions =[];
    }

    /**
     * Set up question, and initialize all answers to not selected
     * @param {Question} questions - The part of quize
     */
    setQuestions(questions) {
        this.questions = questions;
        // -1 means not selected answer
        this.selectedAnswers = questions.map(_ => -1);
        this.questionsCount = questions.length;
        for(let i = 0; i< this.questionsCount; i++) {
            this.availableQuestions.push(i);
        }
    }

    getNextQuestion() {
        const avaiableQuestionsCount = this.availableQuestions.length;
        const randomQuestion = this.availableQuestions[Math.floor(Math.random() * avaiableQuestionsCount)];
        this.availableQuestions = this.availableQuestions.filter(v => v != randomQuestion)
        return randomQuestion;
    }

    startQuiz() {
        this.currentQuestion = this.getNextQuestion();
        setUpQuestion(this.questions[this.currentQuestion], -1);
    }

    goToNextQuestion() {
        this.currentQuestion = this.getNextQuestion();
        if(this.currentQuestion >= this.questionsCount) {
            finishQuiz();
        }
        setUpQuestion(this.questions[this.currentQuestion], -1);
    }
}