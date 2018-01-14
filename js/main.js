function openNav() {
    document.getElementById("mySidenav").style.width = "250px";
    document.body.style.backgroundColor = "rgba(0,0,0,0.4)";
}

function closeNav() {
    document.getElementById("mySidenav").style.width = "0";
    document.body.style.backgroundColor = "white";
}

var places = [
  ['Scenic Beach State Park', 47.649061, -122.845790, 5],
  ['Kitsap Memorial State Park', 47.817918, -122.650993, 4],
  ['Illahee State Park', 47.595597, -122.596520, 3],
  ['Blake Island Marine State Park', 47.538398, -122.492881, 2],
  ['Dosewallips State Park', 47.688125, -122.904649, 1]
];

var map;
var infowindow;

function initMap() {
    var latlng = {lat: 47.6410663, lng: -122.6881319};
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

function addMarkers(newPlace) {
  var ltln = newPlace[1] + "," + newPlace[2];
  var client_id = "&client_id=QF1NFRPXGG5WABAHQMTFQLZBXY3UTUIGU3AOAL0UP1X5VCOO"
  var client_secret = "&client_secret=EUFMT3BWBSYYSSL5U52JLKWBVEJWZNY5CZXCB3RQAFRMEZV3";
  var venueAPI = "https://api.foursquare.com/v2/venues/search?ll="+ltln+"&v=20140715"+client_id+client_secret;
  var currentNum, currentURL, currentDescription;
  $.getJSON(venueAPI, function(data) {
                console.log(data);
                currentURL = data.response.venues[0].url;
                currentNum = data.response.venues[0].contact.formattedPhone;
                currentDescription = data.response.venues[0].location.address;
  });
    var marker = new google.maps.Marker({
        position:{lat: newPlace[1], lng: newPlace[2]},
        map: map
    });
    marker.addListener('click', function() {
       marker.setAnimation(google.maps.Animation.DROP);
       infowindow.setContent('<h3 class = "infoTitle"> '+newPlace[0]+'</h3>'+ '<div id="names">'+ currentNum+ '</div>' +'<div>'+currentURL+'</div>'+'<div>'+currentDescription+'</div>');
       infowindow.open(map, this);
    });
}

var locations = [
  {
  name: "Scenic Beach State Park",
  index: 0},
{
  name: "Kitsap Memorial State Park",
  index: 1},
{
  name: "Illahee State Park",
  index: 2},
{
  name: "Blake Island Marine State Park",
  index: 3},
{
  name: "Dosewallips State Park",
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
