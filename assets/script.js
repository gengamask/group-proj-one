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
    var temp1;
    var wind1;
    var wxIcon1;
    var humidity1;
    var when1;

    var temp2;
    var wind2;
    var wxIcon2;
    var humidity2;
    var when2;

    var temp3;
    var wind3;
    var wxIcon3;
    var humidity3;
    var when3;

    var requestUrl = `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&units=${units}&appid=${apiKey}`;

    fetch(requestUrl)
        .then(function (response) {
          if(response.ok){
            response.json().then(function(data){
              //get new day data at 0(tomorrow), 8 (day+1), 16 (day+2),
              //temp, wind, wxIcon, humidity, dtg
              temp1 = data.list[0].main.temp;
              wind1 = data.list[0].wind.speed;
              wxIcon1 = data.list[0].weather[0].icon;
              humidity1 = data.list[0].main.humidity;
              when1 = data.list[0].dt_txt;

              temp2 = data.list[8].main.temp;
              wind2 = data.list[8].wind.speed;
              wxIcon2 = data.list[8].weather[0].icon;
              humidity2 = data.list[8].main.humidity;
              when2 = data.list[8].dt_txt;
              
              temp3 = data.list[16].main.temp;
              wind3 = data.list[16].wind.speed;
              wxIcon3 = data.list[16].weather[0].icon;
              humidity3 = data.list[16].main.humidity;
              when3 = data.list[16].dt_txt;
              displayWeather(wxIcon1, temp1, wind1, humidity1, when1, wxIcon2, temp2, wind2, humidity2, when2, wxIcon3, temp3, wind3, humidity3, when3, cardNumber);
            });
          } else{
            alert('Error: '+ response.statusText);
          }

        })
        .catch(function(error){
          alert('Unable to connect to openweathermap API');
        })
}
getWeather(25.1963, -80.4134, 1);
getWeather(34.9475, -101.68, 2);
getWeather(30.3895, -89.0003, 3);
getWeather(33.5261, -85.7485, 4);
getWeather(30.2073, -90.9455, 5);


function displayWeatherIcon(appendEl, iconCode){
  var imgEl = document.createElement("img");
  imgEl.src = `http://openweathermap.org/img/wn/${iconCode}.png`
  appendEl.appendChild(imgEl);
}

function displayDayWeather(functIcon, funcTemp, funcWind, funcHumidity, funcWhen){
  var mark = funcWhen;
  wxDateP = document.createElement('p');
  wxIconP = document.createElement('p');
  wxTempP = document.createElement('p');
  wxWindP = document.createElement('p');
  wxHumP = document.createElement('p');
  wxDateP.innerHTML = `${dayjs(mark).format('ddd, D MMM')}`;
  displayWeatherIcon(wxIconP, functIcon);
  wxTempP.innerHTML = `Temp: ${funcTemp} °F`;
  wxWindP.innerHTML = `Wind: ${funcWind} MPH`;
  wxHumP.innerHTML = `Humidity: ${funcHumidity} %`;


}

function displayWeather(functIcon1, funcTemp1, funcWind1, funcHumidity1, funcWhen1, functIcon2, funcTemp2, funcWind2, funcHumidity2, funcWhen2, functIcon3, funcTemp3, funcWind3, funcHumidity3, funcWhen3, cardNumber){
  wxEla = document.querySelector(`#wx-${cardNumber}a`);
  wxElb = document.querySelector(`#wx-${cardNumber}b`);
  wxElc = document.querySelector(`#wx-${cardNumber}c`);
  console.log(wxEla);
  wxDay1Div = document.createElement('div');
  wxDay2Div = document.createElement('div');
  wxDay3Div = document.createElement('div');
  wxDay1Div.classList.add('card-body');
  wxDay2Div.classList.add('card-body');
  wxDay3Div.classList.add('card-body');
  wxEla.appendChild(wxDay1Div);
  displayDayWeather(functIcon1, funcTemp1, funcWind1, funcHumidity1, funcWhen1);
  wxDay1Div.appendChild(wxDateP);
  wxDay1Div.appendChild(wxIconP);
  wxDay1Div.appendChild(wxTempP);
  wxDay1Div.appendChild(wxWindP);
  wxDay1Div.appendChild(wxHumP);
  wxElb.appendChild(wxDay2Div);
  displayDayWeather(functIcon2, funcTemp2, funcWind2, funcHumidity2, funcWhen2);
  wxDay2Div.appendChild(wxDateP);
  wxDay2Div.appendChild(wxIconP);
  wxDay2Div.appendChild(wxTempP);
  wxDay2Div.appendChild(wxWindP);
  wxDay2Div.appendChild(wxHumP);
  wxElc.appendChild(wxDay3Div);
  displayDayWeather(functIcon3, funcTemp3, funcWind3, funcHumidity3, funcWhen3);
  wxDay3Div.appendChild(wxDateP);
  wxDay3Div.appendChild(wxIconP);
  wxDay3Div.appendChild(wxTempP);
  wxDay3Div.appendChild(wxWindP);
  wxDay3Div.appendChild(wxHumP);

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