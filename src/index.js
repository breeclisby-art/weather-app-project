function refreshWeather(response) {
  let currentTemperature = document.querySelector("#current-temperature");
  let weatherAppCity = document.querySelector("#weather-app-city");
  let weatherAppCondition = document.querySelector("#weather-app-condition");
  let humidityValue = document.querySelector("#humidity-value");
  let windSpeedValue = document.querySelector("#wind-speed-value");
  let weatherAppTime = document.querySelector("#weather-app-time");
  let date = new Date(response.data.time * 1000);

  console.log(response.data);

  currentTemperature.innerHTML = Math.round(response.data.temperature.current);
  humidityValue.innerHTML = response.data.temperature.humidity;
  weatherAppCity.innerHTML = response.data.city;
  weatherAppCondition.innerHTML = response.data.condition.description;
  weatherAppTime.innerHTML = formatDate(date);
  windSpeedValue.innerHTML = response.data.wind.speed;
}

function formatDate(date) {
  let minutes = date.getMinutes();
  let hours = date.getHours();
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

function searchCity(city) {
  let apiKey = "21fcd3o9edfa304e81019t7faa2b944f";
  let apiURL = `https://api.shecodes.io/weather/v1/current?query=${city}&key=${apiKey}&units=metric`;

  axios.get(apiURL).then(refreshWeather);
}

function processCitySubmit(event) {
  event.preventDefault();
  let cityInput = document.querySelector("#enter-city-input");

  searchCity(cityInput.value);
}

let searchCityForm = document.querySelector("#search-city-form");
searchCityForm.addEventListener("submit", processCitySubmit);

searchCity("Adelaide");
