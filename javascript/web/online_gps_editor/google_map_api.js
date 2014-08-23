function initGoogleMap() {
    console.log('init google map');
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(setGoogleMap, function(err) {
            console.log('getCurrentPosition err:' + err);
        });
    } else {
        console.log('geolocation api err');
    }
}

function setGoogleMap(position) {
    console.log('set google map');
    var currentLatLng = new google.maps.LatLng(position.coords.latitude, position.coords.longitude);

    var mapOptions = {
        center: new google.maps.LatLng(position.coords.latitude, position.coords.longitude),
        zoom: 12,
        mapTypeId: google.maps.MapTypeId.ROADMAP
    };
    var map = new google.maps.Map(document.getElementById("map_canvas"), mapOptions);

    var marker = new google.maps.Marker({
        position: currentLatLng,
        map: map,
        title: 'I\'m a marker'
    });

    google.maps.event.addListener(map, 'click', function(event) {
        marker.setPosition(new google.maps.LatLng(event.latLng.lat(), event.latLng.lng()))
    });

}