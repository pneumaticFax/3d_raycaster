class Boundary{
    constructor(x1, y1, x2, y2){
        this.point1 = createVector(x1, y1);
        this.point2 = createVector(x2, y2);

        let dx = this.point2.x - this.point1.x;
        let dy = this.point2.y - this.point1.y;
        push();
        translate((this.point2.x + this.point1.x)/2 ,(this.point2.y + this.point1.y)/2);
        this.normal = createVector(-dy, dx).normalize();
        this.other_normal = createVector(dy, -dx).normalize();
        pop();
    }

    draw(){
        push();
        strokeWeight(2);
        stroke('lightgreen');
        line(this.point1.x, this.point1.y, this.point2.x, this.point2.y);
        // stroke('lightblue');
        // translate((this.point2.x + this.point1.x)/2 ,(this.point2.y + this.point1.y)/2);
        // line(0,0, this.normal.x*10, this.normal.y*10);
        // line(0,0, this.other_normal.x*10, this.other_normal.y*10);
        pop();
    }

    drawCoords(){
        push();
        strokeWeight(2);
        stroke(0);
        fill('green');
        text("P1: (" + this.point1.x.toFixed(2) + ", " + this.point1.y.toFixed(2) + ")", this.point1.x+15, this.point1.y+15)
        text("P2: (" + this.point2.x .toFixed(2)+ ", " + this.point2.y.toFixed(2)+ ")", this.point2.x+15, this.point2.y+15)
        pop();
    }
}