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
  let iconSVGname = icons[response.data.weather[0].icon];
  if (iconSVGname) {
    iconElement.setAttribute("src", `Icons/${iconSVGname}.svg`);
  } else {
    iconElement.setAttribute(
      "src",
      `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
    );
  }
  iconElement.setAttribute("alt", response.data.weather[0].description);
  getForecast(response.data.coord);
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

function formatDay(timestamp) {
  let date = new Date(timestamp * 1000);
  let day = date.getDay();
  let days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

  return days[day];
}

function displayForecast(response) {
  let forecast = response.data.daily;
  let forecastHtml = `<div class="row">`;
  forecast.forEach(function (forecastDay, index) {
    if (index < 6) {
      let srcPath = "";
      if (icons[forecastDay.weather[0].icon]) {
        srcPath = `Icons/${icons[forecastDay.weather[0].icon]}.svg`;
      } else {
        srcPath = `http://openweathermap.org/img/wn/${forecastDay.weather[0].icon}@2x.png`;
      }
      forecastHtml =
        forecastHtml +
        `<div class="col-2">
                  <div class="weather-forecast-date">${formatDay(
                    forecastDay.dt
                  )}</div>

                  <img
                    class="forecast-img"
                    src=` +
        srcPath +
        `
                    alt=""
                    width="50"
                  />
                  <div class="weather-forecast-temprature">
                    <span class="weather-forecast-temprature-max">${Math.round(
                      forecastDay.temp.max
                    )}° </span>
                    <span class="weather-forecast-temprature-min">${Math.round(
                      forecastDay.temp.min
                    )}°</span>
                  </div>
                </div>`;
    }
  });

  forecastHtml = forecastHtml + `</div>`;
  forecastElemnt = document.querySelector("#forecast");
  forecastElemnt.innerHTML = forecastHtml;
  debugger;
  setTimeZoneSettings(response.data.current.weather[0].icon);
}

function getForecast(coordinates) {
  let apiKey = "cd8488d54edad14895549ae906264c9b";
  let apiUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=${coordinates.lat}&lon=${coordinates.lon}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(displayForecast);
}
function setTimeZoneSettings(inputString) {
  let weatherAppElem = document.querySelector(".weatherApp");
  let dateElem = document.querySelector("#date");
  let condElem = document.querySelector("#condition");
  let cityElem = document.querySelector("#city");
  let degreeNumElem = document.querySelector(".degree-Number");
  let weatherCondElem = document.querySelector("#weather-Conditions");
  let weatherForecastDateElem = document.querySelectorAll(
    ".weather-forecast-date"
  );
  let weatherMinElem = document.querySelectorAll(
    ".weather-forecast-temprature-min"
  );
  let weatherMaxElem = document.querySelectorAll(
    ".weather-forecast-temprature-max"
  );
  if (inputString.includes("d")) {
    weatherAppElem.classList.add("day");
    weatherAppElem.classList.remove("night");
    dateElem.classList.add("day");
    dateElem.classList.remove("night");
    condElem.classList.add("day");
    condElem.classList.remove("night");
    cityElem.classList.add("day");
    cityElem.classList.remove("night");
    weatherCondElem.classList.add("day");
    weatherCondElem.classList.remove("night");
    degreeNumElem.classList.add("day");
    degreeNumElem.classList.remove("night");
    weatherMinElem.forEach(function (element) {
      element.classList.add("day");
      element.classList.remove("night");
    });
    weatherMaxElem.forEach(function (element) {
      element.classList.add("day");
      element.classList.remove("night");
    });
    weatherForecastDateElem.forEach(function (element) {
      element.classList.add("day");
      element.classList.remove("night");
    });
  } else {
    weatherAppElem.classList.add("night");
    weatherAppElem.classList.remove("day");
    dateElem.classList.add("night");
    dateElem.classList.remove("day");
    condElem.classList.add("night");
    condElem.classList.remove("day");
    cityElem.classList.add("night");
    cityElem.classList.remove("day");
    weatherCondElem.classList.add("night");
    weatherCondElem.classList.remove("day");
    degreeNumElem.classList.add("night");
    degreeNumElem.classList.remove("day");
    weatherMinElem.forEach(function (element) {
      element.classList.add("night");
      element.classList.remove("day");
    });
    weatherMaxElem.forEach(function (element) {
      element.classList.add("night");
      element.classList.remove("day");
    });
    weatherForecastDateElem.forEach(function (element) {
      element.classList.add("night");
      element.classList.remove("day");
    });
  }
}

let icons = {
  "01d": "clear-day",
  "01n": "clear-night",
  "02d": "partly-cloudy-day",
  "02n": "partly-cloudy-night",
  "03d": "cloudy",
  "03n": "cloudy",
  "04d": "overcast-day",
  "04n": "overcast-night",
  "09d": "partly-cloudy-day-rain",
  "09n": "partly-cloudy-night-rain",
  "10d": "partly-cloudy-day-drizzle",
  "10n": "partly-cloudy-night-drizzle",
  "11d": "thunderstorms-day",
  "11n": "thunderstorms-night",
  "13d": "partly-cloudy-day-snow",
  "13n": "partly-cloudy-night-snow",
  "50d": "mist",
  "50n": "mist",
};
console.log(icons);

let form = document.querySelector("#search-form");
form.addEventListener("submit", handleSubmit);

let celsiusTemperature = null;

let farenhitelink = document.querySelector("#farenhite-link");
farenhitelink.addEventListener("click", displayFarenhite);

let celciuslink = document.querySelector("#celcius-link");
celciuslink.addEventListener("click", displayCelcius);

search("Tehran");
