class DrumKit{
    constructor (){
        this.pads = document.querySelectorAll(".pad"); 
        this.clapAudio = document.querySelector("clap-sound");
        this.crashAudio = document.querySelector(".crash-sound");
        this.hihatAudio = document.querySelector(".hihat-sound");
        this.kickAudio = document.querySelector(".kick-sound");
        this.playBtn = document.querySelector(".play");
        this.index = 0;
        this.beatPerMinute = 150;
    }
    active(){
        this.classList.toggle("active");
    }
    repeat(){
        //reset steps when hit 8
        let step = this.index % 8;
        const activeBars = document.querySelectorAll(`.b${step}`);
        //console.log(activeBars);
        //console.log(step);
        //loops over  the pads
        activeBars.forEach( bar =>{
            bar.style.animation = "playTrack 0.3s alternate ease-in-out 2";
            //check if pads are active
            if(bar.classList.contains("active")){
                //check sounds
                if(bar.classList.contains("clap-sound")){
                    //this.clapAudio.currentTime = 0;
                    this.clapAudio.play();
                }
                else if(bar.classList.contains("crash-sound")){
                    this.crashAudio.currentTime = 0;
                    this.crashAudio.play();
                }
                else if(bar.classList.contains("hihat-sound")){
                    this.hihatAudio.currentTime = 0;
                    this.hihatAudio.play();
                }
                else if(bar.classList.contains("kick-sound")){
                    this.kickAudio.currentTime = 0;
                    this.kickAudio.play();
                }
            }
        });
        this.index++;
    }
    start() {
        //speed of track
        const interval = (60/this.beatPerMinute) * 1000;
        setInterval(() => {
            this.repeat();
        }, interval);
    }
}

const drumkit = new DrumKit();

drumkit.pads.forEach(pad =>{
    pad.addEventListener("click", drumkit.active);
    pad.addEventListener("animationend", function (){
        this.style.animation ="";
    });
});
drumkit.playBtn.addEventListener("click", function () {
    drumkit.start();
});