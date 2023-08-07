$("#weather-status").on("click", function(){
    console.log("How you dare to click on me!");
});

async function getWeatherData(){
const response = await fetch("https://open-meteo.com/");
const data = await response.json();
console.log(data);
};

getWeatherData();