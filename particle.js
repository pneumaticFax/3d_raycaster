class Particle{
    constructor(x = scene_width/2, y = scene_height/2){
        this.position = createVector(x,y);
        this.rays = [];
        this.fov = 90;
        this.heading = 0;
        this.quality = 0.25
    }

    // update(position, heading){
    //     // this.rays = [];
    //
    //     while(this.rays.length > 0) {
    //         this.rays.pop();
    //     }
    //
    //     this.heading = heading;
    //     this.position.x = position.x;
    //     this.position.y = position.y;
    //
    //     // for(let i = this.heading - this.fov/2; i < this.fov/2; i+=this.quality){
    //     for(let i = this.heading-PI - this.fov/2; i < this.fov/2; i+=10){
    //         this.rays.push(new Ray(this.position, radians(i)-HALF_PI))
    //     }
    // }

    draw = function(){
        push();
        stroke(51);
        ellipse(this.position.x, this.position.y, 2, 2)

        strokeWeight(1);
        fill(255)
        pop();
    }

    doParticle(){
        particle.update(mouseX, mouseY);
        particle.draw();
    }
}
