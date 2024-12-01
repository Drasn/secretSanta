const participants = ["Алексей", "Мария", "Сергей", "Анна", "Игорь", "Ольга"]; // Пример участников
const wheel = document.getElementById('wheel');
const resultDiv = document.getElementById('result');

// Создаем сегменты
function createSegments() {
  const segmentAngle = 360 / participants.length;
  participants.forEach((name, index) => {
    const segment = document.createElement('div');
    segment.className = 'segment';
    segment.style.transform = `rotate(${index * segmentAngle}deg)`;
    segment.style.backgroundColor = `hsl(${index * 60}, 70%, 80%)`; // Цвета сегментов
    segment.innerHTML = `
      <div style="
        position: absolute; 
        transform: rotate(${segmentAngle / 2}deg) translate(100px, -20px);
        text-align: center;
      ">
        ${name}
      </div>`;
    wheel.appendChild(segment);
  });
}

// Запуск спиннера
function startSpin() {
  resultDiv.textContent = ''; // Сброс результата
  const spins = Math.floor(Math.random() * 5) + 5; // Количество оборотов
  const selectedIndex = Math.floor(Math.random() * participants.length);
  const finalAngle = 360 * spins + (360 - selectedIndex * (360 / participants.length));

  // Запуск анимации
  wheel.style.transition = 'transform 4s ease-out';
  wheel.style.transform = `rotate(${finalAngle}deg)`;

  // Показ результата
  setTimeout(() => {
    resultDiv.textContent = `Выбран участник: ${participants[selectedIndex]}`;
  }, 4000);
}

createSegments();
