// Получаем элементы динозавра и кактуса из HTML
const dino = document.getElementById("dino");
const cactus = document.getElementById("cactus");

// Добавляем слушатель событий на нажатие клавиши
document.addEventListener("keydown", function () {
    jump(); // При нажатии на клавишу вызываем функцию jump()
});

// Добавляем слушатель событий на касание экрана
document.addEventListener("touchstart", function (event) {
    event.preventDefault(); // Отключаем стандартное поведение касания (например, скролл)
    jump(); // При касании экрана вызываем функцию jump()
});

// Функция для прыжка динозавра
function jump() {
    // Проверяем, не выполняется ли уже анимация прыжка
    if (!dino.classList.contains("jump")) {
        dino.classList.add("jump"); // Добавляем класс, который запускает анимацию

        // Удаляем класс "jump" после завершения анимации
        setTimeout(() => {
            dino.classList.remove("jump");
        }, 500);
    }
}

// Устанавливаем интервал для постоянной проверки столкновения
let isAlive = setInterval(function () {
    // Получаем текущее положение динозавра (его верхнюю координату)
    let dinoTop = parseInt(window.getComputedStyle(dino).getPropertyValue("top"));

    // Получаем текущее положение кактуса (его левую координату)
    let cactusLeft = parseInt(window.getComputedStyle(cactus).getPropertyValue("left"));

    // Параметры хитбокса кактуса
    const hitboxWidth = 25; // Ширина хитбокса кактуса 
    const hitboxOffset = 0; // Смещение хитбокса кактуса относительно левого края (без смещения)

    // Параметры хитбокса динозавра
    const dinoHitboxWidth = 30; // Ширина хитбокса динозавра (уменьшена)
    const dinoHitboxOffset = 10; // Смещение хитбокса динозавра относительно левого края

    // Рассчитываем положение хитбокса кактуса
    const hitboxLeft = cactusLeft + hitboxOffset; // Левый край хитбокса кактуса
    const hitboxRight = hitboxLeft + hitboxWidth; // Правый край хитбокса кактуса

    // Рассчитываем положение хитбокса динозавра
    const dinoHitboxLeft = 50 + dinoHitboxOffset; // Левый край хитбокса динозавра
    const dinoHitboxRight = dinoHitboxLeft + dinoHitboxWidth; // Правый край хитбокса динозавра

    // Отладка: выводим положение хитбоксов
    console.log("Cactus Left:", cactusLeft, "Hitbox Left:", hitboxLeft, "Hitbox Right:", hitboxRight);
    console.log("Dino Hitbox Left:", dinoHitboxLeft, "Dino Hitbox Right:", dinoHitboxRight, "Dino Top:", dinoTop);

    // Проверяем, столкнулись ли динозавр и кактус
    if (
        hitboxLeft < dinoHitboxRight && // Хитбокс кактуса находится в зоне хитбокса динозавра (левая граница)
        hitboxRight > dinoHitboxLeft && // Хитбокс кактуса не вышел за пределы хитбокса динозавра (правая граница)
        dinoTop >= 130 // Динозавр находится на земле
    ) {
        // Если кактус находится перед динозавром и динозавр на земле, игрок проигрывает
        alert("GAME OVER"); // Показываем сообщение о проигрыше
        location.reload(); // Перезагружаем страницу, чтобы начать заново
    }
}, 10); // Проверяем состояние каждые 10 миллисекунд