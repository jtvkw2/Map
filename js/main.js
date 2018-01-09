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
var beaches = [
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
    for (var i = 0; i < beaches.length; i++) {
        addMarkers(beaches[i]);
    }
}

function addMarkers(beach) {
    var marker = new google.maps.Marker({
        position:{lat: beach[1], lng: beach[2]},
        map: map
    });
    marker.addListener('click', function() {
       infowindow.setContent(beach[0]);
       infowindow.open(map, this);
    });
}
