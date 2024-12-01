const wheel = document.getElementById('wheel');
const resultDiv = document.getElementById('result');
let participants = []; // Список участников, загружаемых из Google Таблицы

// ID Google Таблицы и API
const SPREADSHEET_ID = "1HulAlfC6bGr6YK01kSbVsPqiK2TQ3asal0kMcC1ViBU";
const SHEET_NAME = "Sheet1";
const API_KEY = "https://script.google.com/macros/s/AKfycbxrPcDYYcsX7CuDTaRziF4Ptau48o9eoz-3pbskR58IaJkCuf3FIXGTU5apsuoBFt4/exec";

// URL для получения данных из Google Таблицы
const fetchURL = `https://sheets.googleapis.com/v4/spreadsheets/${SPREADSHEET_ID}/values/${SHEET_NAME}?key=${API_KEY}`;

const API_URL = 'https://script.google.com/macros/s/AKfycbxrPcDYYcsX7CuDTaRziF4Ptau48o9eoz-3pbskR58IaJkCuf3FIXGTU5apsuoBFt4/exec';

// Загружаем данные с Google Таблицы
async function loadParticipants() {
  try {
    const response = await fetch(API_URL);
    const data = await response.json();
    participants = data.map(item => item.name); // Мапируем данные на список участников
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
