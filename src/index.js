function processCitySubmit(event) {
  event.preventDefault();
  let cityInput = document.querySelector("#enter-city-input");
  let weatherAppCity = document.querySelector("#weather-app-city");
  weatherAppCity.innerHTML = cityInput.value;
}

let searchCityForm = document.querySelector("#search-city-form");
searchCityForm.addEventListener("submit", processCitySubmit);
