import { initializeHintButton, hideHintButton } from './hintButtonUtils';
import { clearEvaluationMessage, setUpActionButton, finishQuiz } from './quizUtils';
import { initializeProgressBar, markPoint, markStepAsInProgress } from './progressBar';

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
const displayQuestion = (question, selectedAnswer, quiz) => {
	let optionsContainer = document.querySelector('#options-wrapper');
	let questionContainer = document.querySelector('#question');
	let categoryContainer = document.querySelector('#category');
    
    optionsContainer.innerHTML = "";
    categoryContainer.innerHTML = "Category: " + question.topic;
	questionContainer.innerHTML = question.question;

	question.options.forEach((option, index) => {
        const optionDiv = document.createElement("div");
        optionDiv.className = index === selectedAnswer ? 'option chosen' : 'option';
        optionDiv.innerHTML = "<p class='text'>" + option + "</p>";
        optionDiv.onclick = () => { 
            quiz.setSelectedAnswer(index);
            displayQuestion(question, index, quiz);
        };
        optionsContainer.appendChild(optionDiv);

	});
}

export default class Quiz {

    /**
     * Set up question, and initialize all answers to not selected
     * @param {Question} questions - The part of quize
     */
    constructor(questions) {
        this.questions = questions;
        // -1 means not selected answer
        this.selectedAnswers = questions.map(_ => -1);
        this.availableQuestions = [];
        this.stepCounter = 0;
        for(let i = 0; i<  questions.length; i++) {
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
        let firstQuestion = this.getNextQuestion();
        this.currentQuestion = firstQuestion;
        displayQuestion(this.questions[firstQuestion], -1, this);
        setUpActionButton("Next random question",  () => this.goToNextQuestion())
        initializeHintButton(this.questions[firstQuestion].correct_answer);
        initializeProgressBar(this.questions.length);
    }

    isLastQuestion() {
        return this.availableQuestions.length === 0
    }

    checkCurrentAnswer() {
        return this.selectedAnswers[this.currentQuestion] === this.questions[this.currentQuestion].correct_answer;
    }

    goToNextQuestion() {
        this.stepCounter += 1;
        markPoint(this.stepCounter -1, this.checkCurrentAnswer());
        markStepAsInProgress(this.stepCounter, this.questions.length);
    
        let nextQuestion = this.getNextQuestion();
        if(this.isLastQuestion()) {
            setUpActionButton("Evaluate!", () => {
                let maxScore = this.questions.reduce((acc, next) => acc + next.score, 0);
                // look at this beautiful reduce to calculate total score :)
                let totalScore = this.questions.reduce((acc, next, i) => acc + (this.selectedAnswers[i] === next.correct_answer ? next.score : 0), 0);
                finishQuiz(totalScore, maxScore, () => this.restart());
                markPoint(this.stepCounter, this.checkCurrentAnswer());
            })
        }
        this.currentQuestion = nextQuestion;
        displayQuestion(this.questions[nextQuestion], -1, this);
        initializeHintButton(this.questions[nextQuestion].correct_answer);
    }

    /**
     * Set up answer for current question
     * @param {number} selectedAnswer - selected answer
     */
    setSelectedAnswer(selectedAnswer) {
        this.selectedAnswers[this.currentQuestion] = selectedAnswer;
    }

    restart() {
        clearEvaluationMessage();
        this.selectedAnswers = this.questions.map(_ => -1);
        this.availableQuestions = [];

        for(let i = 0; i<  this.questions.length; i++) {
            this.availableQuestions.push(i);
        }
        this.startQuiz();
        this.stepCounter = 0;
    }
}