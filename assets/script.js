//Get API Keys for Maps and Weather
// read API data for WX and Map and display on each card based on location

// create getWeather() to pull weather data
//create displayWeather() to display weather on the card
//create function and call function with console log at the minimum
//ideally link function to the card

var apiKey = 'e22a952731360f3f21865b6d5114ce96';
var lon;
var lat;
var units;

function getWeather(lat, lon, cardNumber) {
    lat = lat;
    lon = lon;
    units = 'imperial';
    var temp;
    var wind;
    var wxIcon;
    var humidity;
    var time;

    var requestUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=${units}&appid=${apiKey}`;

    fetch(requestUrl)
        .then(function (response) {
          if(response.ok){
            response.json().then(function(data){
              //icon code, temp, wind, humidity
              temp = data.main.temp;
              wind = data.wind.speed;
              wxIcon = data.weather[0].icon;
              humidity = data.main.humidity;
              time = data.dt;
              displayWeather(wxIcon, temp, wind, humidity, time, cardNumber);
            });
          } else{
            alert('Error: '+ response.statusText);
          }

        })
        .catch(function(error){
          alert('Unable to connect to openweathermap API');
        })
}
getWeather(35.4667, -83.9203, 1);


// function displayWeatherIcon(){

// }

function displayWeather(functIcon, funcTemp, funcWind, funcHumidity, funcTime, cardNumber){
  var mark = dayjs.unix(funcTime).format('MMM D, YYYY'); 
  wxEl = document.querySelector(`#wx-${cardNumber}`);
    wxDateP = document.createElement('p');
    wxTempP = document.createElement('p');
    wxWindP = document.createElement('p');
    wxHumP = document.createElement('p');
    wxDateP.innerHTML = `${mark}`;
    wxTempP.innerHTML = `Temp: ${funcTemp} °F`;
    wxWindP.innerHTML = `Wind: ${funcWind} MPH`;
    wxHumP.innerHTML = `Humidity: ${funcHumidity} %`;
    //console.log(wxDateP);
    wxEl.appendChild(wxDateP);
    wxEl.appendChild(wxTempP);
    wxEl.appendChild(wxWindP);
    wxEl.appendChild(wxHumP);
};


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
