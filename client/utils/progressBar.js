
const createProgressPoint = (index) => {
    const progressPointContainer = document.createElement("div");
    progressPointContainer.className = 'progress-dot-container';
    const progressPoint = document.createElement("div");
    progressPoint.className = 'progress-dot';
    progressPoint.id = `progress-dot-${index}`;

    progressPointContainer.appendChild(progressPoint);
    return progressPointContainer;
}

const createProgressBarLine = (index) => {
    const progressBarLine = document.createElement("div");
    progressBarLine.className = `progress-bar-line`;
    progressBarLine.id = `progress-bar-line-${index}`;
    return progressBarLine;
}

/**
 * It initialize progress bar
 * @param {number} pointCount - indicates how many steps it will have
 */
export const initializeProgressBar = (pointCount) => {
    let progressBarContainer = document.querySelector('#progress-bar-container');
    progressBarContainer.innerHTML = "";

    console.log(progressBarContainer);
    for(let i =0 ; i< pointCount; i++) {
        if(i == 0) {
            progressBarContainer.appendChild(createProgressPoint(i));
            continue;
        }
        progressBarContainer.appendChild(createProgressBarLine(i));
        progressBarContainer.appendChild(createProgressPoint(i));
    }
}

/**
 * mark particular point as correct (green) or not (red)
 * @param {number} pointIndex indicates which point will be marked
 * @param {boolean} isCorrect true -> green, false -> red
 */
export const markPoint = (pointIndex, isCorrect) => {
    let progressPoint = document.querySelector(`#progress-dot-${pointIndex}`);
    progressPoint.className += isCorrect ? " green_border" : " red_border";
}

/**
 * highlights which step is currently opened, fills the bar line with gray color
 * @param {number} stepIndex
 * @param {number} pointCount point count in the progress bar
 */
export const markStepAsInProgress = (stepIndex, pointCount) => {
    for(let i = 1; i <= pointCount; i++) {
        let progressBarLine = document.querySelector(`#progress-bar-line-${index}`);
        progressBarLine.className = `progress-bar-line`;
        if(i <= stepIndex) progressBarLine.className +=  ' grey_background';
        
    }
}