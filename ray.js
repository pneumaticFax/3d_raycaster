class Ray{
    constructor(position, angle){
        this.position = position;
        this.direction = p5.Vector.fromAngle(angle);
    }

    draw(p1x = this.position.x, p1y = this.position.y, p2x = this.position.x + this.direction.x, p2y = this.position.y + this.direction.y){
        push();
        stroke('pink');
        strokeWeight(1);
        line(p1x, p1y, p2x, p2y);
        pop();
    }

    drawRayInfo(){
        push();
        strokeWeight(1);
        stroke(0);
        fill('pink');
        text("P1: (" + p1x + ", " + p1y + ")", this.position.x+15, this.position.y+15)
        text("P2: (" + p2x + ", " + p2y+ ")", this.direction.x+ this.position.x+15, this.direction.y + this.position.y+15)
        pop();
    }

    drawPoint(x_coord, y_coord){
        push();
        stroke('lightblue');
        strokeWeight(10);
        point(x_coord, y_coord);
        pop();
    }

    drawPointInfo(x_coord, y_coord){
        push();
        strokeWeight(2);
        stroke(0);
        fill('lightblue');
        text("P*: (" + x_coord.toFixed(2) + ", " + y_coord.toFixed(2) + ")", x_coord+30, y_coord+30)
        pop();
    }

    cast(boundary) {
        let intersection = fastIntersection(
            boundary.point1.x,
            boundary.point1.y,
            boundary.point2.x,
            boundary.point2.y,
            this.position.x,
            this.position.y,
            this.position.x + this.direction.x,
            this.position.y + this.direction.y
        )
        return intersection;
    }

    setDir(x,y){
        this.direction.x = x - this.position.x;
        this.direction.y = y - this.position.y
        // this.direction.normalize();
    }
}

