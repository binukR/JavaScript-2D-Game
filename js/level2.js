var ninja = document.getElementById("ninja");

//Audio Files

var runAudio = new Audio ("assets/music/run.mp3");
var jumpAudio = new Audio ("assets/music/jump.mp3");
var deadAudio = new Audio ("assets/music/death.mp3");
var bgAudio = new Audio ("assets/music/background-music.mp3");
var winAudio = new Audio ("assets/music/win.wav");

runAudio.loop = "true";
bgAudio.loop = "true";

function backgroundMusic(){
    bgAudio.volume = 0.2;
    bgAudio.play();
}

function runMusic(){
    runAudio.volume = 0.5;
    runAudio.play();
}

function deadMusic(){
    deadAudio.volume = 0.5;
    deadAudio.play();
}

function jumpMusic(){
    jumpAudio.volume = 0.5;
    jumpAudio.play();
}

function winMusic(){
    winAudio.volume = 0.5;
    winAudio.play();
}

function keyPress(event){
    var keyCode = event.which;

    if(keyCode == 13){// Enter Key
        backgroundMusic();
        deerid = deer();
        if(runAnimationNo == 0){
            runAnimation();
        }

        if(moveBackgroundAnimationNo == 0){
            moveBackgroundAnimationNo = setInterval(movingBackground, 100);
        }

        if(moveAnimate == 0){
            moveAnimate = setInterval(move, 100);
        }

        if(scoreValue == 0){
            scoreValue = setInterval(UpdateScore, 100);
        }
       

    }
    
    if(keyCode == 32){// Space Key
        if(jumpAnimationNo == 0){
            jumpAnimation();
        }
    }

    if(keyCode == 82){
        reload();
    }
}



// OBSTACLE //


var deerMargin = 700;
var deerid = 0;
function deer(){

    for(var i = 0; i < 50; i++){
        var obstacle = document.createElement("img");
        obstacle.src = "assets/deer.gif";
        obstacle.className = "deer";
        obstacle.id = "deer" + i;
        obstacle.style.marginLeft = deerMargin + "px";
        deerMargin = deerMargin + 500;
        document.getElementById("bg").appendChild(obstacle);

        if(i < 10){
            deerMargin = deerMargin + 800;
        }

        if(i >= 12){
            deerMargin = deerMargin + 600;
        }

        
    }
}

var moveAnimate = 0;
function move(){
    for(var i = 0; i < 50; i++){
        var leftMargin = document.getElementById("deer" + i);
        var styles = getComputedStyle(leftMargin);
        var stylesint = parseInt(styles.marginLeft)
        stylesint = stylesint - 20;
        leftMargin.style.marginLeft = stylesint + "px";
        // alert(stylesint);

        if(stylesint < 120 & stylesint > 40){
            if(margintop > 260){
                clearInterval(runAnimationNo);
                clearInterval(jumpAnimationNo);
                jumpAnimationNo = -1;
                clearInterval(moveBackgroundAnimationNo);
                clearInterval(moveAnimate);
                clearInterval(scoreValue);

                setInterval(dead, 100);
                deadMusic();
            }
        }
    }
}


// OBSTACLE //



var idleImage = 1;
var idleAnimationNo = 0;
function idle(){

    idleImage = idleImage + 1;

    if(idleImage == 11){
        idleImage = 1;
    }

    ninja.src = "assets/idle/Idle ("+ idleImage +").png";
}

function idleAnimation(){
    idleAnimationNo = setInterval(idle, 170);
}


var runImage = 1;
var runAnimationNo = 0;
function run(){
    runImage = runImage + 1;

    if(runImage == 11){
        runImage = 1;
    }

    ninja.src = "assets/run/Run ("+ runImage +").png";
}


function runAnimation(){
    runAnimationNo = setInterval(run, 100);
    runMusic();
    clearInterval(idleAnimationNo);
}


var jumpImage = 1;
var jumpAnimationNo = 0;
var margintop = 340;
function jump(){

    jumpImage = jumpImage + 1;

    if(jumpImage <= 6){
        margintop = margintop - 45;
        ninja.style.marginTop = margintop + "px";
    }
    if(jumpImage >= 7){
        margintop = margintop + 45;
        ninja.style.marginTop = margintop + "px";
    }

    

    if(jumpImage == 11){
        jumpImage = 1;
        clearInterval(jumpAnimationNo);
        jumpAnimationNo = 0;
        runAnimation();

        if(deerid == 0){
            deer();
        }
        
        if(moveAnimate == 0){
            moveAnimate = setInterval(move, 100);
        }

        if(moveBackgroundAnimationNo == 0){
            moveBackgroundAnimationNo = setInterval(movingBackground, 100);
        }
    }

    ninja.src = "assets/jump/Jump ("+ jumpImage +").png";
}

function jumpAnimation(){
    clearInterval(idleAnimationNo);
    runImage = 0;
    clearInterval(runAnimationNo);
    runAudio.pause();
    jumpAnimationNo = setInterval(jump, 100);
    jumpMusic();
}


var deadImage = 1;
var deadAnimationNo = 0;
function dead(){
    deadImage = deadImage + 1;
    if(deadImage == 11) {
        deadImage = 10;
        ninja.style.marginTop = "340px";
        bgAudio.pause();
        runAudio.pause();

       

        document.getElementById("dead").style.visibility = "visible";
        document.getElementById("deadlevel").innerHTML = "Your Stress Level is " + score;
        document.getElementById("score").style.visibility = "hidden";
    }

    ninja.src = "assets/dead/Dead ("+ deadImage +").png";
}


var backgroundImagePositionX = 0;
var moveBackgroundAnimationNo = 0;
function movingBackground(){
    backgroundImagePositionX = backgroundImagePositionX - 20;
    document.getElementById("bg").style.backgroundPositionX = backgroundImagePositionX + "px";
}

var score = 300;
var scoreValue = 0;
function UpdateScore(){
    score = score - 2;

    if(score == 0){

        bgAudio.pause();
        runAudio.pause();
        clearInterval(runAnimationNo);
        clearInterval(jumpAnimationNo);
        clearInterval(moveBackgroundAnimationNo);
        clearInterval(moveAnimate);
        clearInterval(scoreValue);
        winMusic();
        document.getElementById("end").style.visibility = "visible";
        document.getElementById("level").innerHTML = "Your Stress Level is zero+";
        document.getElementById("score").style.visibility = "hidden";
        

    }

    document.getElementById("score").innerHTML = "STRESS LEVEL:" +  score;
}

function reload(){
    location.reload();
}

function exit(){
    setTimeout((function() {  
        return process.exit(1);
    }), 50);
}