//Get API Keys for Maps and Weather
// read API data for WX and Map and display on each card based on location

// create getWeather() to pull weather data
//create displayWeather() to display weather on the card
//create function and call function with console log at the minimum
//ideally link function to the card

var apiKey = 'e22a952731360f3f21865b6d5114ce96';
var lon;
var lat;
var wxArray = [];

function addWxObjectToArray(iconCode, temp, wind, humidity){
   
    locationWx={
        iconCode: iconCode,
        temp: temp,
        wind: wind,
        humiditiy: humidity
    }
    console.log(locationWx);
    wxArray.push(locationWx);
    console.log(wxArray);
}
//addWxObjectToArray("o4h", "245", "020@10", "70%");

function getWeather(lon, lat) {
    lon = lon;
    lat = lat;

    var requestUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}`;

    fetch(requestUrl)
        .then(function (response) {
            return response.json();
        })
        .then(function (data){
            console.log(data);
            //icon code, temp, wind, humidity
            console.log(data.main.temp);
            temp = data.main.temp
            console.log(data.wind.speed);
            wind = data.wind.speed
            console.log(data.weather[0].icon);
            wxIcon = data.weather[0].icon
            console.log(data.main.humidity);
            humidity = data.main.humidity
            addWxObjectToArray(wxIcon, temp, wind, humidity);
        })
}

getWeather(35.4667, -83.9203);




//create getThisMap() to pull map data
//create displayMap() to display map data
//create function and call function with console log at the minimum
//ideally link function to the card

