
/** 
 * Base
 * left channel
 * drums.mp3
 * Band: 6  
 * peak: ca 130
 */

 /** 
 * Clap
 * drums_r_mono.mp3
 * drums.mp3
 * Band: 180
 * peak: ca 120
 */

  /** 
 * Snair
 * Master
 * drums.mp3
 * Band:   457
 * peak: ca 104   
 */

 
/*
let c1, c2, c3, c4

c1 = color(191,182,52);
c2 = color(166 ,60 ,129);
c3 = color(191,82,42);
c4 = color(81,172,197);
*/


//   fill(c1);
//  arc(200, 200, 200, 200,-1/2*PI,-1/4*PI);   
  
//   fill(c2);
// arc(200, 200, 200, 200,-1/4*PI,0); 
 
//   fill(c3);
// arc(200, 200, 200, 200,0,1/4*PI);
  
//   fill(c4);
// arc(200, 200, 200, 200,1/4*PI,1/2*PI); 
  
//   fill(c1);
// arc(200, 200, 200, 200, 1/2*PI,3/4*PI);
  
//   fill(c2);
// arc(200, 200, 200, 200, 3/4*PI,PI);

//   fill(c3);
// arc(200, 200, 200, 200, PI,5/4*PI);

//   fill(c4);
// arc(200, 200, 200, 200,5/4*PI,3/2*PI);
  

 
let wheel
let wheels = [];

let drums_l 
let song

let ball_array = []
let clap_array = []


function preload(){
    drums_l  = loadSound('ifl_l/drums.mp3');
    drums_r = loadSound('ifl_r/drums_r_mono.mp3');
    song = loadSound('ifl_stereoMaster.mp3');
} 

let canvas;
let button;
let stepButton;
let drums_r_clap_fft;
let drums_l_fft;


let clap

let storyState = 0;


function setup(){
    canvas = createCanvas(1000, 750);
   
    button = createButton('play / pause');
    button.position(10, canvas.height + 10);
    button.mousePressed(toggleSong);

    // // stepButton = createButton('step +');
    // stepButton.position(10, canvas.height + 10);
    // stepButton.mousePressed(makeStep);

    drums_l.disconnect();
    drums_r.disconnect();
    // song.disconnect();

    //Base Trigger
    drums_l_fft = new p5.FFT(0.9, 1024);
    drums_l_fft.setInput(drums_l);
    
    //Clap Trigger
    drums_r_clap_fft =new p5.FFT(); 
    drums_r_clap_fft.setInput(drums_l);

    drums_l_snair_fft =new p5.FFT(); 


    // //Snair Trigger
    // drums_rs_fft = new p5.FFT();
 

   
    clap = new Clap()

    wheel = new Wheel(width/2, height/2, 500);
}

let halfWheels = []

let drums_l_spectrum
let drums_r_spectrum


function draw(){
    //frameRate(fr); // make frameRate 30 FPS
    background(0);

    drums_l_spectrum = drums_l_fft.analyze();
    drums_r_spectrum = drums_r_clap_fft.analyze();

    checkBase();
    checkClap();
    

    clap.update()
    clap.show()

    switch (storyState) {
        case 0:
            halfWheels.forEach(function (wheel){
                wheel.show();
            })
            break;
        case 1:
            wheel.show();
            break;
        case 2:
            wheels.forEach(function (wheel){
                wheel.show();
            })
            break;
        case 3:
            wheels.forEach(function (wheelAxis){
                wheelAxis.forEach(function (wheel){
                    wheel.show();
                })
            })
            break;
        default:
            break;
    }

}

 

//470 msec
let lastbaseTime = 0;

function getMillis(){
    return performance.now();
}


function makeStep(){
    beatCount++;
    clap.impulse();
    wheel1.step();
}
//Base Finder
let lastBaseval = 0;
let direction_base = 1;
let beatCount = 0
let clockwise = true;

function checkBase(){
    
    let base_value = drums_l_spectrum[6];
    if(lastBaseval > base_value){
        let currentTime = getMillis();
        if(direction_base > 0 && lastBaseval > 130 && currentTime - lastbaseTime > 400){
            //let ball = new Ball(50, 50);
            //ball_array.push(ball);
            lastbaseTime = getMillis();
            beatCount ++;

            if(beatCount == 24) storyState = -1;
            if(beatCount == 25) storyState = 1;
            if(beatCount == 40){
                storyState = 2;
                for (let i = 0; i < 2; i++) {
                    wheels[i] = new Wheel(width/4 + i*width/2, height/2, 300);
                    wheels[i].setProgress(7);
                }
            }
            if(beatCount == 44 ){
                storyState = 3;
                wheels = new Array(2);
                for (let i = 0; i < 2; i++) {
                    wheels[i] = new Array(2);
                    for(let j = 0; j < 2; j++){
                        wheels[i][j] = new Wheel(width/4 + i*width/2, height/4 + j*height/2, 300);
                        wheels[i][j].setProgress(11);
                    }   
                }
            }
            if(beatCount == 48 ){
                storyState = 3;
                wheels = new Array(4);
                for (let i = 0; i < 4; i++) {
                    wheels[i] = new Array(4);
                    for(let j = 0; j < 4; j++){
                        wheels[i][j] = new Wheel(width/8 + i*width/4, height/8 + j*height/4, 150);
                        wheels[i][j].setProgress(15);
                    }   
                }
            }
            if(beatCount == 52){
                wheels = new Array(8);
                for (let i = 0; i < 8; i++) {
                    wheels[i] = new Array(8);
                    for(let j = 0; j < 8; j++){
                        wheels[i][j] = new Wheel(width/8/2 + i*width/4/2, height/8/2 + j*height/4/2, 50);
                        wheels[i][j].setProgress(11);
                    }   
                }
            }
            if(beatCount == 60){
                wheels = new Array(4);
                for (let i = 0; i < 4; i++) {
                    wheels[i] = new Array(4);
                    for(let j = 0; j < 4; j++){
                        wheels[i][j] = new Wheel(width/8 + i*width/4, height/8 + j*height/4, 150);
                        wheels[i][j].setProgress(11);
                    }   
                }
            }
            if(beatCount == 64){
                wheels = new Array(2);
                for (let i = 0; i < 2; i++) {
                    wheels[i] = new Array(2);
                    for(let j = 0; j < 2; j++){
                        wheels[i][j] = new Wheel(width/4 + i*width/2, height/4 + j*height/2, 300);
                        wheels[i][j].setProgress(15);
                    }   
                }
            }
            if(beatCount == 68){
                storyState = 2;
                for (let i = 0; i < 2; i++) {
                    wheels[i] = new Wheel(width/4 + i*width/2, height/2, 300);
                    wheels[i].setProgress(11);
                }
            }
            if(beatCount == 72) storyState = 1;
            // if(beatCount == 72) ellipse(weight/2,height/2,350,350);


            switch (storyState) {
                case 0:
                    if((beatCount-1) % 4 == 0){
                        halfWheels.push(new HalfWheel(800, height / 2, 350, clockwise));
                        clockwise = !clockwise;
                    }
                    halfWheels.forEach(wheel => {
                        wheel.step();
                        wheel.x -= wheel.r/4;
                        
                    });
                    break;
                case 1:
                    wheel.step();
                    break;
                case 2:
                    wheels.forEach(function (wheel){
                        wheel.step();
                    })
                    break;
                case 3:
                    wheels.forEach(function (wheelAxis){
                        wheelAxis.forEach(function (wheel){
                            wheel.step();
                        })
                    })
                    break;
                 default:
                    break;
            }

            
        }

        direction_base = -1;
    }else{
        direction_base = 1; 
    }

    //console.log(direction_base);
    lastBaseval = base_value;
}


//Clap Finder
let lastClapval = 0;
let direction_clap = 1;
let lastclapTime = 0;

function checkClap(){
      
    let clap_value = drums_r_spectrum[180];
    // console.log(clap_value);
    if(lastClapval > clap_value){
        let currentTime = getMillis();
        if(direction_clap > 0 && lastClapval > 110 && currentTime - lastclapTime > 800){
            clap.impulse();
            lastclapTime = getMillis();
        }
       
        direction_clap = -1;
    }else{
        direction_clap= 1;
    }

   // console.log(direction_clap);
    lastClapval = clap_value;
}


class HalfWheel{
    constructor(x = 500, y = height /2, r = 350, clockwise = true){
        this.x = x;
        this.y = y;
        this.r = r;
        this.clockwise = clockwise;
        this.progress = 0;
        this.viewStates = [0, 0, 0, 0, 0, 0, 0, 0];
        this.colors = [color(191,82,42), color(81,172,197), color(191,182,52), color(166 ,60 ,129)];
    }
    setViewState(index, state){
        this.viewStates[index] = state;
    }
    show(){
        this.viewStates.forEach((state, index) => {     
            if(this.progress > 0 && this.progress < 7){
                this.viewStates[this.progress-1] = 2
                this.viewStates[this.progress-2] = 1
            }
        });
        for(let i = 4; i < 8; i++){
            this.viewStates[i] = 0
        }
        console.log(this.viewStates);
        this.viewStates.forEach((state, index) => {
            let col = this.colors[index % 4];
            if(!this.clockwise){
                index = -index-1;
            }
            switch (state) {
                case 0:
                    break;
                case 1:
                    let alpha = 255 - (((this.progress - Math.abs(index)) - 1)*(255/8));
                    push();
                    noStroke()
                    col.setAlpha(alpha);
                    console.log(alpha)
                    fill(col);
                    translate(this.x, this.y)
                    rotate(PI);
                    
                    arc(0, 0, this.r, this.r, index*1/4*PI,index*1/4*PI + 1/4*PI);
                    pop();
                    break;
                case 2:
                    push();
                    noStroke()
                    col.setAlpha(255)
                    fill(col);
                    translate(this.x, this.y)
                    rotate(PI);
                    
                    arc(0, 0, this.r + 40, this.r + 40, index*1/4*PI,index*1/4*PI + 1/4*PI);
                    pop();
                    break;
                case 3:
                    push();
                    noStroke()
                    col.setAlpha(255)
                    fill(col);
                    translate(this.x, this.y)
                    rotate(PI);
                    
                    arc(0, 0, this.r + 40, this.r + 40, index*1/4*PI,index*1/4*PI + 1/4*PI);
                    pop();
                    break;
                default:
                    break;
            }
        });
    }
    step(){
        this.progress ++;
    }
}

class Wheel{
    constructor(x = 500, y = height /2, r = 350, ){
        this.x = x;
        this.y = y;
        this.r = r;
        this.progress = 0;
        this.viewStates = [0, 0, 0, 0, 0, 0, 0, 0];
        this.colors = [color(191,82,42), color(81,172,197), color(191,182,52), color(166 ,60 ,129)];
    }
    setViewState(index, state){
        this.viewStates[index] = state;
    }

    setProgress(progress){
        this.progress = progress;
        for(let i = 0; i < progress; i++){
            if(i == progress-1){
                this.viewStates[i] = 2
            }else{
                this.viewStates[i] = 1
            }
        }
    }
    show(){
        this.viewStates.forEach((state, index) => {     
            if(this.progress > 0){
                this.viewStates[this.progress-1] = 2
                this.viewStates[this.progress-2] = 1
            }
        });
        this.viewStates.forEach((state, index) => {
            let col = this.colors[index % 4];
            switch (state) {
                case 0:
                    break;
                case 1:
                    let alpha = 255 - (((this.progress - Math.abs(index)) - 1)*(255/8));
                    push();
                    noStroke()
                    col.setAlpha(alpha);
                    fill(col);
                    translate(this.x, this.y)
                    rotate(-PI/2);
                    arc(0, 0, this.r, this.r, index*1/4*PI,index*1/4*PI + 1/4*PI);
                    pop();
                    break;
                case 2:
                    push();
                    noStroke()
                    col.setAlpha(255)
                    fill(col);
                    translate(this.x, this.y)
                    rotate(-PI/2);
                    arc(0, 0, this.r + 40, this.r + 40, index*1/4*PI,index*1/4*PI + 1/4*PI);
                    pop();
                    break;
                default:
                    break;
            }
        });
    }
    step(){
        this.progress ++;
    }
}




// // //Snair Finder
// let lastSnairval = 0;
// let direction_snair = 1;

// function checkSnair(){
    
//     let snair_value = drums_rs_spectrum[457];
//     if(lastSnairval > snair_value){
//         if(direction_snair > 0 && lastSnairval > 104){
//             let ball = new Ball(150, 50);
//             ball_snair_array.push(ball);
//         }

//         direction_snair = -1;
//     }else{
//         direction_snair= 1;
//     }

//     //console.log(direction_snair);
//     lastSnairval = snair_value;
// }


//Button 
function toggleSong(){
    if(song.isPlaying()){
        song.pause();
        drums_l.pause();
    }else{
        song.play();
        drums_l.play();
    }
}

class Clap{
    constructor() {
        this.aDefault = 0;
        this.color = color(255)
        this.a = 0;
    }

    show() {
        push();
        noStroke();
        this.color.setAlpha(this.a);
        //Clap Backgorund Maske 
        fill(0,0,0,255);
        rect(0, 0, canvas.width, canvas.height);   //(x, y, widht, height)
        //Clap Background 
        fill(this.color);
        rect(0, 0, canvas.width, canvas.height);
        pop();
    }

    impulse() {
        this.a += 100;
    }

    update() {
        if (this.a > this.aDefault) {
            let value = this.a * 0.1
            this.a -= value;
        }
    }
}