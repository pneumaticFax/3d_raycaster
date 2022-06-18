class Entity{
    position;
    velocity;
    acceleration;

    speed = 1;
    max_speed = 1;
    min_speed = -1;

    heading = 0;
    rotation = 0

    radius = 10;
    diameter = this.radius*2

    color = 52

    constructor(x_pos = random(0,scene_width), y_pos = random(0,scene_height)){
        this.position = createVector(x_pos,y_pos);
        this.acceleration = createVector(0,0);
    }

    update(){
        this.updateVelocity();
        this.updatePosition();
        // this.checkBoundary();
    }

    updateVelocity(){
        this.velocity = p5.Vector.fromAngle(this.heading)
        this.velocity.setMag(this.speed)
    }

    updatePosition(){
        this.position.add(this.velocity);
    }

    checkBoundary(){
        if(this.position.x > scene_width - this.radius){
            this.position.x = 0;
            this.position.x = scene_width - this.radius;
        }
        if(this.position.x  <= this.radius){
            this.position.x = this.radius;
        }
        if(this.position.y > scene_height - this.radius) {
            this.position.y = scene_height - this.radius;
        }
        if(this.position.y  <= this.radius){
            this.position.y = this.radius;
        }
    }



    draw(b1, b2, b3){
        if(b1){
            this.drawCircle();
        }
        if(b2){
            this.drawArc()
        }
        if(b3){
            this.drawDebugText();
        }
    }

    drawCircle(){
        //circle with pink reference ray
        push();
        strokeWeight(1);
        stroke('white');
        noFill()
        translate(this.position.x, this.position.y);
        circle(0,0, this.radius*2);
        pop();
    }

    drawArc(){
        //ARC
        push();
        strokeWeight(2)
        stroke('red');
        fill(235)
        translate(this.position.x, this.position.y);
        arc(0, 0, this.diameter, this.diameter, this.heading-QUARTER_PI, this.heading+QUARTER_PI, PIE);
        pop();
    }

    drawHeadingRay(){
        //red heading ray
        push();
        strokeWeight(1);
        stroke('red');
        translate(this.position.x, this.position.y);
        line(0,0, this.velocity.x*this.radius, this.velocity.y*this.radius);
        pop();
    }
    drawDebugText(){
        //TEXT
        push();
        strokeWeight(1)
        stroke('black');
        fill('white')
        textFont('Helvetica')
        text("heading radians: " + this.heading.toFixed(2), 15, 15)
        text("heading degrees: " + degrees(this.heading).toFixed(2), 15, 30)
        text("speed: " + this.speed, 15, 90)
        text("position:          (" + this.position.x.toFixed(2) + ", " + this.position.y.toFixed(2)+")", 15, 45);
        text("velocity:           (" + this.velocity.x.toFixed(2) + ", " + this.velocity.y.toFixed(2)+")", 15, 60);
        text("acceleration:       (" + this.acceleration.x.toFixed(2) + ", " + this.acceleration.y.toFixed(2)+")", 15, 75);
        pop();
    }
    getHeadingFromVelocity(){
        push();
        translate(this.position.x, this.position.y);
        let ref = createVector(1,0);
        this.heading = ref.angleBetween(this.velocity);
    }
}