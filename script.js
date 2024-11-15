const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");

// Canvas dimensies
const canvasWidth = canvas.width;
const canvasHeight = canvas.height;

// Paddle instellingen
let paddleWidth = 100;
let paddleHeight = 20;
let paddleX = canvasWidth / 2 - paddleWidth / 2;

// Bal instellingen
let ballX = canvasWidth / 2;
let ballY = canvasHeight / 2;
let ballRadius = 10;
let ballSpeedX = 4;
let ballSpeedY = -4;
let ballColor = "red"; // Default kleur

// Score en spelstatus
let score = 0;
let gameOver = false;

// Paddle bewegen met de muis
canvas.addEventListener("mousemove", (e) => {
    const rect = canvas.getBoundingClientRect();
    paddleX = e.clientX - rect.left - paddleWidth / 2;
    if (paddleX < 0) paddleX = 0;
    if (paddleX > canvasWidth - paddleWidth) paddleX = canvasWidth - paddleWidth;
});

// Verander de kleur van de bal
function changeBallColor(color) {
    ballColor = color;
}

// Toon of verberg het skins-menu
function toggleSkinsMenu() {
    const skinsMenu = document.getElementById("skinsMenu");
    skinsMenu.style.display = skinsMenu.style.display === "block" ? "none" : "block";
}

// Toon het Game Over-scherm en het tegeltje
function showGameOver() {
    document.getElementById("finalScore").innerText = score;
    document.getElementById("gameOver").style.display = "block";
    document.getElementById("skinTile").style.display = "flex";
    gameOver = true;
}

// Paddle tekenen
function drawPaddle() {
    ctx.fillStyle = "white";
    ctx.fillRect(paddleX, canvasHeight - paddleHeight - 10, paddleWidth, paddleHeight);
}

// Bal tekenen
function drawBall() {
    ctx.beginPath();
    ctx.arc(ballX, ballY, ballRadius, 0, Math.PI * 2);
    ctx.fillStyle = ballColor;
    ctx.fill();
    ctx.closePath();
}

// Score bijwerken
function updateScore() {
    document.getElementById("score").innerText = `Score: ${score}`;
}

// Spel logica
function updateGame() {
    if (gameOver) return;

    // Bal bewegen
    ballX += ballSpeedX;
    ballY += ballSpeedY;

    // Botsing met muren
    if (ballX - ballRadius < 0 || ballX + ballRadius > canvasWidth) {
        ballSpeedX = -ballSpeedX;
    }

    if (ballY - ballRadius < 0) {
        ballSpeedY = -ballSpeedY;
    }

    // Paddle botsing
    if (
        ballY + ballRadius >= canvasHeight - paddleHeight - 10 &&
        ballX > paddleX &&
        ballX < paddleX + paddleWidth
    ) {
        ballSpeedY = -ballSpeedY;
        score++;
        updateScore();
    }

    // Game over als de bal het paddle mist
    if (ballY - ballRadius > canvasHeight) {
        showGameOver();
    }
}

// Alles tekenen
function draw() {
    ctx.clearRect(0, 0, canvasWidth, canvasHeight);
    drawBall();
    drawPaddle();
}

// Game loop
function gameLoop() {
    updateGame();
    draw();
    if (!gameOver) {
        requestAnimationFrame(gameLoop);
    }
}

// Spel opnieuw starten
function restartGame() {
    document.getElementById("gameOver").style.display = "none";
    document.getElementById("skinTile").style.display = "none";
    score = 0;
    updateScore();
    ballX = canvasWidth / 2;
    ballY = canvasHeight / 2;
    ballSpeedX = 4;
    ballSpeedY = -4;
    gameOver = false;
    gameLoop();
}

// Start het spel
gameLoop();