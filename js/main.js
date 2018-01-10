function openNav() {
    document.getElementById("mySidenav").style.width = "250px";
    document.getElementById("main").style.marginLeft = "250px";
    document.body.style.backgroundColor = "rgba(0,0,0,0.4)";
}

function closeNav() {
    document.getElementById("mySidenav").style.width = "0";
    document.getElementById("main").style.marginLeft = "0";
    document.body.style.backgroundColor = "white";
}

// Data for the markers consisting of a name, a LatLng and a zIndex for the
// order in which these markers should display on top of each other.
var places = [
  ['Fort Lewis', 47.1261838830712, -122.50854491937491, 5],
  ['NAS Whidbey Island', 48.34709388383968, -122.66647338617179, 4],
  ['Bangor Base', 47.72035804907695, -122.70973205316398, 3],
  ['Keyport Base', 47.697255902139425, -122.62184142816398, 2],
  ['Naval Base Kitsap', 47.56028140643856, -122.64587402093741, 1]
];


var map;
var infowindow;

function initMap() {
    var latlng = {lat: 47.6410663, lng: -122.6881319};
    var mapOptions = {
        center: latlng,
        zoom: 8
    };
    map = new google.maps.Map(document.getElementById('map'), mapOptions);
    infowindow = new google.maps.InfoWindow();
    for (var i = 0; i < places.length; i++) {
        addMarkers(places[i]);
    }
}

function addMarkers(newPlace) {
    var marker = new google.maps.Marker({
        position:{lat: newPlace[1], lng: newPlace[2]},
        map: map
    });
    marker.addListener('click', function() {
       infowindow.setContent(newPlace[0]);
       infowindow.open(map, this);
    });
}

var locations = [
  {
  name: "Fort Lewis",
  index: 0},
{
  name: "NAS Whidbey Island",
  index: 3},
{
  name: "Bangor Base",
  index: 1},
{
  name: "Keyport Base",
  index: 2},
{
  name: "Naval Base Kitsap",
  index: 4}
];
/* Sortable Lists */
$(function() {

var viewModel = {
    query: ko.observable(''),

    newLocation: function (index)
    {
      console.log(index);
      currentMarker = new google.maps.Marker({
          position:{lat: places[1][1], lng: places[1][2]},
          map: map
      });
      map.setCenter(new google.maps.LatLng(places[1][1], places[1][2]));
      currentMarker.addListener('center_changed', function() {
         infowindow.open(map, this);
      });
    }
};

viewModel.locations = ko.dependentObservable(function() {
    var search = this.query().toLowerCase();
    return ko.utils.arrayFilter(locations, function(location) {
        return location.name.toLowerCase().indexOf(search) >= 0;
    });
}, viewModel);

ko.applyBindings(viewModel);
});
