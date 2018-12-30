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
        this._step = 0;
        this._animation = null;
        this._animationStepFunctions = [];
        this._animationStepArgs = [];

    }

    addAnimationStep(animationFunction, ...functionArguments) {
        this._animationStepFunctions.push(animationFunction);
        this._animationStepArgs.push(functionArguments);
    }

    startAnimation() {
        this.stopAnimation();
        this._animation = setInterval(() => {
            if(!this.nextStep()) {
                this.stopAnimation();
            }
        }, 500);
    }

    nextStep() {
        if(this._step < this._animationStepFunctions.length) {
            this._animationStepFunctions[this._step](...this._animationStepArgs[this._step]);
            this._step++;
            return true;
        }

        return false;
    }

    backStep() {
        if(this._step>0) {
            let newStep = this._step - 1;

            resetCanvasWithCircles([]);
            this._step=0;
            for(let i=0; i<newStep; i++) {
                this.nextStep();
            }
        }
    }

    stopAnimation() {
        clearInterval(this._animation);
    }

    skipAnimation() {
        while(this._step < this._animationStepFunctions.length) {
            this.nextStep()
        }
    }

    skipBackAnimation() {
        resetCanvasWithCircles([]);
        this._step = 0;
    }

    restart() {
        this._step = 0;
        this._animationStepFunctions = [];
        this._animationStepArgs = [];
    }
}