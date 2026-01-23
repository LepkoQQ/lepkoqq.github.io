// update clock
(async function () {
  const clockElement = document.querySelector(".clock");
  if (!clockElement) return;

  const hoursEl = clockElement.querySelector(".hours");
  const minutesEl = clockElement.querySelector(".minutes");
  const secondsEl = clockElement.querySelector(".seconds");
  const separators = clockElement.querySelectorAll(".separator");

  function updateClock() {
    const now = new Date();
    const hoursTens = Math.floor(now.getHours() / 10);
    const hoursOnes = now.getHours() % 10;
    const minutesTens = Math.floor(now.getMinutes() / 10);
    const minutesOnes = now.getMinutes() % 10;
    const secondsTens = Math.floor(now.getSeconds() / 10);
    const secondsOnes = now.getSeconds() % 10;

    hoursEl.querySelector(".tens .value").textContent = hoursTens;
    hoursEl.querySelector(".ones .value").textContent = hoursOnes;
    minutesEl.querySelector(".tens .value").textContent = minutesTens;
    minutesEl.querySelector(".ones .value").textContent = minutesOnes;
    secondsEl.querySelector(".tens .value").textContent = secondsTens;
    secondsEl.querySelector(".ones .value").textContent = secondsOnes;
    separators.forEach((sep) => {
      sep.classList.toggle("blink");
    });

    const nextTick = 1000 - now.getMilliseconds();
    setTimeout(updateClock, nextTick);
  }

  updateClock();
})();
