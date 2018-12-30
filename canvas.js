const canvas = document.getElementById("canvas-section");
const ctx = canvas.getContext("2d");

const COLOR_BLACK = '#000';
const COLOR_BLUE = '#00F';
const COLOR_RED = '#F00';
const COLOR_GREEN = '#0F0';
const COLOR_PURPLE = '#6247ff';
const COLOR_PINK = '#ff12f0';

let elemLeft = canvas.offsetLeft;
let elemTop = canvas.offsetTop;

let drownPoints = [];
canvas.addEventListener('click', function(e) {
    let x = event.pageX - elemLeft;
    let y = event.pageY - elemTop;

    drawPoint(x,y);
    drownPoints.push({x: x, y: y});

}, false);

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
    drawPoint(circle.x, circle.y, color);
    ctx.arc(circle.x, circle.y, RADIUS, 0, 2 * Math.PI);
    ctx.stroke();
}

function drawPoint(x, y, color = COLOR_BLACK) {
    ctx.fillStyle = color;
    ctx.fillRect(x-1,   y-1, 2, 2);
}
function resetCanvasWithCircles(circles = []) {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    for(let circle of circles) {
        drawCircle(circle);
    }
}
