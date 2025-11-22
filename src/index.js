function refreshWeather(response) {
  let currentTemperature = document.querySelector("#current-temperature");
  let temperature = response.data.temperature.current;
  let weatherAppCity = document.querySelector("#weather-app-city");

  currentTemperature.innerHTML = Math.round(temperature);
  weatherAppCity.innerHTML = response.data.city;
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
