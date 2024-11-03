
    // Функция для переключения трека
    function playAudio(url) {
      const audioPlayer = document.getElementById("audio-player");
      // Проверка, воспроизводится ли уже другой трек
      if (audioPlayer.src !== url) {
        audioPlayer.src = url; // Устанавливаем новый источник
        audioPlayer.play();    // Запускаем воспроизведение
      } else if (audioPlayer.paused) {
        audioPlayer.play();    // Если тот же трек на паузе, продолжаем воспроизведение
      } else {
        audioPlayer.pause();   // Если трек уже воспроизводится, ставим на паузу
      }
    }
