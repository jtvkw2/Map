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
  ['Bondi Beach', -33.890542, 151.274856, 4],
  ['Coogee Beach', -33.923036, 151.259052, 5],
  ['Cronulla Beach', -34.028249, 151.157507, 3],
  ['Manly Beach', -33.80010128657071, 151.28747820854187, 2],
  ['Maroubra Beach', -33.950198, 151.259302, 1]
];


var map;
var infowindow;

function initMap() {
    var latlng = {lat: -33.890, lng: 151.274};
    var mapOptions = {
        center: latlng,
        zoom: 10
    };
    map = new google.maps.Map(document.getElementById('map'), mapOptions);
    infowindow = new google.maps.InfoWindow();
    for (var i = 0; i < places.length; i++) {
        addMarkers(places[i]);
    }
}

function addMarkers(place) {
    var marker = new google.maps.Marker({
        position:{lat: place[1], lng: place[2]},
        map: map
    });
    marker.addListener('click', function() {
       infowindow.setContent(place[0]);
       infowindow.open(map, this);
    });
}

var locations = [
  {
  name: "Bondi Beach",
  index: 0},
{
  name: "Coogee Beach",
  index: 1},
{
  name: "Cronulla Beach",
  index: 2},
{
  name: 'Manly Beach',
  index: 3},
{
  name: 'Maroubra Beach',
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
