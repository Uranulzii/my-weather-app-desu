//search and submit,then result of it will show up
function inputCity(event) {
  event.preventDefault();
  let cityInput = document.querySelector("#city-input");
  let h2 = document.querySelector("h2");
  h2.innerHTML = `Hey there,Today ${cityInput.value} will be sunny!`;
  function showTemperature(response) {
    let weather = document.querySelector("#temperatures");
    let temperature = Math.round(response.data.main.temp);
    weather.innerHTML = `${temperature}`;
    console.log(response);
  }
  let apiKey = "1f4cebd395732f4932b34e3c80f1dbca";
  let city = document.querySelector("#city-input");
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city.value}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(showTemperature);
}

let cityForm = document.querySelector("#search-form");
cityForm.addEventListener("submit", inputCity);

// current time will show up
function formatDate(date) {
  let dates = date.getDate();
  let hours = date.getHours();
  if (hours < 10) {
    hours = `0${hours}`;
  }
  let minutes = date.getMinutes();
  if (minutes < 10) {
    minutes = `0${minutes}`;
  }
  let year = date.getFullYear();
  let days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  let day = days[now.getDay()];

  let months = [
    "01",
    "02",
    "03",
    "04",
    "05",
    "06",
    "07",
    "08",
    "09",
    "10",
    "11",
    "12",
  ];
  let month = months[now.getMonth()];
  return `${year}/${month}/${dates}(${day}) ${hours}:${minutes} `;
}
let now = new Date();
let h3 = document.querySelector("h3");
h3.innerHTML = formatDate(now);

//converting temperature
function convertToFahrenheit(event) {
  event.preventDefault();
  let temperatureElement = document.querySelector("#temperatures");
  let temperature = temperatureElement.innerHTML;
  temperature = Number(temperature);
  temperatureElement.innerHTML = Math.round((temperature * 9) / 5 + 32);
}
let fahrenheitLink = document.querySelector("#fahrenheit-link");
fahrenheitLink.addEventListener("click", convertToFahrenheit);

function convertToCelcius(event) {
  event.preventDefault();
  let temperatureElement = document.querySelector("#temperatures");
  let temperature = temperatureElement.innerHTML;
  temperature = Number(temperature);
  temperatureElement.innerHTML = Math.round((temperature - 32) * 0.55);
}

let celciusLink = document.querySelector("#celcius-link");
celciusLink.addEventListener("click", convertToCelcius);

//showing current location weather

function getCurrentPosition() {
  navigator.geolocation.getCurrentPosition(showPosition);
}

function showPosition(position) {
  let key = "1f4cebd395732f4932b34e3c80f1dbca";
  let lon = position.coords.longitude;
  let lat = position.coords.latitude;
  let url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${key}&units=metric`;
  axios.get(url).then(showCurrentTemperature);
}
function showCurrentTemperature(result) {
  let h2 = document.querySelector("h2");
  h2.innerHTML = `Hey there,Today ${result.data.name} will be sunny!`;
  let weather = document.querySelector("#temperatures");
  let temperature = Math.round(result.data.main.temp);
  weather.innerHTML = `${temperature}`;
}
let button = document.querySelector("#current-info");
button.addEventListener("click", getCurrentPosition);
