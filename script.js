document.getElementById("startButton").addEventListener("click", () => {
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
            populateWeatherTable(data);
        })
        .catch((error) => {
            console.error("Error fetching weather data:", error);
        });
}

function populateWeatherTable(data) {
    const currentTempElement = document.getElementById("currentTemperature");
    const currentTempValue = document.getElementById("currentTempValue");
    const tableBody = document.querySelector("#weatherTable tbody");

    // Show current temperature
    const currentTemp = data.hourly.temperature_2m[0];
    currentTempValue.textContent = currentTemp;
    currentTempElement.classList.remove("hidden");

    // Populate table with hourly data
    const times = data.hourly.time;
    const temperatures = data.hourly.temperature_2m;

    tableBody.innerHTML = ""; // Clear existing rows

    times.forEach((time, index) => {
        const row = document.createElement("tr");
        const timeCell = document.createElement("td");
        const tempCell = document.createElement("td");

        timeCell.textContent = new Date(time).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
        tempCell.textContent = temperatures[index];

        row.appendChild(timeCell);
        row.appendChild(tempCell);
        tableBody.appendChild(row);
    });
}
