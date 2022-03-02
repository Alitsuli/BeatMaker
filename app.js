class DrumKit{
    constructor (){
        this.pads = document.querySelectorAll(".pad"); 
        this.clapAudio = document.querySelector(".clap-sound");
        this.crashAudio = document.querySelector(".crash-sound");
        this.hihatAudio = document.querySelector(".hihat-sound");
        this.kickAudio = document.querySelector(".kick-sound");
        this.playBtn = document.querySelector(".play");
        this.index = 0;
        this.beatPerMinute = 150;
    }
    repeat(){
        //reset steps when hit 8
        let step = this.index % 8;
        const activeBars = document.querySelectorAll(`.b${step}`);
        console.log(activeBars);
        console.log(step);
        this.index++;
    }
    active(){
        this.classList.toggle("active");
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
})
drumkit.playBtn.addEventListener("click", () => {
    drumkit.start();
});