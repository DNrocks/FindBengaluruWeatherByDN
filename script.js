document.getElementById("start-button").addEventListener("click", () => {
    document.getElementById("start-screen").classList.add("hidden");
    document.getElementById("weather-screen").classList.remove("hidden");
    fetchWeatherData();
});

function fetchWeatherData() {
    const url = "https://api.open-meteo.com/v1/forecast";
    const params = new URLSearchParams({
        latitude: 12.9719,
        longitude: 77.5937,
        current: "temperature_2m",
        hourly: "temperature_2m",
        timezone: "auto",
        forecast_days: 1,
    });

    fetch(`${url}?${params}`)
        .then((response) => response.json())
        .then((data) => {
            displayWeather(data);
        })
        .catch((error) => {
            console.error("Error fetching weather data:", error);
        });
}

function displayWeather(data) {
    // Display current temperature
    const currentTempElement = document.getElementById("current-temp");
    currentTempElement.textContent = `${data.hourly.temperature_2m[0]} °C`;

    // Display hourly temperatures
    const hourlyContainer = document.getElementById("hourly-container");
    const times = data.hourly.time;
    const temperatures = data.hourly.temperature_2m;

    hourlyContainer.innerHTML = ""; // Clear existing data

    for (let i = 0; i < times.length; i++) {
        const box = document.createElement("div");
        box.className = "hourly-box";
        const time = new Date(times[i]).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
        box.innerHTML = `<p>${time}</p><p>${temperatures[i]} °C</p>`;
        hourlyContainer.appendChild(box);
    }
}
