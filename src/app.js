function formatDate(timestamp) {
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
  return `${day} ${hours}:${minutes}`;
}

function displayTemperature(response) {
  debugger;
  let temperatureElement = document.querySelector("#temperature");
  let cityElement = document.querySelector("#city");
  let conditionElement = document.querySelector("#condition");
  let humidityElement = document.querySelector("#humidity");
  let windElement = document.querySelector("#wind");
  let dateElement = document.querySelector("#date");
  let iconElement = document.querySelector("#icon");

  celsiusTemperature = response.data.main.temp;
  temperatureElement.innerHTML = Math.round(celsiusTemperature);
  cityElement.innerHTML = response.data.name;
  conditionElement.innerHTML = response.data.weather[0].description;
  humidityElement.innerHTML = response.data.main.humidity;
  windElement.innerHTML = Math.round(response.data.wind.speed);
  dateElement.innerHTML = formatDate(response.data.dt * 1000);
  iconElement.setAttribute(
    "src",
    `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
  );
  iconElement.setAttribute("alt", response.data.weather[0].description);
  getForecast(response.data.coord);
  displayForecast();
}

function search(city) {
  let apiKey = "cd8488d54edad14895549ae906264c9b";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(displayTemperature);
}

function handleSubmit(event) {
  event.preventDefault();
  let cityInputElement = document.querySelector("#city-input");
  search(cityInputElement.value);
}

function displayFarenhite(event) {
  event.preventDefault();
  let farenhiteTemp = (celsiusTemperature * 9) / 5 + 32;
  let temperatureElement = document.querySelector("#temperature");
  temperatureElement.innerHTML = Math.round(farenhiteTemp);
  farenhitelink.classList.add("active");
  celciuslink.classList.remove("active");
}

function displayCelcius(event) {
  event.preventDefault();
  let temperatureElement = document.querySelector("#temperature");
  temperatureElement.innerHTML = Math.round(celsiusTemperature);
  celciuslink.classList.add("active");
  farenhitelink.classList.remove("active");
}

function displayForecast(response) {
  let forecastHtml = `<div class="row">`;
  let days = ["Thu", "Fri", "Sat"];
  days.forEach(function (day) {
    forecastHtml =
      forecastHtml +
      `<div class="col-2">
                  <div class="weather-forecast-date">${day}</div>

                  <img
                    class="forecast-img"
                    src="https://ssl.gstatic.com/onebox/weather/64/sunny_s_cloudy.png"
                    alt=""
                    width="36"
                  />
                  <div class="weather-forecast-temprature">
                    <span class="weather-forecast-temprature-max">18° </span>
                    <span class="weather-forecast-temprature-min">12°</span>
                  </div>
                </div>`;
  });

  forecastHtml = forecastHtml + `</div>`;
  forecastElemnt = document.querySelector("#forecast");
  forecastElemnt.innerHTML = forecastHtml;
}

function getForecast(coordinates) {
  let apiKey = "cd8488d54edad14895549ae906264c9b";
  let apiUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=${coordinates.lat}&lon=${coordinates.lon}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(displayForecast);
}

let form = document.querySelector("#search-form");
form.addEventListener("submit", handleSubmit);

let celsiusTemperature = null;

let farenhitelink = document.querySelector("#farenhite-link");
farenhitelink.addEventListener("click", displayFarenhite);

let celciuslink = document.querySelector("#celcius-link");
celciuslink.addEventListener("click", displayCelcius);

search("Tehran");
