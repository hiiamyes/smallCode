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
    var mapOptions = {
        center: new google.maps.LatLng(position.coords.latitude, position.coords.longitude),
        zoom: 12,
        mapTypeId: google.maps.MapTypeId.ROADMAP
    };
    var map = new google.maps.Map(document.getElementById("map_canvas"), mapOptions);

    var marker = new google.maps.Marker({
        position: new google.maps.LatLng(position.coords.latitude, position.coords.longitude),
        map: map,
        title: 'Here I am'
    });

    var infoWindow = new google.maps.InfoWindow({
        content: 'I\'m a info window'
    });

    google.maps.event.addListener(marker, 'mouseover', function() {
        infoWindow.open(map, marker);
    });

    google.maps.event.addListener(marker,'mouseout', function(){
        infoWindow.close();
    });
}