const RADIUS = 50;

class Circle {

    constructor(x, y) {
        this.x = x;
        this.y = y;
        this.r = RADIUS;
    }

}


class Interval {

    constructor(start, end) {
        this.start = start;
        this.end = end;
    }

}


class AnimationA {

    constructor() {
        this.step = 0;
        this.animation = null;
        this.animationStepFunctions = [];
        this.animationStepArgs = [];

    }

    addAnimationStep(animationFunction, ...functionArguments) {
        this.animationStepFunctions.push(animationFunction);
        this.animationStepArgs.push(functionArguments);
    }

    startAnimation() {
        this.stopAnimation();
        this.animation = setInterval(() => {
            this.nextStep();
        }, 500);
    }

    nextStep() {
        if(this.step < this.animationStepFunctions.length) {
            this.animationStepFunctions[this.step](...this.animationStepArgs[this.step]);
            this.step++;
        }
    }

    backStep() {
        if(this.step>0) {
            let newStep = this.step - 1;

            resetCanvasWithCircles([]);
            this.step=0;
            for(let i=0; i<newStep; i++) {
                this.nextStep();
            }
        }
    }

    stopAnimation() {
        clearInterval(this.animation);
    }

    skipAnimation() {
        while(this.step < this.animationStepFunctions.length) {
            this.nextStep()
        }
    }

}