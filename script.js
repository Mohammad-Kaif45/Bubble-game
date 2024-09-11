var timer = 30;
// jispe click karoge wo element par event raise hoga, aur event listner naa milne par event element ke parent pr listner dhundhega, wahag bhi na milne apr event parent ke parent ke parent par listner dhundhega
var score = 0;
var hitrn = 0;

// Function to increase the Value of Score
function increaseScore() {
    score += 10;
    document.querySelector("#scoreval").textContent = score;
}

// Function to change the value of hit after one occurance
function getNewHit() {
    hitrn = Math.floor(Math.random() * 10);
    document.querySelector("#hitval").textContent = hitrn;
}

// Function to make the number of bubbles as per your need
function makeBubble() {
    var clutter = "";
for(var i = 1; i<=84;i++) {
    var rn = Math.floor(Math.random()*10)
    clutter += `<div class="bubble">${rn}</div>`;
}

document.querySelector("#pbtm").innerHTML = clutter;
}

// Function to set the timer
function runTimer() {
    var timerint = setInterval(function(){
        if(timer > 0) {
            timer--;
            document.querySelector("#timerval").textContent = timer;
        } else {
            clearInterval(timerint);
            document.querySelector("#pbtm").innerHTML = `<h1>Game Over</h1>`;
        }
    },1000);
}

document.querySelector("#pbtm").addEventListener("click",function(dets) {
    var clickednum = Number(dets.target.textContent);
    if(clickednum == hitrn) {
        increaseScore();
        makeBubble();
        getNewHit();
    }
 });
runTimer();
makeBubble();
getNewHit();