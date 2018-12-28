var circles = [];

var animationStepFunctions = [];
var animationStepArgs = [];

function drawCircles() {
    for(let i=0; i<30; i++) {
        let circle = new Circle(randomTo(canvas.width),randomTo(canvas.height));
        circles.push(circle);
        animationStepFunctions.push(drawCircle);
        animationStepArgs.push([circle]);
    }
}

function drawIntersections() {
    for(let circle of circles) {
        animationStepFunctions.push(drawCircle);
        animationStepArgs.push([circle, COLOR_BLUE]);

        for(let circle2 of circles) {
            if(circle2 !== circle) {
                animationStepFunctions.push(drawCircle);
                let intersectionPoints = getIntersectionPoints(circle, circle2);
                if (intersectionPoints[0] && intersectionPoints[1]){
                    animationStepArgs.push([circle2, COLOR_GREEN]);
                }
                else {
                    animationStepArgs.push([circle2, COLOR_RED]);
                }
            }
        }

        animationStepFunctions.push(resetCanvasWithCircles);
        animationStepArgs.push([circles]);
    }
}



drawCircles();
drawIntersections();

let step = 0;
let animation = null;

function startAnimation() {
    animation = setInterval(() => {
        nextStep();
    }, 500);
}

function nextStep() {
    if(step < animationStepFunctions.length) {
        animationStepFunctions[step](...animationStepArgs[step]);
        step++;
    }
}

function backStep() {
    if(step>0) {
        let newStep = step - 1;

        resetCanvasWithCircles([]);
        step=0;
        for(let i=0; i<newStep; i++) {
            nextStep();
        }
    }
}

function stopAnimation() {
    clearInterval(animation);
}

function skipAnimation() {
    while(step < animationStepFunctions.length) {
        nextStep()
    }
}


// let maxIntersections = 0;
// let maxIntersectionPoint = null;
// let intervals = [];
// for(let circle of circles) {
//     intervals = [];
//     for(let circle2 of circles) {
//
//         if(circle2 !== circle) {
//             let intersectionPoints = getIntersectionPoints(circle, circle2);
//             if (intersectionPoints[0] && intersectionPoints[1]){
//                 let pointA = intersectionPoints[0];
//                 let pointB = intersectionPoints[1];
//
//                 let angleA = getAngleRelativeToX(circle.x, circle.y, pointA.x, pointA.y);
//                 let angleB = getAngleRelativeToX(circle.x, circle.y, pointB.x, pointB.y);
//
//                 let angleMax = Math.max(angleA, angleB);
//                 let angleMin = Math.min(angleA, angleB);
//
//                 // Set interval from angleA to angleB
//                 if(angleMax - angleMin > 180) {
//
//                     angleA = angleMax;
//                     angleB = angleMin;
//                 }
//                 else {
//                     angleA = angleMin;
//                     angleB = angleMax;
//                 }
//
//                 if(angleA > angleB) { //Should split interval
//                     intervals.push(new Interval(0, angleB));
//                     intervals.push(new Interval(angleA, 360));
//                 }
//                 else {
//                     intervals.push(new Interval(angleA, angleB));
//                 }
//
//             }
//         }
//     }
//
//     intervals.sort(function (x, y) {
//         if (x.start != y.end) {
//             return x.start - y.end;
//         }
//         return x.end - y.end;
//     });
//
//     // console.log('------');
//     // console.log(intervals);
//     let intersectionsCounter = 0;
//     let okayPoint = null;
//     if(intervals.length > 0) {
//         let prev = intervals[0];
//         intersectionsCounter++;
//         for(let i=1; i<intervals.length; i++) {
//             let curr = intervals[i];
//
//             if(curr.start <= prev.end) {
//                 intersectionsCounter++;
//             }
//             prev = curr;
//         }
//
//         if(intersectionsCounter>maxIntersections) {
//             maxIntersections = intersectionsCounter;
//             // From prev.end find point by that angle and center of the circle
//             // maxIntersectionPoint = prev.end;
//         }
//     }
// }
