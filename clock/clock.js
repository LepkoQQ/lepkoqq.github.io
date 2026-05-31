// hide mouse cursor after 3 seconds of inactivity
(async function () {
  let timeoutId;

  function resetTimeout() {
    document.body.style.cursor = "default";
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => {
      document.body.style.cursor = "none";
    }, 3000);
  }

  document.addEventListener("mousemove", resetTimeout);
  resetTimeout();
})();

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

// update weather
(async function () {
  async function updateWeather() {
    const response = await fetch("https://api.tuhaz.zip/weather");
    if (!response.ok) return;

    const data = await response.json();
    const now = data.data.now;

    const weatherElement = document.querySelector(".weather");

    const iconEl = weatherElement.querySelector(".icon");
    const iconImg = new Image();
    iconImg.src = now.icon;
    iconImg.onload = () => {
      iconEl.innerHTML = "";
      iconEl.appendChild(iconImg);
    };

    const temperatureEl = weatherElement.querySelector(".temperature");
    temperatureEl.querySelector(".value").textContent = now.temperature.value;
    temperatureEl.querySelector(".unit").textContent = now.temperature.unit;

    const humidityEl = weatherElement.querySelector(".humidity");
    humidityEl.querySelector(".value").textContent = now.humidity.value;
    humidityEl.querySelector(".unit").textContent = now.humidity.unit;

    const pressureEl = weatherElement.querySelector(".pressure");
    pressureEl.querySelector(".value").textContent = now.pressure.value;
    pressureEl.querySelector(".unit").textContent = now.pressure.unit;

    const windEl = weatherElement.querySelector(".wind");
    let windSpeedValue = now.wind.speed.value;
    if (now.wind.gusts.value) {
      windSpeedValue += ` (${now.wind.gusts.value})`;
    }
    windEl.querySelector(".value").textContent = windSpeedValue;
    windEl.querySelector(".unit").textContent = now.wind.speed.unit;
    const windIconEl = windEl.querySelector(".icon");
    const windIconImg = new Image();
    windIconImg.src = now.wind.direction.icon;
    windIconImg.onload = () => {
      windIconEl.innerHTML = "";
      windIconEl.appendChild(windIconImg);
    };

    {
      const sunriseEl = weatherElement.querySelector(".sunrise");
      const sunriseTime = new Date(now.sunrise);
      const hours = sunriseTime.getHours().toString().padStart(2, "0");
      const minutes = sunriseTime.getMinutes().toString().padStart(2, "0");
      sunriseEl.querySelector(".hours .tens .value").textContent = hours[0];
      sunriseEl.querySelector(".hours .ones .value").textContent = hours[1];
      sunriseEl.querySelector(".minutes .tens .value").textContent = minutes[0];
      sunriseEl.querySelector(".minutes .ones .value").textContent = minutes[1];
    }

    {
      const sunsetEl = weatherElement.querySelector(".sunset");
      const sunsetTime = new Date(now.sunset);
      const hours = sunsetTime.getHours().toString().padStart(2, "0");
      const minutes = sunsetTime.getMinutes().toString().padStart(2, "0");
      sunsetEl.querySelector(".hours .tens .value").textContent = hours[0];
      sunsetEl.querySelector(".hours .ones .value").textContent = hours[1];
      sunsetEl.querySelector(".minutes .tens .value").textContent = minutes[0];
      sunsetEl.querySelector(".minutes .ones .value").textContent = minutes[1];
    }

    const oneMinuteMs = 60 * 1000;
    setTimeout(updateWeather, oneMinuteMs);
  }

  updateWeather();
})();
