const circles = [];

const animation = new AnimationA();
drawCircles();
drawIntersections();

function drawCircles() {
    for(let i=0; i<10; i++) {
        let circle = new Circle(randomTo(canvas.width),randomTo(canvas.height));
        circles.push(circle);
        animation.addAnimationStep(drawCircle, circle);
    }
}

function drawIntersections() {
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

        animation.addAnimationStep(resetCanvasWithCircles, circles);
    }
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
let intervals = [];
for(let circle of circles) {
    intervals = [];
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

    intervals.sort(function (first, second) {
        if (first.start !== second.start) {
            return first.start - second.start;
        }
        return first.end - second.end;
    });

    let intersectionsCounter = 0;
    if(intervals.length > 0) {
        // let prev = intervals[0];
        // intersectionsCounter++;
        // for(let i=1; i<intervals.length; i++) {
        //     let curr = intervals[i];
        //
        //     if(curr.start <= prev.end) {
        //         intersectionsCounter++;
        //     }
        //     prev = curr;
        // }
        let i=0;
        let j=0;
        let maxIntersectionsCounter = 0;
        let intersectionAngle = 0;
        while (i < intervals.length && j < intervals.length) {
            if (intervals[i].start <= intervals[j].end) {
                intersectionsCounter++;
                if (intersectionsCounter > maxIntersectionsCounter) {
                    maxIntersectionsCounter = intersectionsCounter;
                    intersectionAngle = intervals[i].start;
                }
                i++;
            } else {
                intersectionsCounter--;
                j++;
            }
        }
        console.log(maxIntersectionsCounter);
        console.log('----');
        if(maxIntersectionsCounter>maxIntersections) {
            maxIntersections = maxIntersectionsCounter;

            maxIntersectionPoint = {
                x: circle.x + circle.r * Math.cos(intersectionAngle * Math.PI / 180),
                y: circle.y - circle.r * Math.sin(intersectionAngle * Math.PI / 180)
            };
        }

    }
    //Maybe I can save all maxIntersectionPoint for all circles (for animation)

}

// drawCircle(new Circle(maxIntersectionPoint.x, maxIntersectionPoint.y), 'cyan');


