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

function displayWeather(response) {
  document.querySelector("#city").innerHTML = response.data.name;
  document.querySelector("#temperature").innerHTML = Math.round(
    response.data.main.temp
  );
  document.querySelector("#wind").innerHTML = Math.round(
    response.data.wind.speed
  );
  document.querySelector("#description").innerHTML =
    response.data.weather[0].description;

  let icon = document.querySelector("#icon");
  icon.setAttribute(
    "src",
    `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
  );
}

function searchCity(city) {
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=f4db6aa7e5cfe4049fcbfe96c0455ba9&units=metric`;
  axios.get(apiUrl).then(displayWeather);
}

function handleSubmit(event) {
  event.preventDefault();
  let city = document.querySelector("#cityForm").value;
  searchCity(city);
}

let searchForm = document.querySelector("#search-form");
searchForm.addEventListener("submit", handleSubmit);

searchCity("Paris");

function showFahrenheit(event) {
  event.preventDefault();
  let currentTemp = document.querySelector("#temperature");
  currentTemp.innerHTML = "66";
}
let clickFahrenheit = document.querySelector("#fahrenheit-link");
clickFahrenheit.addEventListener("click", showFahrenheit);

function showCelsius(event) {
  event.preventDefault();
  let currentTemp = document.querySelector("#temperature");
  currentTemp.innerHTML = "19";
}
let clickCelsius = document.querySelector("#celsius-link");
clickCelsius.addEventListener("click", showCelsius);

document.querySelector("#btnLocation").addEventListener("click", function () {
  function showPosition(position) {
    let lat = position.coords.latitude;
    let lon = position.coords.longitude;
    let apiUrlLocation = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=f4db6aa7e5cfe4049fcbfe96c0455ba9&units=metric`;
    axios.get(apiUrlLocation).then(displayWeather);
  }

  navigator.geolocation.getCurrentPosition(showPosition);
});
