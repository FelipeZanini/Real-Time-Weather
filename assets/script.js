const key = 'f132a94011cbf4355115fe11f57a3462';
async function getCurrentWeatherData(city) {
    try {
        const response = await fetch("https://api.openweathermap.org/data/2.5/weather?q=" + city + ", US,uk&units=metric&appid=" + key);
        const data = await response.json();
        currentWeather(city, data);
    } catch (error) {
        alert("This is not a valid city name!");
    };
};

async function getForecastWeatherData(city) {
    $("#forecast-button").addClass("hide");
    try {
        const responseGeo = await fetch("http://api.openweathermap.org/geo/1.0/direct?q=" + city + "&limit=1&appid=" + key);
        const dataGeo = await responseGeo.json();
        const lat = dataGeo[0].lat;
        const lon = dataGeo[0].lon;

        const responseForecast = await fetch("https://api.openweathermap.org/data/2.5/onecall?lat=" + lat +"&lon=" + lon + "&appid=" + key);
        const dataForecast = await responseForecast.json();
        ForecastWeather(city, dataForecast);

    } catch (error) {
        alert("We could get the city forecast, sorry!");
    };
};

function searchForecastWeather(){
    getForecastWeatherData($("#city").val());
    $("#current-weather-box").addClass("hide");
    $("#forecast-weather-box").removeClass("hide");
};

function searchCity() {
    $("#forecast-weather-box").addClass("hide");
    let city = $("#city").val();
    getCurrentWeatherData(city);
    setTimeout(() => $("#current-weather-box").removeClass("hide") , 400);
    $("#forecast-button").removeClass("hide");
};
$("#search-button").on("click", searchCity);
$("#forecast-button").on("click", searchForecastWeather);


function currentWeather(city, data) {
    var iconcode = data.weather[0].icon;
    var iconurl = "http://openweathermap.org/img/w/" + iconcode + ".png";
    $('#wicon').attr('src', iconurl);
    $("#temperature").text(data.main.temp + " °C");
    $("#max-temp").text("Highest: " + data.main.temp_max + " °C");
    $("#min-temp").text("Lowest: " + data.main.temp_min + " °C");
    $("#wind").text(`Wind: ${Math.floor(data.wind.speed * 3.6)} Km/h`);
    $("#humidity").text("Humidity: " + data.main.humidity + " %");
    $("#city-name").html(data.name + `<span  style="background-color:blue"id="country-name" class="badge badge-info">Light</span>`);
    $("#country-name").text(data.sys.country);
    $("#description").text(data.weather[0].description);
};

function ForecastWeather(city, dataForecast) {
let cityForecast = $("#forecast-city");
let weatherIcon = $('.weather-icon');
let day = $('.day');
let highestTemperature = $(".highest-temp");
let lowestTemperature = $(".lowest-temp");

cityForecast.text(city.charAt(0).toUpperCase() + city.slice(1));

for(let i = 0; i < 8; i++){
    $(weatherIcon[i]).attr('src', "http://openweathermap.org/img/w/" + dataForecast.daily[i].weather[0].icon + ".png");
    $(highestTemperature[i]).html("<i class='fas fa-thermometer-full'></i>  "+ Math.round(dataForecast.daily[i].temp.max -273.15) + " °C");
    $(lowestTemperature[i]).html("<i class='fas fa-thermometer-quarter'></i>  " + Math.round(dataForecast.daily[i].temp.min -273.15) + " °C");
    
    var myDate = new Date( dataForecast.daily[i].dt*1000);
    let days = myDate.toString();
    $(day[i]).text(days.slice(0,3));
};

};