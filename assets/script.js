const key = 'f132a94011cbf4355115fe11f57a3462';

async function getWeatherData(city) {
    const response = await fetch("https://api.openweathermap.org/data/2.5/weather?q=" + city + ", US,uk&units=metric&appid=" + key);
    const data = await response.json();
    console.log(data);
    updateDOM(city, data);
};

function updateDOM(city, data) {
    $("#temperature").text(data.main.temp + " °C");
    $("#wind").text(Math.floor(data.wind.speed * 3.6) + " Km/h");
    $("#city-name").text(city);
};

function searchCity() {
    let city = $("#city").val();
    getWeatherData(city);
};

$(":button").on("click", searchCity);


