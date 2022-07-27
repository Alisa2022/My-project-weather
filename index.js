function formatDate() {
  let now = new Date();
  let hours = now.getHours();
  let minutes = now.getMinutes();
  if (minutes < 10) {
    minutes = `0${minutes}`;
  }
  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  let day = days[now.getDay()];

  let today = `${day} ${hours}:${minutes}`;
  return today;
}
let dayAndTime = document.querySelector("#day-and-time");
dayAndTime.innerHTML = formatDate();

function getCity(event) {
  event.preventDefault();
  let cityForm = document.querySelector("#cityForm");
  let city = document.querySelector("#city");
  city.innerHTML = `${cityForm.value}`;
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${cityForm.value}&appid=f4db6aa7e5cfe4049fcbfe96c0455ba9&units=metric`;
  axios.get(apiUrl).then(showTemperature);
}

let searchForm = document.querySelector("#search-form");
searchForm.addEventListener("submit", getCity);

function showFahrenheit(event) {
  event.preventDefault();
  let currentTemp = document.querySelector("#currentTemp");
  currentTemp.innerHTML = "66";
}
let clickFahrenheit = document.querySelector("#fahrenheit-link");
clickFahrenheit.addEventListener("click", showFahrenheit);

function showCelsius(event) {
  event.preventDefault();
  let currentTemp = document.querySelector("#currentTemp");
  currentTemp.innerHTML = "19";
}
let clickCelsius = document.querySelector("#celsius-link");
clickCelsius.addEventListener("click", showCelsius);

function showTemperature(response) {
  let showTemp = Math.round(response.data.main.temp);
  let currentTemp = document.querySelector("#currentTemp");
  currentTemp.innerHTML = `${showTemp}`;
}
document.querySelector("#btnLocation").addEventListener("click", function () {
  function showPosition(position) {
    let lat = position.coords.latitude;
    let lon = position.coords.longitude;
    let apiUrlLocation = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=f4db6aa7e5cfe4049fcbfe96c0455ba9&units=metric`;
    axios.get(apiUrlLocation).then(showTemperatureGps);
  }

  navigator.geolocation.getCurrentPosition(showPosition);

  function showTemperatureGps(response) {
    let currentTempGps = Math.round(response.data.main.temp);
    let currentCity = response.data.name;
    currentTemp.innerHTML = `${currentTempGps}`;
    city.innerHTML = `${currentCity}`;
  }
});
