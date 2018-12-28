const canvas = document.getElementById("canvas-section");
const ctx = canvas.getContext("2d");

const COLOR_BLACK = '#000';
const COLOR_BLUE = '#00F';
const COLOR_RED = '#F00';
const COLOR_GREEN = '#0F0';

function drawCircle(circle, color = COLOR_BLACK) {
    ctx.beginPath();
    ctx.strokeStyle = color;
    ctx.fillRect(circle.x, circle.y, 1, 1);
    ctx.arc(circle.x, circle.y, radius, 0, 2 * Math.PI);
    ctx.stroke();
}

function resetCanvasWithCircles(circles) {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    for(let circle of circles) {
        drawCircle(circle);
    }
}


class Animation {

}