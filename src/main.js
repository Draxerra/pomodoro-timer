import "./style.css";

const timerProgress = document.querySelector("#timer-progress");
const timerText = document.querySelector("#timer-text");
const startTimerBtn = document.querySelector("#start-timer-btn");

let interval = null;

function padSeconds(string) {
  return (new Array(3).join("0") + string).slice(-2);
}

startTimerBtn.addEventListener("click", () => {
  const [minutes, seconds] = timerText.textContent.split(":");
  const duration = parseInt(minutes) * 60 + parseInt(seconds);

  if (startTimerBtn.textContent.trim() === "Start") {
    startTimerBtn.textContent = "Stop";
    startTimerBtn.ariaLabel = "Stop Timer";

    let currentDuration = duration;
    interval = setInterval(() => {
      const currMinutes = ~~(currentDuration / 60);
      const currSeconds = padSeconds(currentDuration % 60);
      const perc = (currentDuration / duration) * 100;

      timerText.textContent = `${currMinutes}:${currSeconds}`;

      timerProgress.style.backgroundImage = `
            conic-gradient(
                from 0.5turn,
                var(--clr-error) ${perc}%,
                transparent ${perc}%
            )`.trim();

      if (currentDuration === 0) {
        return clearInterval(interval);
      }

      currentDuration -= 1;
    }, 1000);
    console.log(interval);
  } else {
    startTimerBtn.textContent = "Start";
    startTimerBtn.ariaLabel = "Start Timer";
    console.log(interval);
    clearInterval(interval);
  }
});
