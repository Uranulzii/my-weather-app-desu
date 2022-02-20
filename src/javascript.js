//To submit before deadline, I had to only work on the minimum requirements. It will be improved.  specially need to work on current location time update

function showDate(timestamp) {
  let date = new Date(timestamp);
  let hours = date.getHours();
  if (hours < 10) {
    hours = `0${hours}`;
  }
  let minutes = date.getMinutes();
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

  let day = days[date.getDay()];

  return ` ${day} ${hours}:${minutes}`;
}

//search and submit,then result of it will show up
function inputCity(event) {
  event.preventDefault();
  let cityInput = document.querySelector("#city-input");
  let h2 = document.querySelector("h2");
  h2.innerHTML = `Hey there,Today ${cityInput.value} will be`;
  function showTemperature(response) {
    let weather = document.querySelector("#temperature");
    let temperature = Math.round(response.data.main.temp);
    let descriptionElement = document.querySelector("#condition");
    let humidityElement = document.querySelector("#humidity");
    let windElement = document.querySelector("#wind");
    let iconElement = document.querySelector("#icon");
    let datesElement = document.querySelector("#dates");
    let feelsLikeElement = document.querySelector("#feelsLike");

    feelsLikeElement.innerHTML = Math.round(response.data.main.feels_like);
    celsiusTemperature = response.data.main.temp;
    weather.innerHTML = `${temperature}`;
    descriptionElement.innerHTML = response.data.weather[0].description;
    humidityElement.innerHTML = response.data.main.humidity;
    datesElement.innerHTML = showDate(response.data.dt * 1000);
    windElement.innerHTML = Math.round(response.data.wind.speed);
    iconElement.setAttribute(
      "src",
      `  http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
    );
    iconElement.setAttribute("alt", response.data.weather[0].description);
    console.log(response);
  }
  let apiKey = "1f4cebd395732f4932b34e3c80f1dbca";
  let city = document.querySelector("#city-input");
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city.value}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(showTemperature);
}

let cityForm = document.querySelector("#search-form");
cityForm.addEventListener("submit", inputCity);

//converting temperature
function convertToFahrenheit(event) {
  event.preventDefault();
  celsiusLink.classList.remove("active");
  fahrenheitLink.classList.add("active");
  let temperatureElement = document.querySelector("#temperature");
  temperatureElement.innerHTML = Math.round((celsiusTemperature * 9) / 5 + 32);
}
let fahrenheitLink = document.querySelector("#fahrenheit-link");
fahrenheitLink.addEventListener("click", convertToFahrenheit);

function convertToCelsius(event) {
  event.preventDefault();
  celsiusLink.classList.add("active");
  fahrenheitLink.classList.remove("active");
  let temperatureElement = document.querySelector("#temperature");
  temperatureElement.innerHTML = Math.round(celsiusTemperature);
}

let celsiusLink = document.querySelector("#celsius-link");
celsiusLink.addEventListener("click", convertToCelsius);

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
  h2.innerHTML = `Hey there,Today ${result.data.name} will be ${result.data.weather[0].description}`;
  let weather = document.querySelector("#temperature");
  let temperature = Math.round(result.data.main.temp);
  weather.innerHTML = `${temperature}`;
}
let button = document.querySelector("#current-info");
button.addEventListener("click", getCurrentPosition);
