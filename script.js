let timer = 60;
let score = 0; 
let hitrn = 0;
let highestScore = localStorage.getItem('highestScore') || 0;  
let level = 1;
let isGameRunning = false;  
let soundEnabled = true;  
let timerInterval;
 
// Create audio elements
const popSound = new Audio('https://assets.mixkit.co/active_storage/sfx/2571/2571-preview.mp3');
const gameOverSound = new Audio('https://assets.mixkit.co/active_storage/sfx/1435/1435-preview.mp3');

// Initialize the game
function initGame() {
    clearInterval(timerInterval);
    timer = 60;
    score = 0;
    level = 1;
    isGameRunning = true;
    updateUI();
    runTimer();
    makeBubble();
    getNewHit();
}

// Update all UI elements
function updateUI() {
    document.querySelector("#scoreval").textContent = score;
    document.querySelector("#highestscoreval").textContent = highestScore;
    document.querySelector("#timerval").textContent = timer;
    
    // Update level indicator
    let levelIndicator = document.querySelector(".level-indicator");
    if (!levelIndicator) {
        levelIndicator = document.createElement("div");
        levelIndicator.className = "level-indicator";
        document.querySelector("#panel").appendChild(levelIndicator);
    }
    levelIndicator.textContent = `Level ${level}`;
}

// Increase score with animation
function increaseScore() {
    score += 10;
    if (soundEnabled) {
        popSound.currentTime = 0;
        popSound.play().catch(e => console.log("Audio play failed:", e));
    }
    
    // Check for level up
    if (score % 50 === 0) {
        levelUp();
    }
    
    // Update highest score
    if (score > highestScore) {
        highestScore = score;
        localStorage.setItem('highestScore', highestScore);
        document.querySelector("#highestscoreval").style.animation = "fadeIn 0.5s ease";
    }
    
    updateUI();
}

// Level up function
function levelUp() {
    level++;
    // Make game harder with each level
    timer += 10; // Bonus time
    makeBubble(true); // Refresh bubbles with new pattern
}

// Generate new target number
function getNewHit() {
    hitrn = Math.floor(Math.random() * 10);
    document.querySelector("#hitval").textContent = hitrn;
}

// Create bubbles with optional animation
function makeBubble(animate = false) {
    const bubbleCount = Math.max(20, 84 - (level * 4)); // Ensure minimum bubbles
    let clutter = "";
    
    for (let i = 1; i <= bubbleCount; i++) {
        const rn = Math.floor(Math.random() * 10);
        const delay = animate ? Math.random() * 0.5 : 0;
        clutter += `<div class="bubble" style="animation-delay: ${delay}s">${rn}</div>`;
    }
    
    document.querySelector("#pbtm").innerHTML = clutter;
}

// Timer function
function runTimer() {
    clearInterval(timerInterval);
    timerInterval = setInterval(() => {
        if (timer > 0 && isGameRunning) {
            timer--;
            document.querySelector("#timerval").textContent = timer;
            
            // Warning animation when time is low
            if (timer <= 10) {
                document.querySelector("#timerval").style.color = "red";
                document.querySelector("#timerval").style.animation = "pulse 1s infinite";
            }
        } else {
            clearInterval(timerInterval);
            endGame();
        }
    }, 1000);
}

// End game function
function endGame() {
    isGameRunning = false;
    clearInterval(timerInterval);
    
    if (soundEnabled) {
        gameOverSound.currentTime = 0;
        gameOverSound.play().catch(e => console.log("Audio play failed:", e));
    }
    
    const gameOverScreen = `
        <div class="game-over-screen">
            <h1>Game Over!</h1>
            <p style="font-size: 24px; margin: 20px 0;">Final Score: ${score}</p>
            <p style="font-size: 20px; margin: 10px 0;">Highest Score: ${highestScore}</p>
            <p style="font-size: 18px; margin: 10px 0;">Level Reached: ${level}</p>
            <button class="restart-btn" onclick="initGame()">Play Again</button>
        </div>
    `;
    
    document.querySelector("#pbtm").innerHTML = gameOverScreen;
}

// Event listeners
document.querySelector("#pbtm").addEventListener("click", function(dets) {
    if (!isGameRunning) return;
    
    const clickednum = Number(dets.target.textContent);
    if (clickednum === hitrn) {
        increaseScore();
        makeBubble();
        getNewHit();
    }
});

// Add keyboard controls
document.addEventListener("keydown", function(event) {
    if (event.code === "Space" && !isGameRunning) {
        initGame();
    }
});

// Initialize the game
window.addEventListener('load', initGame);
