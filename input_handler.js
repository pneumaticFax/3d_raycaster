class InputHandler {
    //255 is the number of keypress events as per
    //https://www.toptal.com/developers/keycode/table-of-all-keycodes
    keyboard = new Array(256);
    accelerometer = new Array(3);

    constructor() {
        for(let i = 0; i < this.keyboard.length; i++){
            this.keyboard[i] = 0;
        }
    }
    doKeyDown(){
        this.keyboard[keyCode] = 1;
    }
    doKeyUp(){
        this.keyboard[keyCode] = 0;
    }

    doDeviceMotion(event){
        this.accelerometer[0] = event.alpha;  //compass direction N = 0/360 S = 180 etc
        this.accelerometer[1] = event.beta;   //front to back  +down/yoke forward ; - up/yoke back
        this.accelerometer[2] = event.gamma;  //left to right  -left ; +right
    }

}

