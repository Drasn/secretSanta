// Функция для отправки POST-запроса с данными участника
async function saveParticipantsAndExcluded(participantToExclude) {
  const data = {
    action: "excludeParticipant", 
    participant: participantToExclude
  };

  try {
    const response = await fetch('https://script.google.com/macros/s/AKfycbwfLAUVMIhaYQlRiYhzgBUOk0CLf54GLyOFB54mxQ/dev', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    });

    const result = await response.json();
    if (result.status === "success") {
      console.log("Участник успешно исключен.");
    } else {
      console.error("Ошибка при исключении участника.");
    }
  } catch (error) {
    console.error("Ошибка при отправке POST-запроса:", error);
  }
}

// Пример использования
saveParticipantsAndExcluded('Alice');
