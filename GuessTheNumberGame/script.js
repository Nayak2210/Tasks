
let randomNumber = Math.floor(Math.random() * 100) + 1;
let attempts = 0;
const leaderboard = JSON.parse(localStorage.getItem('leaderboard')) || [];

function checkGuess() {
  const guess = Number(document.getElementById('guessInput').value);
  const feedback = document.getElementById('feedback');

  if (!guess || guess < 1 || guess > 100) {
    feedback.textContent = "⚠️ Please enter a number between 1 and 100.";
    return;
  }

  attempts++;
  document.getElementById('attempts').textContent = `Attempts: ${attempts}`;

  const diff = guess - randomNumber;

  if (diff === 0) {
    feedback.textContent = `🎉 Correct! The number was ${randomNumber}.`;
    updateLeaderboard(attempts);
  } else if (Math.abs(diff) <= 2) {
    feedback.textContent = diff < 0
      ? "🔥 Very close! Just a little higher."
      : "🔥 Very close! Just a little lower.";
  } else if (Math.abs(diff) <= 10) {
    feedback.textContent = diff < 0
      ? "😯 Close! Try a bit higher."
      : "😯 Close! Try a bit lower.";
  } else {
    feedback.textContent = diff < 0
      ? "📉 Too low! Try again."
      : "📈 Too high! Try again.";
  }
}

function resetGame() {
  randomNumber = Math.floor(Math.random() * 100) + 1;
  attempts = 0;
  document.getElementById('feedback').textContent = '';
  document.getElementById('guessInput').value = '';
  document.getElementById('attempts').textContent = 'Attempts: 0';
}

window.checkGuess = checkGuess;
window.resetGame = resetGame;

function updateLeaderboard(score) {
  leaderboard.push(score);
  leaderboard.sort((a, b) => a - b);
  if (leaderboard.length > 5) leaderboard.pop();
  localStorage.setItem('leaderboard', JSON.stringify(leaderboard));
  renderLeaderboard();
}

function renderLeaderboard() {
  const list = document.getElementById('leaderboardList');
  list.innerHTML = '';
  leaderboard.forEach((score, index) => {
    const li = document.createElement('li');
    li.textContent = `#${index + 1} - ${score} attempts`;
    list.appendChild(li);
  });
}

renderLeaderboard();

document.getElementById("guessInput").addEventListener("keydown", function (event) {
  if (event.key === "Enter") {
    checkGuess();
  }
});
