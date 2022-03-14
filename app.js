class DrumKit{
    constructor (){
/*         this.currentClap = "./beatsSound/allSounds/clap-808.wav";
        this.currentCrash = "./beatsSound/allSounds/clap-808.wav";
        this.currentHihat = "./beatsSound/allSounds/clap-808.wav";
        this.currentKick = "./beatsSound/allSounds/clap-808.wav"; */
        this.pads = document.querySelectorAll(".pad"); 
        this.clapAudio = document.querySelector(".clap-sound");
        this.crashAudio = document.querySelector(".crash-sound");
        this.hihatAudio = document.querySelector(".hihat-sound");
        this.kickAudio = document.querySelector(".kick-sound");
        this.playBtn = document.querySelector(".play");
        this.selects = document.querySelectorAll("select");
        this.index = 0;
        this.beatPerMinute = 150;
        this.isPlaying = null;
        this.muteBtn = document.querySelectorAll(".mute");
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
    changeSound(e){
        const selectioName = e.target.name;
        const selectionValue = e.target.value;
        switch(selectioName){
            case "clap-select":
                this.clapAudio.src = selectionValue;
                break;
            case "crash-select":
                this.crashAudio.src = selectionValue;
                break;
            case "hihat-select":
                this.hihatAudio.src = selectionValue;
                break;
            case "kick-select":
                this.kickAudio.src = selectionValue;
                break;
        }
    }
    mute(e){
        const muteIndex = e.target.getAttribute("data-track");
        e.target.classList.toggle("active");
        if(e.target.classList.contains("active")){
            switch(muteIndex){
                case "0":
                    this.clapAudio.volume = 0;
                    break;
                case "1":
                    this.crashAudio.volume = 0;
                    break;
                case "2":
                    this.hihatAudio.volume = 0;
                    break;
                case "3":
                    this.kickAudio.volume = 0;
                    break;
            }
        }else{
            switch(muteIndex){
                case "0":
                    this.clapAudio.volume = 1;
                    break;
                case "1":
                    this.crashAudio.volume = 1;
                    break;
                case "2":
                    this.hihatAudio.volume = 1;
                    break;
                case "3":
                    this.kickAudio.volume = 1;
                    break;
            }
        }
    }
}

const drumkit = new DrumKit();

//add event Listener
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

drumkit.selects.forEach(select =>{
    select.addEventListener("change", function(e){
        drumkit.changeSound(e);
    });
});

drumkit.muteBtn.forEach( btn =>{
    btn.addEventListener("click", function(e){
        drumkit.mute(e);
    })
})