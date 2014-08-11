function init() {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(setGoogleMap, function(err) {
            console.log('getCurrentPosition err:' + err);
        });
    } else {
        console.log('geolocation api err');
    }
}

function setGoogleMap(position) {

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

    var infoWindow = new google.maps.InfoWindow({
        content: 'I\'m a info window<br><img src="img/photo.jpg" width=300>'
    });

    google.maps.event.addListener(marker, 'mouseover', function() {
        infoWindow.open(map, marker);
    });

    google.maps.event.addListener(marker, 'mouseout', function() {
        infoWindow.close();
    });


    // add a circle
    new google.maps.Circle({
        strokeColor: '#3A62FF',
        strokeOpacity: 0.5,
        strokeWeight: 5,
        fillColor: '#3A62FF',
        fillOpacity: 0,
        map: map,
        center: currentLatLng,
        radius: 1000
    });

    // 
    google.maps.event.addListener(map, 'click', function(event) {
        alert(event.latLng.lat() + '\n' + event.latLng.lng());
    });

}