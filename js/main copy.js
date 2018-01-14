
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


var map;
var infowindow;


var Main =  function(){
/* Creates Map */

    var latlng = {lat: 47.6410663, lng: -122.6881319};
    var mapOptions = {
        center: latlng,
        zoom: 10
    };
    map = new google.maps.Map(document.getElementById('map'), mapOptions);
    infowindow = new google.maps.InfoWindow();
    for (var i = 0; i < places.length; i++) {
      this.ltln = places[i][1] + "," + places[i][2];
      this.client_id = "&client_id=QF1NFRPXGG5WABAHQMTFQLZBXY3UTUIGU3AOAL0UP1X5VCOO"
      this.client_secret = "&client_secret=EUFMT3BWBSYYSSL5U52JLKWBVEJWZNY5CZXCB3RQAFRMEZV3";
      this.venueAPI = "https://api.foursquare.com/v2/venues/search?ll="+ltln+"&v=20140715"+client_id+client_secret;
      this.currentNum;
      this.currentURL;
      this.currentDescription;
      $.getJSON(venueAPI, function(data) { //foursquare request
                  //  console.log(data);
                    currentURL = data.response.venues[0].url;
                    currentNum = data.response.venues[0].contact.formattedPhone;
                    currentDescription = data.response.venues[0].location.address;
      });
      this.marker = new google.maps.Marker({
          position:{lat: newPlace[1], lng: newPlace[2]},
          map: map
      });
      marker.addListener('click', function() {
         marker.setAnimation(google.maps.Animation.DROP);
         infowindow.setContent('<h3 class = "infoTitle"> '+newPlace[0]+'</h3>'+ '<div id="names">'+ currentNum+ '</div>' +'<div>'+currentURL+'</div>'+'<div>'+currentDescription+'</div>');
         infowindow.open(map, this);
      });
    }
  /*  if(locations.visible === true) {
  			this.marker.setMap(map);
  		} else {
  			this.marker.setMap(null);
  		}
  		return true;*/
};


/* Sortable Lists */
$(function() {

var viewModel = {
    query: ko.observable(''),

    newLocation: function (value)
    {
      var index = value.index;
      map.panTo(new google.maps.LatLng(places[index][1], places[index][2]));
      $('.searchable').click(function(e) {
        google.maps.event.trigger(places[index],'click');
      });
    }
};

viewModel.locations = ko.dependentObservable(function() {
    var search = this.query().toLowerCase();

    return ko.utils.arrayFilter(locations, function(location) {
        var index = location.name.toLowerCase().indexOf(search) >= 0;
        //location[index].visible = false;
      //  showVisible();
        return index;
    });
}, viewModel);

ko.applyBindings(viewModel);
});
