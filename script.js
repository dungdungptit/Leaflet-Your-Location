// var map = L.map("map").setView([21.081506, 105.675511], 15);
var map = L.map('map', {
    center: [21.081506, 105.675511],
    zoom: 15,
    preferCanvas: true,
    zoomControl: true,
    doubleClickZoom: true,
});


// map.stopLocate();

var tiles = L.tileLayer(
    "https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token=pk.eyJ1IjoibWFwYm94IiwiYSI6ImNpejY4NXVycTA2emYycXBndHRqcmZ3N3gifQ.rJcFIG214AriISLbB6B5aw",
    {
        maxZoom: 18,
        attribution:
            'Map data &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, ' +
            'Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
        id: "mapbox/satellite-v9",
        id: 'mapbox/streets-v11',
        tileSize: 512,
        zoomOffset: -1,
        accessToken: 'your.mapbox.access.token'
    }
).addTo(map);


// var marker = L.marker([21.081506, 105.675511]).addTo(map);
// marker.bindPopup("<b>Hello world!</b><br>I am a popup.").openPopup();


var circle = L.circle([21.081506, 105.675511], {
    color: 'red',
    fillColor: '#f03',
    fillOpacity: 0.5,
    radius: 500
}).addTo(map);
circle.bindPopup("I am a circle.");

var polygon = L.polygon([
    [21.08168, 105.675],
    [21.08432, 105.678],
    [21.08143, 105.682]
]).addTo(map);
polygon.bindPopup("I am a polygon.");


var popup = L.popup();

var marker;


function onMapClick(e) {
    // popup
    //     .setLatLng(e.latlng)
    //     .setContent("You clicked the map at " + e.latlng.toString())
    //     .openOn(map);
    if (!marker) {
        marker = L.marker(e.latlng).addTo(map);
        marker.bindPopup("<b>Your location</b>.").openPopup();

    } else {
        marker.setLatLng(e.latlng);
        marker.bindPopup("<b>Your location</b>.").openPopup();
    }
}

map.on('click', onMapClick);


var Locate = document.getElementById('gps');

Locate.onclick = function () {
    map.locate({ setView: true, maxZoom: 16 });
    navigator.geolocation.getCurrentPosition(function (location) {
        var latlng = new L.LatLng(location.coords.latitude, location.coords.longitude);
        if(!marker)
            marker = L.marker(latlng).addTo(map);
        else
            marker.setLatLng(latlng);
    });
};







