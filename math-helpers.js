function randomTo(to=100) {
    return Math.random() * to;
}

function getIntersectionPoints(circle1, circle2) {
    let d = Math.hypot(circle2.x - circle1.x, circle2.y - circle1.y);

    let p1, p2 = null;

    if (d <= circle1.r + circle2.r && d >= Math.abs(circle2.r - circle1.r)) {

        let ex = (circle2.x - circle1.x) / d;
        let ey = (circle2.y - circle1.y) / d;

        let x = (circle1.r * circle1.r - circle2.r * circle2.r + d * d) / (2 * d);
        let y = Math.sqrt(circle1.r * circle1.r - x * x);

        p1 = {
            x: circle1.x + x * ex - y * ey,
            y: circle1.y + x * ey + y * ex
        };

        p2 = {
            x: circle1.x + x * ex + y * ey,
            y: circle1.y + x * ey - y * ex
        }

    } else {
        // No Intersection, far outside or one circle within the other
    }

    return [p1, p2];
}

function getAngleRelativeToX(x1, y1, x2, y2) {
    let angle = -Math.atan2(y1 - y2, x2 - x1) * 180 / Math.PI;

    if(angle > 0) {
        angle = angle-360;
    }

    return Math.abs(angle);
}

