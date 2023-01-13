//Get API Keys for Maps and Weather
// read API data for WX and Map and display on each card based on location

// create getThisWeather() to pull weather data
//create displayWeather() to display weather on the card
//create function and call function with console log at the minimum
//ideally link function to the card

//create getThisMap() to pull map data
//create displayMap() to display map data
//create function and call function with console log at the minimum
//ideally link function to the card

console.log("pikachu")

let map;
let map2;

function initMap() {
    map = new google.maps.Map(document.getElementById("map1"), {
    center: { lat: 35.46708705310899, lng: -83.92043416136879 },
    zoom: 8,
  });
  new google.maps.Marker({
    position: { lat: 35.46708705310899, lng: -83.92043416136879 },
    map: map,
    label:"A",
    title: "Tail of the Dragon",
  })
    map2 = new google.maps.Map(document.getElementById("map2"), {
    center: { lat: 34.74042959585908, lng: -83.93676926931562 },
    zoom: 8,
  }); 
  new google.maps.Marker({
    position: { lat: 34.74042959585908, lng: -83.93676926931562 },
    map: map2,
    label:"A",
    title: "Blood Mountain",
  })
}
