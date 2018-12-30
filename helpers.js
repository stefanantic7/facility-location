function download(data, filename, type) {
    const file = new Blob([data], {type: type});
    if (window.navigator.msSaveOrOpenBlob) // IE10+
        window.navigator.msSaveOrOpenBlob(file, filename);
    else { // Others
        const a = document.createElement("a"),
            url = URL.createObjectURL(file);
        a.href = url;
        a.download = filename;
        document.body.appendChild(a);
        a.click();
        setTimeout(function() {
            document.body.removeChild(a);
            window.URL.revokeObjectURL(url);
        }, 0);
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