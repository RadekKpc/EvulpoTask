export default class Quiz {
    constructor() {
        this.questions = [];
        this.selectedAnswers = [];
    }

    setQuestions(questions) {
        this.questions = questions;
        // -1 means not selected answer
        this.selectedAnswers = questions.map(_ => -1);
    }

    loadQuestions() {
        console.log(this.questions)   
    }
}