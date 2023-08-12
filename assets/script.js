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
    $("#max-temp").text("Highest: "+data.main.temp_max+" °C");
    $("#min-temp").text("Lowest: "+data.main.temp_min+" °C");
    $("#wind").text(`Wind: ${Math.floor(data.wind.speed * 3.6)} Km/h`);
    $("#humidity").text("Humidity: "+data.main.humidity+" %");
    $("#city-name").html(data.name+`<span id="country-name"class="badge badge-primary">Light</span>`);
    $("#country-name").text(data.sys.country);
    $("#description").text(data.weather[0].description);
    $(".hide").removeClass("hide");
    // updateBackgroundImage(data);
};

// function updateBackgroundImage(data){
//     $(".bg-image").css({"background-image": "url(/assets/images/clear_sky.jpg)"}); 
// };

function searchCity() {
    let city = $("#city").val();
    getWeatherData(city);
};

$(":button").on("click", searchCity);


