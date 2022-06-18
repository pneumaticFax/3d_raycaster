class InputHandler {
    //255 is the number of keypress events as per
    //https://www.toptal.com/developers/keycode/table-of-all-keycodes
    keyboard = new Array(256);
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
}

