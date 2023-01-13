
const createProgressPoint = (index) => {
    const progressPointContainer = document.createElement("div");
    progressPointContainer.className = 'progress-point-container';
    progressPointContainer.id = `progress-point-container-${index}`;
    const progressPoint = document.createElement("div");
    progressPoint.className = 'progress-point';
    progressPoint.id = `progress-point-${index}`;

    progressPointContainer.appendChild(progressPoint);
    return progressPointContainer;
}

const createProgressBarLine = (index) => {
    const progressBarLine = document.createElement("div");
    progressBarLine.className = `progress-bar-line progress-bar-line-${index}`;
    return progressBarLine;
}

/**
 * It initialize progress bar
 * @param {number} pointCount - indicates how many steps it will have
 */
export const initializeProgressBar = (pointCount) => {
    let progressBarContainer = document.querySelector('#progress-bar-container');
    progressBarContainer.innerHTML = "";

    for(let i =0 ; i< pointCount; i++) {
        if(i == 0) {
            progressBarContainer.appendChild(createProgressPoint(i));
            continue;
        }
        if (i == pointCount -1) {
            progressBarContainer.appendChild(createProgressBarLine(i));
            progressBarContainer.appendChild(createProgressPoint(i)); 
            continue;
        }

        progressBarContainer.appendChild(createProgressBarLine(i));
        progressBarContainer.appendChild(createProgressPoint(i));
        progressBarContainer.appendChild(createProgressBarLine(i));
    }
}

/**
 * mark particular point as correct (green) or not (red)
 * @param {number} pointIndex indicates which point will be marked
 * @param {boolean} isCorrect true -> green, false -> red
 */
export const markPoint = (pointIndex, isCorrect) => {
    const progressPoint = document.querySelector(`#progress-point-${pointIndex}`);
    progressPoint.className += isCorrect ? " green_border" : " red_border";
}

/**
 * highlights which step is currently opened, fills the bar line with gray color
 * @param {number} stepIndex
 * @param {number} pointCount point count in the progress bar
 */
export const markStepAsInProgress = (stepIndex, pointCount) => {
    for(let i = 0; i < pointCount; i++) {
        let progressPointContainer = document.querySelector(`#progress-point-container-${i}`);
        progressPointContainer.className = "progress-point-container";
        if(i <= stepIndex) progressPointContainer.className += ' gray_background';

        let progressBarLines = document.getElementsByClassName(`progress-bar-line-${i}`);
        [...progressBarLines].forEach((line) => {
            line.className = `progress-bar-line progress-bar-line-${i}`;
            if(i <= stepIndex) line.className += ' gray_background';
        });
    }
}