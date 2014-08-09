function init() {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(setGoogleMap, function(err){
			console.log('getCurrentPosition err:' + err);
		});
    }else{
		console.log('geolocation api err');
	}
}

function setGoogleMap(position) {
    var mapOptions = {
        center: new google.maps.LatLng(position.coords.latitude, position.coords.longitude),
        zoom: 12,
        mapTypeId: google.maps.MapTypeId.ROADMAP
    };
    var map = new google.maps.Map(document.getElementById("map_canvas"), mapOptions);

    // To add the marker to the map, use the 'map' property
    var myLatlng = new google.maps.LatLng(25.023779,121.549301);
    var marker = new google.maps.Marker({
        position: myLatlng,
        map: map,
        title: "Hello World!"
    });
}
