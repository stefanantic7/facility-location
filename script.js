const circles = [];
const newCircles = [];
const animation = new AnimationA();

for(let i=0; i<10; i++) {
    let circle = new Circle(randomTo(canvas.width),randomTo(canvas.height));
    circles.push(circle);
}


function startAnimation() {
    animation.startAnimation();
}

function nextStep() {
    animation.nextStep();
}

function backStep() {
    animation.backStep();
}

function stopAnimation() {
    animation.stopAnimation();
}

function skipAnimation() {
    animation.skipAnimation();
}


let maxIntersections = 0;
let maxIntersectionPoint = null;
for(let circle of circles) {
    let intersectionPoint = null;

    let intervals = getIntersectionsIntervals(circle, circles);

    intervals.sort(function (first, second) {
        if (first.start !== second.start) {
            return first.start - second.start;
        }
        return first.end - second.end;
    });

    let intersectionsCounter = 0;
    if(intervals.length > 0) {
        let maxIntersectionsCounter = 0;
        let intersectionAngle = 0;

        let j = 0;
        for(let i=0; i<intervals.length && j<intervals.length; i++) {
            if (intervals[i].start <= intervals[j].end) {
                intersectionsCounter++;
                if (intersectionsCounter > maxIntersectionsCounter) {
                    maxIntersectionsCounter = intersectionsCounter;
                    intersectionAngle = intervals[i].start; //start or end
                }
            } else {
                intersectionsCounter--;
                j++;
            }
        }

        intersectionPoint = {
            x: circle.x + circle.r * Math.cos(intersectionAngle * Math.PI / 180),
            y: circle.y - circle.r * Math.sin(intersectionAngle * Math.PI / 180)
        };

        console.log(maxIntersectionsCounter);
        console.log('----');

        //Store global point with max intersections
        if(maxIntersectionsCounter>maxIntersections) {
            maxIntersections = maxIntersectionsCounter;

            maxIntersectionPoint = intersectionPoint;
        }

    }

    if(intersectionPoint) {
        newCircles.push(new Circle(intersectionPoint.x, intersectionPoint.y));
    }
    else {
        newCircles.push(new Circle(circle.x, circle.y));
    }
}

function getIntersectionsIntervals(circle, circles) {
    let intervals = [];
    for(let circle2 of circles) {

        if(circle2 !== circle) {
            let intersectionPoints = getIntersectionPoints(circle, circle2);
            if (intersectionPoints[0] && intersectionPoints[1]){
                let pointA = intersectionPoints[0];
                let pointB = intersectionPoints[1];

                let angleA = getAngleRelativeToX(circle.x, circle.y, pointA.x, pointA.y);
                let angleB = getAngleRelativeToX(circle.x, circle.y, pointB.x, pointB.y);

                let angleMax = Math.max(angleA, angleB);
                let angleMin = Math.min(angleA, angleB);

                // Set interval from angleA to angleB
                if(angleMax - angleMin > 180) {
                    angleA = angleMax;
                    angleB = angleMin;
                }
                else {
                    angleA = angleMin;
                    angleB = angleMax;
                }

                if(angleA > angleB) { //Should split interval
                    intervals.push(new Interval(0, angleB));
                    intervals.push(new Interval(angleA, 360));
                }
                else {
                    intervals.push(new Interval(angleA, angleB));
                }

            }
        }
    }

    return intervals;
}










animateCircles();
animateIntersections();
animateFinalCircle();

function animateCircles() {
    for(let circle of circles) {
        animation.addAnimationStep(drawCircle, circle);
    }
}

function animateIntersections() {
    let i = 0;
    for(let circle of circles) {
        animation.addAnimationStep(drawCircle, circle, COLOR_BLUE);

        for(let circle2 of circles) {
            if(circle2 !== circle) {
                let intersectionPoints = getIntersectionPoints(circle, circle2);

                if (intersectionPoints[0] && intersectionPoints[1]){
                    animation.addAnimationStep(drawCircle, circle2, COLOR_GREEN);
                }
                else {
                    animation.addAnimationStep(drawCircle, circle2, COLOR_RED);
                }
            }
        }

        animation.addAnimationStep(drawCircle, newCircles[i], 'cyan');
        animation.addAnimationStep(resetCanvasWithCircles, circles);
        i++;
    }
}

function animateFinalCircle() {
    if(maxIntersectionPoint) {
        animation.addAnimationStep(drawCircle, new Circle(maxIntersectionPoint.x, maxIntersectionPoint.y), 'cyan');
    }
    else {
        animation.addAnimationStep(drawCircle, new Circle(circles[0].x, circles[0].y), 'cyan');
    }
}