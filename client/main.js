// alert('js loaded!')
// this is a basic structure for evaluation of a single choice exercise
// INTENTIONALLY parts of the code have been deleted. 
//  It should serve as a hint towards finding a suitable solution for single choice exercise
// Written by GSoosalu ndr3svt

const API_KEY = 'AIzaSyCfuQLHd0Aha7KuNvHK0p6V6R_0kKmsRX4';
const DISCOVERY_DOCS = ["https://sheets.googleapis.com/$discovery/rest?version=v4"];
const SCOPES = "https://www.googleapis.com/auth/spreadsheets.readonly";

let questionsLoaded = false;
let domLoaded = false;

document.addEventListener('DOMContentLoaded', () => { 
	domLoaded = true;
	initQuiz();
})

window.handleClientLoad = function () {
	gapi.load('client', initClient);
}

function initClient() {
	gapi.client.init({
	  apiKey: API_KEY,
	  discoveryDocs: DISCOVERY_DOCS
	}).then(getExerciseData, 
	(error) => { console.log(JSON.stringify(error, null, 2)) });
}

function getExerciseData() {
	gapi.client.sheets.spreadsheets.values.get({
	  spreadsheetId: '1hzA42BEzt2lPvOAePP6RLLRZKggbg0RWuxSaEwd5xLc',
	  range: 'Learning!A1:F10',
	}).then((response) => {
		// data shaping here
		questionsLoaded = true;
		initQuiz();
	}, (response) => { console.log('Error: ' + response.result.error.message)});
}

function initQuiz(){
	if(questionsLoaded && domLoaded) {
		// load questions
	}
}
