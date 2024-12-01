const wheel = document.getElementById('wheel');
const resultDiv = document.getElementById('result');
let participants = []; // Список участников, загружаемых из Google Таблицы

const SHEET_ID = '1HulAlfC6bGr6YK01kSbVsPqiK2TQ3asal0kMcC1ViBU';
const API_URL = `https://spreadsheets.google.com/feeds/list/${SHEET_ID}/od6/public/values?alt=json`;

async function loadParticipants() {
  try {
    const response = await fetch(API_URL);
    const data = await response.json();
    participants = data.feed.entry.map(item => item.gsx$name.$t); // Пример извлечения данных из таблицы
    createSegments(); // Создаем сегменты на колесе
  } catch (error) {
    console.error("Ошибка загрузки участников:", error);
    resultDiv.textContent = "Ошибка загрузки данных.";
  }
}

// Создаем сегменты колеса
function createSegments() {
  wheel.innerHTML = ''; // Очищаем колесо перед созданием сегментов
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
  if (participants.length === 0) {
    resultDiv.textContent = "Список участников пуст. Загрузите данные!";
    return;
  }

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

// Загрузка данных при загрузке страницы
loadParticipants();
