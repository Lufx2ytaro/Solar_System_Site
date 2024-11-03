document.getElementById('quiz-form').addEventListener('submit', function(event) {
  event.preventDefault(); // Отменяем стандартное поведение формы

  let score = 0;
  const totalQuestions = 5;

  // Правильные ответы
  const answers = {
      question1: 'b',
      question2: 'b',
      question3: 'a',
      question4: 'c',
      question5: 'a'
  };

  // Проверяем ответы
  for (let question in answers) {
      const userAnswer = document.querySelector(`input[name="${question}"]:checked`);
      if (userAnswer && userAnswer.value === answers[question]) {
          score++;
      }
  }

  // Выводим результат
  const resultDiv = document.getElementById('result');
  resultDiv.innerHTML = `Вы набрали ${score} из ${totalQuestions}.`;
});
