
/* SideNav */
function openNav() {
    document.getElementById("mySidenav").style.width = "250px";
    document.body.style.backgroundColor = "rgba(0,0,0,0.4)";
}

function closeNav() {
    document.getElementById("mySidenav").style.width = "0";
    document.body.style.backgroundColor = "white";
}

/* Names and Locations */
var places = [
  ['Scenic Beach State Park', 47.649061, -122.845790, 5],
  ['Kitsap Memorial State Park', 47.817918, -122.650993, 4],
  ['Illahee State Park', 47.595597, -122.596520, 3],
  ['Blake Island Marine State Park', 47.538398, -122.492881, 2],
  ['Dosewallips State Park', 47.688125, -122.904649, 1]
];

var map;
var infowindow;
var markers = [];

/* Creates Initial Map */
function initMap() {
    var latlng = {lat: 47.6410663, lng: -122.6881319};
    var mapOptions = {
        center: latlng,
        zoom: 10
    };
    map = new google.maps.Map(document.getElementById('map'), mapOptions);
    infowindow = new google.maps.InfoWindow();
    for (var i = 0; i < places.length; i++) {
        addMarkers(places[i]); //loops over all markers
    }
}
/* Adds Markers and InfoWindow content */
function addMarkers(newPlace) {
    var ltln = newPlace[1] + "," + newPlace[2];
    var client_id = "&client_id=QF1NFRPXGG5WABAHQMTFQLZBXY3UTUIGU3AOAL0UP1X5VCOO";
    var client_secret = "&client_secret=EUFMT3BWBSYYSSL5U52JLKWBVEJWZNY5CZXCB3RQAFRMEZV3";
    var venueAPI = "https://api.foursquare.com/v2/venues/search?ll="+ltln+"&v=20140715"+client_id+client_secret;
    var currentNum, currentURL, currentDescription;
    $.getJSON(venueAPI, function(data) { //foursquare request
                //  console.log(data);
                  currentURL = data.response.venues[0].url || 'No URL Found';
                  currentNum = data.response.venues[0].contact.formattedPhone || 'No Phone Number Found';
                  currentDescription = data.response.venues[0].location.address || 'No Address Found';
    }).fail(function() { //If foursquare fails
                alert(
                    "Foursquare has had an issue loading, please try refreshing the page"
                );
    });
    var marker = new google.maps.Marker({ //content of marker
        position:{lat: newPlace[1], lng: newPlace[2]},
        map: map
    });
    marker.addListener('click', function() {
       marker.setAnimation(google.maps.Animation.DROP);
       infowindow.setContent('<h3 class = "infoTitle"> '+newPlace[0]+'</h3>'+ '<div id="names">'+ currentNum+ '</div>' +'<div>'+currentURL+'</div>'+'<div>'+currentDescription+'</div>');
       infowindow.open(map, this);
    });
    markers.push(marker); //creates an array of all created markers
}
$(function() {

/* Searchable Array */
var locations = [
  {
  name: "Scenic Beach State Park",
  index: 0,
  visible: true},
{
  name: "Kitsap Memorial State Park",
  index: 1,
  visible: true},
{
  name: "Illahee State Park",
  index: 2,
  visible: true},
{
  name: "Blake Island Marine State Park",
  index: 3,
  visible: true},
{
  name: "Dosewallips State Park",
  index: 4,
  visible: true}
];

/* Sortable Lists */
var viewModel = {
    query: ko.observable(''),

    //changes location based on click
    newLocation: function (value)
    {
      var index = value.index;
      map.panTo(new google.maps.LatLng(places[index][1], places[index][2]));
      google.maps.event.trigger(markers[index],'click'); //opens infowindow
    },

    removeMarker: function(){ //adds and removes markers based on search
      for (var i = 0; i < locations.length; i++){
        if(locations[i].visible === true) {
            markers[i].setMap(map); //add
        } else {
            markers[i].setMap(null); //remove
        }
      }
    }
};

viewModel.locations = ko.dependentObservable(function() {
    var search = this.query().toLowerCase();
    if (!search) { //if not search entered
        locations.forEach(function(location){
            location.visible = true; //set everything to true
        });
        return locations;
    } else {
        return ko.utils.arrayFilter(locations, function(location) {
            var string = location.name.toLowerCase();
            var result = (string.search(search) >= 0); //false if query does not match locations
            location.visible = result; //sets true or false to all locations
            viewModel.removeMarker();
            return result;
        });
    }
}, viewModel);
ko.applyBindings(viewModel);
});

function googleError(){
  alert("Google Maps has had an issue loading, please try refreshing the page");
}
