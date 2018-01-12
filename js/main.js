function openNav() {
    document.getElementById("mySidenav").style.width = "250px";
    //document.getElementById("main").style.marginLeft = "250px";
    document.body.style.backgroundColor = "rgba(0,0,0,0.4)";
}

function closeNav() {
    document.getElementById("mySidenav").style.width = "0";
  //  document.getElementById("main").style.marginLeft = "0";
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
       marker.setAnimation(google.maps.Animation.DROP);
       infowindow.setContent('<h3 class = "infoTitle"> '+newPlace[0]+'</h3>'+ '<div id="names">'+content+
       '</div>');
       infowindow.open(map, this);
    });
}




var locations = [
  {
  name: "Fort Lewis",
  index: 0},
{
  name: "NAS Whidbey Island",
  index: 1},
{
  name: "Bangor Base",
  index: 2},
{
  name: "Keyport Base",
  index: 3},
{
  name: "Naval Base Kitsap",
  index: 4}
];
/* Sortable Lists */
$(function() {

var viewModel = {
    query: ko.observable(''),

    newLocation: function (placeHolder)
    {
      var index = placeHolder.index;
      console.log(index);
      map.setCenter(new google.maps.LatLng(places[index][1], places[index][2]));
      //currentMarker[index].setMap(null);
      setTimeout(marker.setAnimation(google.maps.Animation.DROP), 3000);
      marker.addListener('click', function() {
         infowindow.open(map, this);
      });
    }

//});
};

viewModel.locations = ko.dependentObservable(function() {
    var search = this.query().toLowerCase();
    return ko.utils.arrayFilter(locations, function(location) {
        return location.name.toLowerCase().indexOf(search) >= 0;
    });
}, viewModel);

ko.applyBindings(viewModel);
});
/*

const request = require('request');

request({
  url: 'https://api.foursquare.com/search?ll=47.126,-122.5085',
  method: 'GET',
  qs: {
    client_id: 'QF1NFRPXGG5WABAHQMTFQLZBXY3UTUIGU3AOAL0UP1X5VCOO',
    client_secret: 'CEUFMT3BWBSYYSSL5U52JLKWBVEJWZNY5CZXCB3RQAFRMEZV3',
    //ll: newPlace[1] , newPlace[2],
    name: this.name,
    v: this.v,
    url: this.url
  }
}, function(err, res, body) {
    if (err) {
      console.error(err);
    } else {
      console.log(body);
    }
});
*/
