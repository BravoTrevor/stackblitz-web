const apiKey = '5409393c4acf68c00f91a1144746b8c3'; // Your API Key

document.getElementById('search-btn').addEventListener('click', () => {
    const city = document.getElementById('cityInput').value;  // Update this to match index.html
    if (city) {
        getWeatherData(city);
    } else {
        alert("Please enter a city name");
    }
});

function getWeatherData(city) {
    const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;

    fetch(apiUrl)
        .then(response => response.json())
        .then(data => {
            displayWeather(data);
        })
        .catch(error => {
            alert("City not found. Please try again.");
            console.error('Error fetching weather data:', error);
        });
}

function displayWeather(data) {
    const weatherResult = document.getElementById('weather-result');
    weatherResult.innerHTML = `
        <h2>${data.name}, ${data.sys.country}</h2>
        <p><strong>Temperature:</strong> ${data.main.temp} °C</p>
        <p><strong>Humidity:</strong> ${data.main.humidity}%</p>
        <p><strong>Wind Speed:</strong> ${data.wind.speed} m/s</p>
        <p><strong>Condition:</strong> ${data.weather[0].description}</p>
    `;

    weatherResult.classList.add('active');
}
