const JSON_URL = 'https://raw.githubusercontent.com/Drasn/secretSanta/refs/heads/main/participants.json'; // Укажите свой URL на GitHub
let participants = []; // Массив для участников
let wheel; // Колесо

// Загрузка данных участников
async function loadParticipants() {
  try {
    const response = await fetch(JSON_URL);
    const data = await response.json();
    participants = data.map(item => item.name); // Пример, что у каждого участника есть поле 'name'
    console.log(participants); // Выводим список участников в консоль
    initializeWheel(); // Инициализируем колесо после загрузки участников
  } catch (error) {
    console.error("Ошибка загрузки данных:", error);
  }
}

// Инициализация колеса
function initializeWheel() {
  const canvas = document.getElementById("wheelCanvas");
  const ctx = canvas.getContext("2d");

  const numSegments = participants.length; // Количество сегментов на колесе
  const angle = Math.PI * 2 / numSegments; // Угол каждого сегмента
  const radius = canvas.width / 2 - 10;

  wheel = {
    canvas: canvas,
    ctx: ctx,
    segments: participants,
    numSegments: numSegments,
    angle: angle,
    radius: radius,
    startAngle: 0
  };

  // Рисуем колесо
  drawWheel();
}

// Функция для рисования колеса
function drawWheel() {
  const ctx = wheel.ctx;
  const radius = wheel.radius;
  const numSegments = wheel.numSegments;
  const angle = wheel.angle;
  const startAngle = wheel.startAngle;

  ctx.clearRect(0, 0, wheel.canvas.width, wheel.canvas.height); // Очистить холст

  // Рисуем каждый сегмент
  for (let i = 0; i < numSegments; i++) {
    const segmentAngle = startAngle + i * angle;
    ctx.fillStyle = `hsl(${(i * 360) / numSegments}, 80%, 60%)`;

    ctx.beginPath();
    ctx.arc(wheel.canvas.width / 2, wheel.canvas.height / 2, radius, segmentAngle, segmentAngle + angle);
    ctx.lineTo(wheel.canvas.width / 2, wheel.canvas.height / 2);
    ctx.fill();
  }

  // Добавляем текст в сегменты
  ctx.fillStyle = "#fff";
  ctx.font = "16px Arial";
  ctx.textAlign = "center";
  ctx.textBaseline = "middle";

  for (let i = 0; i < numSegments; i++) {
    const segmentAngle = startAngle + i * angle + angle / 2;
    const x = wheel.canvas.width / 2 + Math.cos(segmentAngle) * radius / 1.5;
    const y = wheel.canvas.height / 2 + Math.sin(segmentAngle) * radius / 1.5;
    ctx.fillText(wheel.segments[i], x, y);
  }
}

// Функция для кручения колеса
function spinWheel() {
  const spinDuration = 5000; // Длительность вращения в миллисекундах
  const finalAngle = Math.random() * Math.PI * 2 + Math.PI * 10; // Случайный угол для остановки

  let startTime = null;
  const initialAngle = wheel.startAngle;

  // Анимация вращения
  function animateSpin(time) {
    if (!startTime) startTime = time;
    const progress = (time - startTime) / spinDuration;
    if (progress < 1) {
      wheel.startAngle = initialAngle + (finalAngle - initialAngle) * easeOutQuad(progress);
      drawWheel();
      requestAnimationFrame(animateSpin);
    } else {
      // Остановка вращения
      wheel.startAngle = finalAngle;
      drawWheel();
      announceWinner(); // Объявляем победителя
    }
  }

  requestAnimationFrame(animateSpin);
}

// Функция для замедленного эффекта (ease out)
function easeOutQuad(t) {
  return t * (2 - t);
}

// Функция для объявления победителя
function announceWinner() {
  const winnerIndex = Math.floor((wheel.startAngle % (Math.PI * 2)) / wheel.angle);
  const winner = participants[winnerIndex];
  alert(`Поздравляем! Победитель: ${winner}`);
}

// Навешиваем обработчик на кнопку
document.getElementById("spinButton").addEventListener("click", spinWheel);

// Загружаем участников при старте
loadParticipants();
