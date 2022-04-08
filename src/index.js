let now = document.querySelector("#now");
let currentTime = new Date();
let hours = currentTime.getHours();
if (hours < 10) {
  hours = `0${hours}`;
}
let minutes = currentTime.getMinutes();
if (minutes < 10) {
  minutes = `0${minutes}`;
}
let dayIndex = currentTime.getDay();
let days = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];
now.innerHTML = `${days[dayIndex]} ${hours}:${minutes}`;

function displayForecast() {
  let forecastElement = document.querySelector("#forecast");
  let forecastHTML = `<div class="row">`;
  let days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri"];
  days.forEach(function (day) {
    forecastHTML =
      forecastHTML +
      `
      <div class="col-2">${day}
            <div><i class="fa-solid fa-sun"></i></div>
           <span class="max-forecast">20°</span> <span class="min-forecast">10°</span>
          </div>
  `;
  });

  forecastHTML = forecastHTML + `</div>`;
  forecastElement.innerHTML = forecastHTML;
  console.log(forecastHTML);
}
function showCityTemp(response) {
  celsiusTemp = response.data.main.temp;
  document.querySelector("#city-name").innerHTML = response.data.name;
  document.querySelector("#currentTemp").innerHTML = Math.round(
    response.data.main.temp
  );
  document.querySelector("#description").innerHTML =
    response.data.weather[0].description;
  document.querySelector("#humidity").innerHTML = response.data.main.humidity;
  document.querySelector("#wind").innerHTML = Math.round(
    response.data.wind.speed
  );
  document
    .querySelector("#icon")
    .setAttribute(
      "src",
      `https://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
    );
  document
    .querySelector("#icon")
    .setAttribute("alt", response.data.weather[0].description);
}
let searchedCity = document.querySelector("#search-city");
searchedCity.addEventListener("submit", search);
function search(event) {
  event.preventDefault();
  let city = document.querySelector("#city-input").value;
  let units = "metric";
  let apiKey = "4905108a47943490a132d537d96a7012";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=${units}`;
  axios.get(apiUrl).then(showCityTemp);
}

function getLocation(position) {
  let apiKey = "4905108a47943490a132d537d96a7012";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${position.coords.latitude}&lon=${position.coords.longitude}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(showCityTemp);
}

function getCurrentLocation(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(getLocation);
}
let currentLocationButton = document.querySelector("#current-location-button");
currentLocationButton.addEventListener("click", getCurrentLocation);

let fahrenheit = document.querySelector("#fahrenheit-link");
fahrenheit.addEventListener("click", toFahrenheit);
function toFahrenheit(event) {
  event.preventDefault();
  celsius.classList.remove("active");
  fahrenheit.classList.add("active");
  let fahrenheitTemp = (celsiusTemp * 9) / 5 + 32;
  let currentTemp = document.querySelector("#currentTemp");
  currentTemp.innerHTML = Math.round(fahrenheitTemp);
}

let celsius = document.querySelector("#celsius-link");
celsius.addEventListener("click", toCelsius);
function toCelsius(event) {
  event.preventDefault();
  celsius.classList.add("active");
  fahrenheit.classList.remove("active");
  let currentTemp = document.querySelector("#currentTemp");
  currentTemp.innerHTML = Math.round(celsiusTemp);
}
let celsiusTemp = null;
displayForecast();
