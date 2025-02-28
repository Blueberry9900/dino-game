// Получаем элементы динозавра и кактуса
const dino = document.getElementById("dino");
const cactus = document.getElementById("cactus");

// Получаем элементы управления музыкой
const backgroundMusic = document.getElementById("backgroundMusic");
const musicButton = document.getElementById("musicButton");
const volumeSlider = document.getElementById("volumeSlider");

// Получаем элементы начального экрана и экрана "GAME OVER"
const startScreen = document.getElementById("startScreen");
const startButton = document.getElementById("startButton");
const gameOverMessage = document.getElementById("gameOverMessage");
const restartButton = document.getElementById("restartButton");
const scoreDisplay = document.getElementById("scoreDisplay");
const scoreValue = document.getElementById("scoreValue");
const finalScoreValue = document.getElementById("finalScoreValue");

// Переменные для состояния игры
let isGameOver = false;
let score = 0;
let cactusPassed = false; // Флаг для отслеживания перепрыгнутого кактуса

// Функция запуска игры
function startGame() {
    startScreen.classList.add("hidden");
    document.querySelector(".game").classList.remove("hidden");
    musicButton.classList.remove("hidden");
    scoreDisplay.classList.remove("hidden");

    backgroundMusic.play();
    musicButton.textContent = "Выключить музыку";

    isGameOver = false;
    score = 0;
    scoreValue.textContent = score;
    cactusPassed = false;

    cactus.style.left = "100%";
}

// Функция прыжка динозавра
function jump() {
    if (!isGameOver && !dino.classList.contains("jump")) {
        dino.classList.add("jump");

        setTimeout(() => {
            dino.classList.remove("jump");
        }, 500);
    }
}

// Обработчики кнопок
startButton.addEventListener("click", startGame);
restartButton.addEventListener("click", () => {
    gameOverMessage.style.display = "none";
    startGame();
});

// Обработчик управления музыкой
musicButton.addEventListener("click", () => {
    if (backgroundMusic.paused) {
        backgroundMusic.play();
        musicButton.textContent = "Выключить музыку";
    } else {
        backgroundMusic.pause();
        musicButton.textContent = "Включить музыку";
    }
});

// Обработчик громкости
volumeSlider.addEventListener("input", () => {
    backgroundMusic.volume = volumeSlider.value;
});

// Обработчики прыжка
document.addEventListener("keydown", () => {
    if (!isGameOver) jump();
});
document.addEventListener("touchstart", (event) => {
    if (!isGameOver) {
        event.preventDefault();
        jump();
    }
});

// Основная логика проверки столкновений и подсчета очков
let isAlive = setInterval(() => {
    if (isGameOver) return;

    const dinoTop = parseInt(window.getComputedStyle(dino).getPropertyValue("top"));
    const cactusLeft = parseInt(window.getComputedStyle(cactus).getPropertyValue("left"));

    const hitboxWidth = 25;
    const hitboxOffset = 0;
    const dinoHitboxWidth = 30;
    const dinoHitboxOffset = 10;

    const hitboxLeft = cactusLeft + hitboxOffset;
    const hitboxRight = hitboxLeft + hitboxWidth;
    const dinoHitboxLeft = 50 + dinoHitboxOffset;
    const dinoHitboxRight = dinoHitboxLeft + dinoHitboxWidth;

    // Проверяем, перепрыгнул ли динозавр кактус
    if (cactusLeft + hitboxWidth < dinoHitboxLeft && !cactusPassed) {
        score++;
        scoreValue.textContent = score;
        cactusPassed = true; // Кактус перепрыгнут
    }

    // Сбрасываем флаг, если кактус прошел динозавра
    if (cactusLeft > dinoHitboxRight) {
        cactusPassed = false;
    }

    // Проверка столкновения
    if (
        hitboxLeft < dinoHitboxRight &&
        hitboxRight > dinoHitboxLeft &&
        dinoTop >= 130
    ) {
        isGameOver = true;
        gameOverMessage.style.display = "block";
        finalScoreValue.textContent = score; // Итоговый счет
    }
}, 10);
