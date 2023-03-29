const searchInput = document.getElementById('searchInput');
const searchButton = document.getElementById('searchButton');
const place = document.getElementById('place')
const time = document.getElementById('time')
const temperature = document.getElementById('temperature')
const weatherCondition = document.getElementById('weatherCondition')
const temperatureFeelsLike = document.getElementById('temperatureFeelsLike')
const humidity = document.getElementById('humidity')
const windSpeed = document.getElementById('windSpeed')


function fetchNewLocation(location) {
  fetch(`https://api.weatherapi.com/v1/current.json?key=e3020c54ae8a424dbbc70909232803&q=${location}`)
    .then(function (response) {
      return response.json();
    })
    .then(function (response) {
      console.log(response);
      const processedData = processWeatherData(response);
      console.log(processedData);
      place.innerHTML = processedData.location
      time.innerHTML = processedData.lastUpdated
      temperature.innerHTML = processedData.temperature + " °C"
      weatherCondition.innerHTML = processedData.weatherCondition
      temperatureFeelsLike.innerHTML = `Feels like  ${processedData.feelsLike} °C`
      humidity.innerHTML = processedData.humidity + " %"
      windSpeed.innerHTML = processedData.windSpeed + " km/h"
    })
    .catch(function (error) {
      console.log(error);
    });
}

// fetchNewLocation("London");

function processWeatherData(data) {
  const location = data.location.name;
  const lastUpdated = data.current.last_updated;
  const temperature = data.current.temp_c;
  const weatherCondition = data.current.condition.text;

  const feelsLike = data.current.feelslike_c;
  const humidity = data.current.humidity;
  const windSpeed = data.current.wind_kph;


  const processedData = {
    location,
    lastUpdated,
    temperature,
    weatherCondition,
    feelsLike,
    humidity,
    windSpeed
  };

  return processedData
}

searchButton.addEventListener('click', function () {
  fetchNewLocation(searchInput.value);
  searchInput.value = ""
});

searchInput.addEventListener('keydown', function (event) {
  if (event.keyCode === 13) { // 13 = Enter key
    fetchNewLocation(searchInput.value);
    searchInput.value = ""
  }
});

fetchNewLocation("Eindhoven")