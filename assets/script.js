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

//map indicator
let map1, map2, map3, map4, map5;

// function that uses google maps api and displays the map.
function initMap() {
    // Key West
    map1 = new google.maps.Map(document.getElementById("map1"), {
    center: { lat: 25.196361728587775, lng: -80.41343973263618 },
    zoom: 8,
  });
  new google.maps.Marker({
    position: { lat: 25.196361728587775, lng: -80.41343973263618 },
    map: map1,
    label:"A",
    title: "Tail of the Dragon",
  })
    //LightHouse Trail
    map2 = new google.maps.Map(document.getElementById("map2"), {
    center: { lat: 34.94753084095934, lng: -101.6887235458197 },
    zoom: 8,
  }); 
  new google.maps.Marker({
    position: { lat: 34.94753084095934, lng: -101.6887235458197 },
    map: map2,
    label:"A",
    title: "Blood Mountain",
  })
    //Gulfport Seenic Byway
  map3 = new google.maps.Map(document.getElementById("map3"), {
    center: { lat: 30.38956102702961, lng: -89.00039092773201 },
    zoom: 8,
  }); 
  new google.maps.Marker({
    position: { lat: 30.38956102702961, lng: -89.00039092773201 },
    map: map3,
    label:"A",
    title: "Blood Mountain",
  })
  // Talladega Scenic Drive
  map4 = new google.maps.Map(document.getElementById("map4"), {
    center: { lat: 33.526130306735205, lng: -85.74859794538455 },
    zoom: 8,
  }); 
  new google.maps.Marker({
    position: { lat: 33.526130306735205, lng: -85.74859794538455 },
    map: map4,
    label:"A",
    title: "Blood Mountain",
  })
  // The Great River Road
  map5 = new google.maps.Map(document.getElementById("map5"), {
    center: { lat: 30.207392650804636, lng: -90.94551441746164 },
    zoom: 8,
  }); 
  new google.maps.Marker({
    position: { lat: 30.207392650804636, lng: -90.94551441746164 },
    map: map5,
    label:"A",
    title: "Blood Mountain",
  })
}
