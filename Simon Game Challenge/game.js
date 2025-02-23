var buttonColours=["red","blue","green","yellow"];
var gamePattern = [];
var userClickedPattern = [];
var started = false;
var level = 0;

document.addEventListener("keydown",function(){
    if (!started){
        document.getElementById("level-title").textContent="Level "+level;
        nextSequence();
        started=true;
    }
});


function nextSequence(){
    level++;
    document.getElementById("level-title").textContent="Level "+level;
    userClickedPattern = []; 
    var randomNumber=Math.floor(Math.random()*4);
    var randomChosenColour=buttonColours[randomNumber];
    gamePattern.push(randomChosenColour);
    document.getElementById(randomChosenColour).style.backgroundColor="white";
    setTimeout(function(){
        document.getElementById(randomChosenColour).style.backgroundColor=randomChosenColour;
    },100);

    var sound = new Audio("sounds/"+randomChosenColour+".mp3");
    sound.play();
}


// Add event listeners to all buttons to handle user clicks
document.querySelectorAll(".btn").forEach(button => {
    button.addEventListener("click", function() {
        let userChosenColour = button.id;
        userClickedPattern.push(userChosenColour);
        button.style.backgroundColor="white";
        button.classList.add("pressed");
        setTimeout(function(){
            button.style.backgroundColor=userChosenColour;
            button.classList.remove("pressed");
        },100);
        var sound = new Audio("sounds/"+userChosenColour+".mp3");
        sound.play();   
        checkAnswer(userClickedPattern.length-1);
    });
});


function checkAnswer(currentLevel){
    if (gamePattern[currentLevel] === userClickedPattern[currentLevel]){
        if (gamePattern.length === userClickedPattern.length){
            setTimeout(function(){
                nextSequence();
            },1000);
        }
    }else{
        var sound = new Audio("sounds/wrong.mp3");
        sound.play();
        document.getElementById("level-title").textContent="Game Over, Press Any Key to Restart";
        document.body.classList.add("game-over");
        setTimeout(function(){
            document.body.classList.remove("game-over");
        },200);
        startOver();
    }
}

function startOver(){
    level = 0;
    gamePattern = [];
    started = false;
}
