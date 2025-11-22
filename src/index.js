function formatDate(date) {
  let hours = date.getHours();
  let minutes = date.getMinutes();
  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  let day = days[date.getDay()];

  if (minutes < 10) {
    minutes = `0${minutes}`;
  }

  if (hours < 10) {
    hours = `0${hours}`;
  }

  return `${day} ${hours}:${minutes}`;
}

function formatForecastDay(timestamp) {
  let date = new Date(timestamp * 1000);
  let days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

  return days[date.getDay()];
}

function searchCity(city) {
  let apiKey = "21fcd3o9edfa304e81019t7faa2b944f";
  let apiURL = `https://api.shecodes.io/weather/v1/current?query=${city}&key=${apiKey}&units=metric`;

  axios.get(apiURL).then(refreshWeather);
}

function getForecast(city) {
  let apiKey = "21fcd3o9edfa304e81019t7faa2b944f";
  let apiURL = `https://api.shecodes.io/weather/v1/forecast?query=${city}&key=${apiKey}&units=metric`;

  axios.get(apiURL).then(displayForecast);
}

function refreshWeather(response) {
  let currentTemperature = document.querySelector("#current-temperature");
  let date = new Date(response.data.time * 1000);
  let humidityValue = document.querySelector("#humidity-value");
  let weatherAppCity = document.querySelector("#weather-app-city");
  let weatherAppCondition = document.querySelector("#weather-app-condition");
  let windSpeedValue = document.querySelector("#wind-speed-value");
  let weatherAppIcon = document.querySelector("#weather-app-icon");
  let weatherAppTime = document.querySelector("#weather-app-time");

  currentTemperature.innerHTML = Math.round(response.data.temperature.current);
  humidityValue.innerHTML = response.data.temperature.humidity;
  weatherAppCity.innerHTML = response.data.city;
  weatherAppCondition.innerHTML = response.data.condition.description;
  weatherAppIcon.innerHTML = `<img src="${response.data.condition.icon_url}"
      alt="${response.data.condition.icon}" class="weather-app-icon" 
    />`;
  weatherAppTime.innerHTML = formatDate(date);
  windSpeedValue.innerHTML = response.data.wind.speed;

  getForecast(response.data.city);
}

function displayForecast(response) {
  let weatherAppForecast = document.querySelector("#weather-app-forecast");

  weatherAppForecast.innerHTML = "";

  response.data.daily.forEach(function (day, index) {
    if (index < 5) {
      weatherAppForecast.innerHTML += `
      <div class="weather-app-forecast-data">
      <div class="weather-app-forecast-day">${formatForecastDay(day.time)}</div>
      <div ><img src="${day.condition.icon_url}"
      alt="${day.condition.icon}" class="weather-app-forecast-icon"
      /></div>
      <div class="weather-app-forecast-temperatures">
      <div class="temperature-max">${Math.round(day.temperature.maximum)}°</div>
      <div class="temperature-min">${Math.round(day.temperature.minimum)}°</div>
      </div>
      </div>
      `;
    }
  });
}

function processCitySubmit(event) {
  event.preventDefault();
  let cityInput = document.querySelector("#enter-city-input");

  searchCity(cityInput.value);
}

let searchCityForm = document.querySelector("#search-city-form");
searchCityForm.addEventListener("submit", processCitySubmit);

searchCity("Adelaide");
