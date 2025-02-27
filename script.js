// Получаем элементы динозавра и кактуса из HTML
const dino = document.getElementById("dino");
const cactus = document.getElementById("cactus");

// Добавляем слушатель событий на нажатие клавиши
document.addEventListener("keydown", function () {
    jump(); // При нажатии на клавишу вызываем функцию jump()
});

// Добавляем слушатель событий на касание экрана
document.addEventListener("touchstart", function () {
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

    // Проверяем, столкнулись ли динозавр и кактус
    if (cactusLeft < 50 && cactusLeft > 0 && dinoTop >= 130) { 
        // Если кактус находится перед динозавром и динозавр на земле, игрок проигрывает
        alert("GAME OVER"); // Показываем сообщение о проигрыше
        location.reload(); // Перезагружаем страницу, чтобы начать заново
    }
}, 10); // Проверяем состояние каждые 10 миллисекунд