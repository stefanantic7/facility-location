const canvas = document.getElementById("canvas-section");
const ctx = canvas.getContext("2d");

const COLOR_BLACK = '#000';
const COLOR_BLUE = '#00F';
const COLOR_RED = '#F00';
const COLOR_GREEN = '#0F0';

function resizeCanvas() {
    canvas.width = window.innerWidth-30;     // equals window dimension
    canvas.height = window.innerHeight-200;
}

resizeCanvas();
window.onresize = function (event) {
    resizeCanvas();
};


function drawCircle(circle, color = COLOR_BLACK) {
    ctx.beginPath();
    ctx.strokeStyle = color;
    ctx.fillStyle = color;
    ctx.fillRect(circle.x-1, circle.y-1, 2, 2);
    ctx.arc(circle.x, circle.y, RADIUS, 0, 2 * Math.PI);
    ctx.stroke();
}

function resetCanvasWithCircles(circles = []) {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    for(let circle of circles) {
        drawCircle(circle);
    }
}
