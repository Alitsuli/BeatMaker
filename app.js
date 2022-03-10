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
        this.isPlaying = null;
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
                if(bar.classList.contains("clap-pad")){
                    this.clapAudio.currentTime = 0;  // reset bets per minute
                    this.clapAudio.play();
                    //console.log("clap sound!");
                }
                if(bar.classList.contains("crash-pad")){
                    this.crashAudio.currentTime = 0;
                    this.crashAudio.play();
                    //console.log("crash sound!");
                }
                if(bar.classList.contains("hihat-pad")){
                    this.hihatAudio.currentTime = 0;
                    this.hihatAudio.play();
                    //console.log("hihat sound!");
                }
                if(bar.classList.contains("kick-pad")){
                    this.kickAudio.currentTime = 0;
                    this.kickAudio.play();
                    //console.log("kick sound!");
                }
            }
        });
        this.index++;
    }
    start() {
        //speed of track
        const interval = (60/this.beatPerMinute) * 1000;

        //check is playing
        if(!this.isPlaying){
            this.isPlaying = setInterval(() => {
                this.repeat();
            }, interval);
        }else{
            clearInterval(this.isPlaying);
            this.isPlaying = null;
        }
    }
    updateBtn (){
        if(this.isPlaying){
            this.playBtn.innerText = "Stop";
            this.playBtn.classList.add("active");
        }else{
            this.playBtn.innerText = "Play";
            this.playBtn.classList.remove("active");
        }
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
    drumkit.updateBtn();
});