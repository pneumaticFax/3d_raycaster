class Scene{
    constructor(columns){
        this.columns = columns;
    }

    draw(){
        push();
        translate(scene_width, 0);

        let resolution = scene_width
            // player.intersection_point_distances.length;
        let focal_length = 0.8
        let max_height = scene_height * .5;
        let wall_width = resolution/player.intersection_point_distances.length;

        for(let column = 1; column < player.intersection_point_distances.length; column++){
            let distance = player.intersection_point_distances[column];

            let x = column / resolution - 0.5;
            let angle = Math.atan2(x, focal_length);

            let z = distance * Math.cos(angle);

            let wall_height = (max_height / z);

            noStroke();
            fill('lightgreen');
            rectMode(CENTER);
            rect(column * resolution/player.intersection_point_distances.length,
                max_height, wall_width, wall_height*50);
        }
        pop();


        // const distProjPlane = scene_width / 2.0 / tan(player.fov / 2.0); // projection plane is required for fisheye fix
        // const w = scene_width / player.intersection_point_distances.length;
        //
        // // for (let i = 0; i < player.intersection_point_distances.length; i++) {
        // for (let i = 0; i < player.intersection_point_distances.length; i++) {
        //     const sq = player.intersection_point_distances[i] * player.intersection_point_distances[i];
        //     const wSq = scene_width * scene_width ;
        //     const b = map(sq, 0, wSq, 255, 0);
        //     //const h = map(scene[i], 0, sceneW, sceneH, 0); // original code
        //     const h = (scene_width / player.intersection_point_distances[i]) * distProjPlane; // fisheye fix
        //
        //     noStroke();
        //     fill(b);
        //     rectMode(CENTER);
        //     rect(i * w + w / 2, scene_height / 2, w + 1, h);
        // }
    }
}