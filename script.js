const animation = new AnimationA();
let circle = [];

function randomPoints() {
    let pointsCount = prompt("How many points you want?", "10");

    if (pointsCount != null && pointsCount !== "") {
        resetCanvasWithCircles([]);
        let circles = [];
        for(let i=0; i<pointsCount; i++) {
            let circle = new Circle(randomTo(canvas.width),randomTo(canvas.height));
            circles.push(circle);
        }

        start(circles);
    }
}

function loadCoordinatesFromFile() {
    let fileInput = document.getElementById('coordinate-file');
    if(fileInput.files[0]) {
        const f = fileInput.files[0];
        const reader = new FileReader();

        // Closure to capture the file information.
        reader.onload = (function(theFile) {
            return function(e) {
                resetCanvasWithCircles([]);
                let circles = JSON.parse(e.target.result);
                start(circles);
            };
        })(f);

        // Read in the image file as a data URL.
        reader.readAsText(f);
    }
}

function loadFromSelectedPoints() {
    resetCanvasWithCircles([]);
    let circles = [];
    for(let i=0; i<drownPoints.length; i++) {
        let circle = new Circle(drownPoints[i].x, drownPoints[i].y);
        circles.push(circle);
    }

    start(circles);
}

function clearCircles() {
    resetCanvasWithCircles([]);
    drownPoints = [];
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

function skipBackAnimation() {
    animation.skipBackAnimation();
}

function saveCoordinates() {
    download(JSON.stringify(circles), 'circles.txt', 'txt');
}

function animateCircles(circles) {
    for(let circle of circles) {
        animation.addAnimationStep(drawCircle, circle);
    }
}

function animateIntersections(circles, newCircles) {
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

        animation.addAnimationStep(drawCircle, newCircles[i], COLOR_PINK);
        animation.addAnimationStep(resetCanvasWithCircles, circles);
        i++;
    }
}

function animateFinalCircle(maxIntersectionPoint) {
    animation.addAnimationStep(drawCircle, new Circle(maxIntersectionPoint.x, maxIntersectionPoint.y), COLOR_PURPLE);
}

function start(circles) {
    this.circles = circles;
    animation.restart();

    let newCircles = [];
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

    if(!maxIntersectionPoint) {
        maxIntersectionPoint={x: circles[0].x, y: circles[0].y};
    }

    animateCircles(circles);
    animateIntersections(circles, newCircles);
    animateFinalCircle(maxIntersectionPoint);
}