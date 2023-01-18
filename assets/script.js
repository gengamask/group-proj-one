
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
var searchButton = document.querySelector('#searchActivate');
var searchInput = document.querySelector('#theSearch');
var homeButton = document.querySelector('#homeButton');

searchButton.addEventListener('click', function(event){
  event.preventDefault();
  if(getStates()){
    saveToLocalStorage(searchInput.value)
  };
  
  event.preventDefault();
  //window.location.reload();
})

homeButton.addEventListener("click", function(event){
  window.location.reload();
})

function saveToLocalStorage(searchValue){
  var number = JSON.parse(localStorage.getItem("searchNumber"));
  if(number !== undefined && number !== null){
    number++;
    localStorage.setItem("searchNumber", JSON.stringify(number));
    localStorage.setItem(`search${number}`, JSON.stringify(searchValue));
  } else{
    number = 1;
    localStorage.setItem("searchNumber", JSON.stringify(number));
    localStorage.setItem(`search${number}`, JSON.stringify(searchValue));
  }
}

function retrieveLocalStorage(){
  var number = JSON.parse(localStorage.getItem("searchNumber"));
  dropDownEl = document.querySelector('#dropDown');
  if(number !== undefined && number !== null){
    for(var i = 1; i<=number; i++){
      liEl = document.createElement('li');
      liEl.classList.add('nav-item');
      var aEl = document.createElement('a');
      aEl.classList.add('nav-link', 'fs-4', 'title');
      aEl.innerHTML = JSON.parse(localStorage.getItem(`search${i}`));
      dropDownEl.appendChild(liEl);
      liEl.appendChild(aEl);
    }
  }
}

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
              //console.log(data);
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

function init(){
  getWeather(25.1963, -80.4134, 1);
  getWeather(34.9475, -101.68, 2);
  getWeather(30.3895, -89.0003, 3);
  getWeather(33.5261, -85.7485, 4);
  getWeather(30.2073, -90.9455, 5);
  retrieveLocalStorage();
}


getWeather(26.670876,-69.993684, 6);
getWeather(37.644402,-65.516008, 7);
getWeather(33.843970,-110.968545, 8);
getWeather(33.914237,-115.298147, 9);
getWeather(37.669940,-111.577033, 10);
getWeather(35.04628,-114.62789,11);
getWeather(36.224178, -121.758074,12);
getWeather(39.096848,-120.032349,13);
getWeather(44.187126,-124.114609,14);
getWeather(47.9331,-123.467998128,15);


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
let map1, map2, map3, map4, map5, map6, map7, map8, map9, map10, map11, map12,map13,map14,map15 ;

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
    title: "US-a, Key West",
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
    title: "Lighthouse Trail Palo Duro",
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
    title: "Gulfport Scenic Byway",
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
    title: "Talladega Scenic Drive",
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
    title: "Great River Road",
  });
  // Atlanta road
  map6 = new google.maps.Map(document.getElementById("map6"), {
    center: { lat:33.74332510984891, lng:-84.39234089879041},
    zoom: 8,
  });
  new google.maps.Marker({
    position: {lat:33.74332510984891, lng :-84.39234089879041},
    map: map6,
    label:"A",
    title: "Atlanta road",
})
    //Open Road
    map7 = new google.maps.Map(document.getElementById("map7"), {
    center: { lat:35.6391755685948, lng:-112.12485375214233},
    zoom: 8,
  }); 
  new google.maps.Marker({
    position: { lat:35.6391755685948, lng:-112.12485375214233},
    map: map7,
    label:"A",
    title: "Open Road",
  })
    //Red rock red-rock-gateway-to-sedona
  map8 = new google.maps.Map(document.getElementById("map8"), {
    center: { lat:34.89549875477629, lng:-111.75201785045047},
    zoom: 8,
  }); 
  new google.maps.Marker({
    position: { lat:34.89549875477629, lng:-111.75201785045047},
    map: map8,
    label:"A",
    title: "Red rock red-rock-gateway-to-sedona",
  })
  // Tall pine
  map9 = new google.maps.Map(document.getElementById("map9"), {
    center: { lat:33.84630481562373, lng:-110.96881297598705},
    zoom: 8,
  }); 
  new google.maps.Marker({
    position: { lat:33.84630481562373, lng:-110.96881297598705},
    map: map9,
    label:"A",
    title: "Tall Pines Scenic Road",
  })

  // Utah - hwy 12
  map10 = new google.maps.Map(document.getElementById("map10"), {
    center: { lat:37.760801254849426, lng:-111.69645660284512},
    zoom: 8,
  }); 
  new google.maps.Marker({
    position: { lat:37.760801254849426, lng:-111.69645660284512},
    map: map10,
    label:"A",
    title: "Utah HWY 12",
  })
  map11 = new google.maps.Map(document.getElementById("map11"), {
    center: { lat: 35.04628, lng: -114.62789 },
    zoom: 8,
  });
  new google.maps.Marker({
    position: { lat: 35.04628, lng: -114.62789 },
    map: map11,
    label:"A",
    title: "Drive through the Mojave",
})

  //  CA-1 To Big Sur 12
  map12 = new google.maps.Map(document.getElementById("map12"), {
    center: { lat: 36.224178, lng: -121.758074 },
    zoom: 8,
  });
  new google.maps.Marker({
    position: { lat: 36.224178, lng: -121.758074 },
    map: map12,
    label:"A",
    title: "CA-1 To Big Sur",
  })
  // lake Taho Drive 13
  map13 = new google.maps.Map(document.getElementById("map13"), {
    center: { lat: 39.096848, lng: -120.032349 },
    zoom: 8,
  });
  new google.maps.Marker({
    position: { lat: 39.096848, lng: -120.032349 },
    map: map13,
    label:"A",
    title: "Drive through the Mojave",
   })
  //  Oregon coast Highway 14
   map14 = new google.maps.Map(document.getElementById("map14"), {
    center: { lat: 44.187126, lng: -124.114609 },
    zoom: 8,
  });
  new google.maps.Marker({
    position: { lat: 44.187126, lng: -124.114609 },
    map: map14,
    label:"A",
    title: "Oregon coast Highway",
   })
  //  Hurricane Ridge 15
   map15 = new google.maps.Map(document.getElementById("map15"), {
    center: { lat: 47.9331, lng: -123.4679 },
    zoom: 8,
  });
  new google.maps.Marker({
    position: { lat: 47.9331, lng: -123.4679 },
    map: map15,
    label:"A",
    title: "Hurricane Ridge",
   })
  }
// lists of states
const states = ['FL', 'TX', 'MS', 'AL', 'LA', 
                'GA', 'AZ', 'NV', 'UT','CA', 'OR', 'WA'
];

// value for the entier card contaienr
let flEl = document.querySelector("#fl");
let txEl = document.querySelector("#tx");
let msEl = document.querySelector("#ms");
let alEl = document.querySelector("#al");
let laEl = document.querySelector("#la");
let gaEl = document.querySelector("#ga");
let azEl = document.querySelector("#az");
let az2El = document.querySelector("#az2");
let nvEl = document.querySelector("#nv");
let utEl = document.querySelector("#ut");
let caEl = document.querySelector("#ca");
let ca2El = document.querySelector("#ca2");
let ca3El = document.querySelector("#ca3");
let orEl = document.querySelector("#or");
let waEl = document.querySelector("#wa");

// function that display only the card for the specific state.
function getStates(){
  a = searchInput.value;
  if(a === states[0]){
    flEl.style.display = 'flex';
    txEl.style.display = 'none';
    msEl.style.display = 'none';
    alEl.style.display = 'none';
    laEl.style.display = 'none';
    gaEl.style.display = 'none';
    azEl.style.display = 'none';
    nvEl.style.display = 'none';
    utEl.style.display = 'none';
    az2El.style.display = 'none';
    caEl.style.display = 'none';
    ca2El.style.display = 'none';
    ca3El.style.display = 'none';
    orEl.style.display = 'none';
    waEl.style.display = 'none';
    return true;
  }else if(a === states[1]){
    txEl.style.display = 'flex';
    flEl.style.display = 'none';
    msEl.style.display = 'none';
    alEl.style.display = 'none';
    laEl.style.display = 'none';
    gaEl.style.display = 'none';
    azEl.style.display = 'none';
    nvEl.style.display = 'none';
    utEl.style.display = 'none';
    az2El.style.display = 'none';
    caEl.style.display = 'none';
    ca2El.style.display = 'none';
    ca3El.style.display = 'none';
    orEl.style.display = 'none';
    waEl.style.display = 'none';
    return true;
  }
  else if(a === states[2]){
    msEl.style.display = 'flex';
    flEl.style.display = 'none';
    txEl.style.display = 'none';
    alEl.style.display = 'none';
    laEl.style.display = 'none';
    gaEl.style.display = 'none';
    azEl.style.display = 'none';
    nvEl.style.display = 'none';
    utEl.style.display = 'none';
    az2El.style.display = 'none';
    caEl.style.display = 'none';
    ca2El.style.display = 'none';
    ca3El.style.display = 'none';
    orEl.style.display = 'none';
    waEl.style.display = 'none';
    return true;
  }
  else if(a === states[3]){
    alEl.style.display = 'flex';
    flEl.style.display = 'none';
    msEl.style.display = 'none';
    txEl.style.display = 'none';
    laEl.style.display = 'none';
    gaEl.style.display = 'none';
    azEl.style.display = 'none';
    nvEl.style.display = 'none';
    utEl.style.display = 'none';
    az2El.style.display = 'none';
    caEl.style.display = 'none';
    ca2El.style.display = 'none';
    ca3El.style.display = 'none';
    orEl.style.display = 'none';
    waEl.style.display = 'none';
    return true;
  }
  else if(a === states[4]){
    laEl.style.display = 'flex';
    flEl.style.display = 'none';
    msEl.style.display = 'none';
    alEl.style.display = 'none';
    txEl.style.display = 'none';
    gaEl.style.display = 'none';
    azEl.style.display = 'none';
    nvEl.style.display = 'none';
    utEl.style.display = 'none';
    az2El.style.display = 'none';
    caEl.style.display = 'none';
    ca2El.style.display = 'none';
    ca3El.style.display = 'none';
    orEl.style.display = 'none';
    waEl.style.display = 'none';
    return true;
  }  else if(a === states[5]){
    laEl.style.display = 'none';
    flEl.style.display = 'none';
    msEl.style.display = 'none';
    alEl.style.display = 'none';
    txEl.style.display = 'none';
    gaEl.style.display = 'flex';
    azEl.style.display = 'none';
    nvEl.style.display = 'none';
    utEl.style.display = 'none';
    az2El.style.display = 'none';
    caEl.style.display = 'none';
    ca2El.style.display = 'none';
    ca3El.style.display = 'none';
    orEl.style.display = 'none';
    waEl.style.display = 'none';
    return true;
  }  else if(a === states[6]){
    laEl.style.display = 'none';
    flEl.style.display = 'none';
    msEl.style.display = 'none';
    alEl.style.display = 'none';
    txEl.style.display = 'none';
    gaEl.style.display = 'none';
    azEl.style.display = 'flex';
    nvEl.style.display = 'none';
    utEl.style.display = 'none';
    az2El.style.display = 'flex';
    caEl.style.display = 'none';
    ca2El.style.display = 'none';
    ca3El.style.display = 'none';
    orEl.style.display = 'none';
    waEl.style.display = 'none';
    return true;
  }  else if(a === states[7]){
    laEl.style.display = 'none';
    flEl.style.display = 'none';
    msEl.style.display = 'none';
    alEl.style.display = 'none';
    txEl.style.display = 'none';
    gaEl.style.display = 'none';
    azEl.style.display = 'none';
    nvEl.style.display = 'flex';
    utEl.style.display = 'none';
    az2El.style.display = 'none';
    caEl.style.display = 'none';
    ca2El.style.display = 'none';
    ca3El.style.display = 'none';
    orEl.style.display = 'none';
    waEl.style.display = 'none';
    return true;
  }  else if(a === states[8]){
    laEl.style.display = 'none';
    flEl.style.display = 'none';
    msEl.style.display = 'none';
    alEl.style.display = 'none';
    txEl.style.display = 'none';
    gaEl.style.display = 'none';
    azEl.style.display = 'none';
    nvEl.style.display = 'none';
    utEl.style.display = 'flex';
    az2El.style.display = 'none';
    caEl.style.display = 'none';
    ca2El.style.display = 'none';
    ca3El.style.display = 'none';
    orEl.style.display = 'none';
    waEl.style.display = 'none';
    return true;
  }  else if(a === states[9]){
    laEl.style.display = 'none';
    flEl.style.display = 'none';
    msEl.style.display = 'none';
    alEl.style.display = 'none';
    txEl.style.display = 'none';
    gaEl.style.display = 'none';
    azEl.style.display = 'none';
    nvEl.style.display = 'none';
    utEl.style.display = 'none';
    az2El.style.display = 'none';
    caEl.style.display = 'flex';
    ca2El.style.display = 'flex';
    ca3El.style.display = 'flex';
    orEl.style.display = 'flex';
    waEl.style.display = 'none';
    return true;
  }  else if(a === states[10]){
    laEl.style.display = 'none';
    flEl.style.display = 'none';
    msEl.style.display = 'none';
    alEl.style.display = 'none';
    txEl.style.display = 'none';
    gaEl.style.display = 'none';
    azEl.style.display = 'none';
    nvEl.style.display = 'none';
    utEl.style.display = 'none';
    az2El.style.display = 'none';
    caEl.style.display = 'none';
    ca2El.style.display = 'none';
    ca3El.style.display = 'none';
    orEl.style.display = 'flex';
    waEl.style.display = 'none';
    return true;
  }  else if(a === states[11]){
    laEl.style.display = 'none';
    flEl.style.display = 'none';
    msEl.style.display = 'none';
    alEl.style.display = 'none';
    txEl.style.display = 'none';
    gaEl.style.display = 'none';
    azEl.style.display = 'none';
    nvEl.style.display = 'none';
    utEl.style.display = 'none';
    az2El.style.display = 'none';
    caEl.style.display = 'none';
    ca2El.style.display = 'none';
    ca3El.style.display = 'none';
    orEl.style.display = 'none';
    waEl.style.display = 'flex';
    return true;
  }else if(a !== states){
    alert("Please use two letter state input, try again.")
    return false;
  }
}
init();
