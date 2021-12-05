import "./style.css";

const timerProgress = document.querySelector("#timer-progress");
const timerText = document.querySelector("#timer-text");
const startTimerBtn = document.querySelector("#start-timer-btn");

let interval = null;
let [minutes, seconds] = timerText.textContent.split(":");
const duration = parseInt(minutes) * 60 + parseInt(seconds);
let currentDuration = duration;

function padSeconds(string) {
  return (new Array(3).join("0") + string).slice(-2);
}

startTimerBtn.addEventListener("click", () => {
  if (startTimerBtn.textContent.trim() === "Start") {
    startTimerBtn.textContent = "Stop";
    startTimerBtn.ariaLabel = "Stop Timer";

    interval = setInterval(() => {
      minutes = ~~(currentDuration / 60);
      seconds = padSeconds(currentDuration % 60);
      const perc = (currentDuration / duration) * 100;
      const transPerc = perc === 0 ? perc : Math.min(perc + 10, 100);

      timerText.textContent = `${minutes}:${seconds}`;
      timerProgress.style.setProperty("--clr-perc", `${perc}%`);
      timerProgress.style.setProperty("--trans-perc", `${transPerc}%`);

      if (currentDuration === 0) {
        clearInterval(interval);
      } else {
        currentDuration -= 1;
      }
    }, 1000);
  } else {
    startTimerBtn.textContent = "Start";
    startTimerBtn.ariaLabel = "Start Timer";
    clearInterval(interval);
  }
});
