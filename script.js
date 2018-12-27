var circles = [];

var animationStepFunctions = [];
var animationStepArgs = [];

function drawCircles() {
    for(let i=0; i<10; i++) {
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

var step = 0;
setInterval(() => {
    if(step < animationStepFunctions.length) {
        animationStepFunctions[step](...animationStepArgs[step]);
        step++;
    }
}, 500);
