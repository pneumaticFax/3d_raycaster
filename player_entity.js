class Player extends Entity{
    constructor(){
        super(scene_width/2,scene_height/2)
        this.velocity = createVector(0,-1);
        this.color = 220;

        this.list_of_bounds = [];
        this.rays = [];
        this.intersection_point_distances = [];
        this.fov = 30;
        this.heading = 0;
        this.quality = 0.25
    }

    update(){
        this.updateVelocity(); //as taken from input handler

        for(let bound of this.list_of_bounds){
            this.velocity = this.setVelocityForCollision(bound);

        }
        this.updatePosition();
        // this.checkBoundary();
        this.updateRays();


    }

    draw(){
        this.drawCastedRays();
        this.drawCircle();
        this.drawArc()
        this.drawDebugText();

        //TEXT
        push();
        strokeWeight(1)
        stroke('black');
        fill('white')
        textFont('Helvetica')
        text("fov: " + this.fov.toFixed(2), 15, 115)
        pop();

    }

    handleInput(input_handler){
        if (input_handler.keyboard[LEFT_ARROW] === 1) {
            this.heading-=radians(2);
            if(this.heading < 0){
                this.heading += TWO_PI;
            }
            this.heading = this.heading % TWO_PI
        }

        if (input_handler.keyboard[RIGHT_ARROW] === 1) {
            this.heading+=radians(2);
            this.heading = this.heading % TWO_PI
        }

        if(input_handler.keyboard[UP_ARROW] === 1 || input_handler.keyboard[DOWN_ARROW] === 1){
            if(input_handler.keyboard[UP_ARROW] === 1){
                this.speed += .5;
                if (this.speed > this.max_speed) {
                    this.speed = this.max_speed;
                }
            }
            if(input_handler.keyboard[DOWN_ARROW] === 1){
                this.speed -= .05;
                if(this.speed < this.min_speed){
                    this.speed = this.min_speed;
                }
            }
        }else{
            if(input_handler.keyboard[UP_ARROW] === 0 || input_handler.keyboard[DOWN_ARROW] === 0){
                this.speed = 0;
            }
        }
    }

    setVelocityForCollision(boundary){
        let x1 = boundary.point1.x;
        let y1 = boundary.point1.y;
        let x2 = boundary.point2.x;
        let y2 = boundary.point2.y;

        let px = this.position.x;
        let py = this.position.y;

        let vx = this.velocity.x;
        let vy = this.velocity.y;

        let current_velocity = this.velocity;
        let normal = boundary.normal;
        let new_velocity = current_velocity;

        //check to see if the NEXT position after adding velocity would result in a collision
        if(this.checkLinePointCollision(boundary, px+(vx*this.radius), py+vy*(this.radius))){
            new_velocity = p5.Vector.sub(current_velocity, p5.Vector.mult(boundary.normal, p5.Vector.dot(current_velocity, boundary.normal)));
        }

        return new_velocity;
    }

    checkLinePointCollision(boundary, px, py){
        let x1 = boundary.point1.x;
        let y1 = boundary.point1.y;
        let x2 = boundary.point2.x;
        let y2 = boundary.point2.y;

        // LINE/POINT

        // get distance from the point to the two ends of the line
        let d1 = dist(px,py, x1,y1);
        let d2 = dist(px,py, x2,y2);

        // get the length of the line
        let lineLen = dist(x1,y1, x2,y2);

        // since floats are so minutely accurate, add
        // a little buffer zone that will give collision
        let buffer = 0.1;    // higher # = less accurate

        // if the two distances are equal to the line's
        // length, the point is on the line!
        // note we use the buffer here to give a range,
        // rather than one #
        return d1 + d2 >= lineLen - buffer && d1 + d2 <= lineLen + buffer;

    }

    drawCastedRays(){
        for (let ray of this.rays){
            let closest = Infinity;
            let intersection_vector = createVector(this.position.x, this.position.y);
            ray.direction.setMag(max(scene_height, scene_width)*2);

            for(let bound of this.list_of_bounds){
                let intersection_points = ray.cast(bound);
                if(intersection_points.length !==0){
                    let d = dist(ray.position.x, ray.position.y, intersection_points[0], intersection_points[1]);

                    if(d < closest){
                        closest = d;
                        intersection_vector.x = intersection_points[0];
                        intersection_vector.y = intersection_points[1];
                    }
                }
            }
            this.intersection_point_distances.push(closest);
            this.drawLine(ray.position.x, ray.position.y, intersection_vector.x, intersection_vector.y);
        }
    }

    updateRays(){
        this.rays = [];
        this.intersection_point_distances = [];
        for(let i = degrees(this.heading)-this.fov/2; i < degrees(this.heading)+this.fov/2; i+=this.quality){
            this.rays.push(new Ray(this.position, radians(i)))
        }
    }

    updateFov(fov){
        this.fov = fov;
    }


    drawLine(x1, y1, x2, y2){
        push();
        stroke(255);
        line(x1, y1, x2, y2);
        pop();
    }
}