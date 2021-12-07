import "./style.css";

const timerProgress = document.querySelector("#timer-progress");
const timer = document.querySelector("#timer");
const timerStatus = document.querySelector("#timer-status");
const startTimerBtn = document.querySelector("#start-timer-btn");

let interval = null;
let [minutes, seconds] = timer.textContent.split(":");
const duration = parseInt(minutes) * 60 + parseInt(seconds);

let currentDuration = duration;

function padSeconds(string) {
  return (new Array(3).join("0") + string).slice(-2);
}

startTimerBtn.addEventListener("click", () => {
  if (startTimerBtn.textContent.trim() === "Start") {
    startTimerBtn.textContent = "Stop";
    startTimerBtn.setAttribute("aria-label", "Stop Timer");

    interval = setInterval(() => {
      minutes = ~~(currentDuration / 60);
      seconds = currentDuration % 60;
      const paddedSeconds = padSeconds(seconds);
      const perc = (currentDuration / duration) * 100;
      const transPerc = perc === 0 ? perc : Math.min(perc + 10, 100);

      timer.setAttribute("datetime", `PT0H${minutes}M${paddedSeconds}S`);
      timer.textContent = `${minutes}:${paddedSeconds}`;
      timerStatus.textContent = `${minutes} minutes and ${seconds} seconds remaining.`;
      timerProgress.style.setProperty("--clr-perc", `${perc}%`);
      timerProgress.style.setProperty("--trans-perc", `${transPerc}%`);

      if (currentDuration % 10 === 0) {
        timerStatus.setAttribute("role", "status");
      } else {
        timerStatus.removeAttribute("role");
      }

      if (currentDuration === 0) {
        clearInterval(interval);
      } else {
        currentDuration -= 1;
      }
    }, 1000);
  } else {
    startTimerBtn.textContent = "Start";
    startTimerBtn.setAttribute("aria-label", "Start Timer");
    clearInterval(interval);
  }
});
