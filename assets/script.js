$("#weather-status").on("click", function(){
    console.log("How you dare to click on me!");
});
var key = 'f132a94011cbf4355115fe11f57a3462';
let city = "London";
exclude = "daily";
async function getWeatherData(){
const response = await fetch("https://api.openweathermap.org/data/2.5/weather?q=London,uk&appid="+key);
const data = await response.json();
console.log(data);
};

getWeatherData()