const key = 'f132a94011cbf4355115fe11f57a3462';

async function getWeatherData(city) {
    try{
        const response = await fetch("https://api.openweathermap.org/data/2.5/weather?q=" + city + ", US,uk&units=metric&appid=" + key);
        const data = await response.json();
        console.log(data);
        updateDOM(city, data);  
    } catch (error) {
        alert("This is not a valid city name!");
    };

    
};

function updateDOM(city, data) {
    var iconcode = data.weather[0].icon;
    var iconurl = "http://openweathermap.org/img/w/" + iconcode + ".png";
    $('#wicon').attr('src', iconurl);
    $("#temperature").text(data.main.temp + " °C");
    $("#max-temp").text("Highest Temperature: "+data.main.temp_max+" °C");
    $("#min-temp").text("Lowest Temperature: "+data.main.temp_min+" °C");
    $("#wind").text(`Wind: ${Math.floor(data.wind.speed * 3.6)} Km/h`);
    $("#humidity").text("Humidity: "+data.main.humidity+" %");
    $("#city-name").text(data.name);
    $(".hide").removeClass("hide");
};

function searchCity() {
    let city = $("#city").val();
    getWeatherData(city);
};

$(":button").on("click", searchCity);


