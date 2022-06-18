let bounds = [];
let particle;
let player
let input_handler;
let scene_width = 800;
let scene_height = 800;
//
// let canvas = createCanvas(windowWidth*.98, windowWidth*.98;

// let scene_width;
// let scene_height;
let slider_fov;
let scene;

function setup() {

    // let scene_width = windowWidth/4;
    // let scene_height = scene_width/2;
    //
    // let scene_width = 400;
    // let scene_height = 400;
    createCanvas(scene_width*2, scene_height);

    background(51);
    for (let i = 0; i < 4; i++){
        bounds.push(new Boundary(random(0, scene_width),random(0, scene_height),random(0, scene_width),random(0, scene_height)));
    }
    bounds.push(new Boundary(0,0, 0, scene_height));
    bounds.push(new Boundary(0,0, scene_width, 0));
    bounds.push(new Boundary( 0, scene_height,scene_width,scene_height));
    bounds.push(new Boundary( scene_width, 0,scene_width,scene_height));

    input_handler = new InputHandler();
    player = new Player(scene_width/2 ,scene_height/2);
    player.list_of_bounds = bounds
    scene = new Scene();
    // slider_fov = createSlider(0, 360, player.fov);
    // slider_fov.position(50, 700);
    // slider_fov.input(changeFOV);
}

function changeFOV() {
    const fov = slider_fov.value();
    player.updateFov(fov);
}

function draw(){
    background(51);

    drawBounds()
    player.handleInput(input_handler)
    player.update();
    player.draw();


    scene.columns = player.intersection_point_distances;
    scene.draw();

    drawFPS();
}

function drawBounds(){
    for (let bound of bounds){
        bound.draw();
    }
}





function drawIntersectionPoint(x, y){
    push();
    stroke("lightblue");
    strokeWeight(5);
    point(x, y);
    pop();
}


function drawFPS(){
    // Draw FPS (rounded to 2 decimal places) at the bottom left of the screen
    let fps = frameRate();
    fill(255);
    stroke(0);
    text("FPS: " + fps.toFixed(2), width-75,   15);
    let update = [];
}

function keyPressed() {
    input_handler.doKeyDown();
}

function keyReleased(){
    input_handler.doKeyUp();
}