const searchInput = document.getElementById('searchInput');
const searchButton = document.getElementById('searchButton');
const errorMessage = document.getElementById('error')
const place = document.getElementById('place')
const day = document.getElementById('day')
const time = document.getElementById('time')
const temperature = document.getElementById('temperature')
const weatherCondition = document.getElementById('weatherCondition')
const temperatureFeelsLike = document.getElementById('temperatureFeelsLike')
const humidity = document.getElementById('humidity')
const windSpeed = document.getElementById('windSpeed')
const lowerContainer = document.getElementById("lower-container");


/* Fetch all the info from the weather API and put it in the inner html of the divs */
function fetchNewLocation(location) {
  fetch(`https://api.weatherapi.com/v1/forecast.json?key=e3020c54ae8a424dbbc70909232803&q=${location}&days=7`)
    .then(function (response) {
      return response.json();
    })
    .then(function (response) {
      console.log(response);
      const processedData = processWeatherData(response);
      console.log(processedData);

      /* Today */
      place.innerHTML = processedData.location
      day.innerHTML = getDayOfWeek(processedData.lastUpdated)
      time.innerHTML = processedData.lastUpdated
      temperature.innerHTML = processedData.temperature + " °C"
      weatherCondition.innerHTML = processedData.weatherCondition
      temperatureFeelsLike.innerHTML = `${processedData.feelsLike} °C`
      humidity.innerHTML = processedData.humidity + " %"
      windSpeed.innerHTML = processedData.windSpeed + " km/h"

      /* Forecast */

      /* Creates a loop that gives inner html to the three divs (day, max-temp, min-temp) based on the processedData from the API*/
      const dayElements = document.querySelectorAll('[class^="forecast-day-"]');
      const maxTempElements = document.querySelectorAll('[class^="forecast-temperature-max-"]');
      const minTempElements = document.querySelectorAll('[class^="forecast-temperature-min-"]');

      for (let i = 0; i < 2; i++) {
        dayElements[i].innerHTML = getDayOfWeek(processedData[`day${i + 1}`][0]);
        maxTempElements[i].innerHTML = `${processedData[`day${i + 1}`][1]} °C`;
        minTempElements[i].innerHTML = `${processedData[`day${i + 1}`][2]} °C`;
      }
      errorMessage.innerHTML = ""
    })
    .catch(function (error) {
      errorMessage.innerHTML = "Location not found."
      console.log(error);
    });
}

/* Puts all the data needed from the API in an object called processedData  */
function processWeatherData(data) {
  /* Now */
  const location = data.location.name;
  const lastUpdated = data.current.last_updated;
  const temperature = data.current.temp_c;
  const weatherCondition = data.current.condition.text;
  const feelsLike = data.current.feelslike_c;
  const humidity = data.current.humidity;
  const windSpeed = data.current.wind_kph;

  /* Forecast */
  const day1 = [data.forecast.forecastday[1].date, data.forecast.forecastday[1].day.maxtemp_c, data.forecast.forecastday[1].day.mintemp_c];
  const day2 = [data.forecast.forecastday[2].date, data.forecast.forecastday[2].day.maxtemp_c, data.forecast.forecastday[2].day.mintemp_c];
  // const day3 = [data.forecast.forecastday[3].date, data.forecast.forecastday[3].day.maxtemp_c, data.forecast.forecastday[3].day.mintemp_c];
  // const day4 = [data.forecast.forecastday[4].date, data.forecast.forecastday[4].day.maxtemp_c, data.forecast.forecastday[4].day.mintemp_c];
  // const day5 = [data.forecast.forecastday[5].date, data.forecast.forecastday[5].day.maxtemp_c, data.forecast.forecastday[5].day.mintemp_c];
  // const day6 = [data.forecast.forecastday[6].date, data.forecast.forecastday[6].day.maxtemp_c, data.forecast.forecastday[6].day.mintemp_c];

  const processedData = {
    /* Now */
    location,
    lastUpdated,
    temperature,
    weatherCondition,
    feelsLike,
    humidity,
    windSpeed,

    /* Forecast */
    day1,
    day2,
    // day3,
    // day4,
    // day5,
    // day6,
  };

  return processedData
}

/* Makes search icon work */
searchButton.addEventListener('click', function () {
  fetchNewLocation(searchInput.value);
  searchInput.value = ""
});

/* If you click enter after typing something, it will fetch the data */
searchInput.addEventListener('keydown', function (event) {
  if (event.keyCode === 13) { // 13 = Enter key
    fetchNewLocation(searchInput.value);
    searchInput.value = ""
  }
});

function getDayOfWeek(lastUpdatedString) {
  const lastUpdatedDate = new Date(lastUpdatedString);
  const dayOfWeek = lastUpdatedDate.toLocaleDateString("en-US", { weekday: "long" });
  return dayOfWeek;
}

function createForecastDivs() {
  const lowerContainer = document.getElementById('lower-container');

  for (let i = 1; i <= 6; i++) {
    const container = document.createElement('div');
    container.classList.add('forecast-container');

    const day = document.createElement('div');
    day.classList.add(`forecast-day-${i}`);
    container.appendChild(day);

    const maxTemp = document.createElement('div');
    maxTemp.classList.add(`forecast-temperature-max-${i}`);
    container.appendChild(maxTemp);

    const minTemp = document.createElement('div');
    minTemp.classList.add(`forecast-temperature-min-${i}`);
    container.appendChild(minTemp);

    lowerContainer.appendChild(container);
  }
}

createForecastDivs()

fetchNewLocation("Eindhoven")