(function() {
    var app = angular.module('gps_editor', []);

    app.controller('GPSEditorController', ['$scope',
        function($scope) {

            var photo = {};
            var geocoder = new google.maps.Geocoder();
            var map;

            photo.url = 'img/photo.jpg';
            photo.lat = 1;
            photo.lng = 1;

            $scope.photo = photo;

            // $scope.initGoogleMap = function() {
            //     console.log('init google map');
            //     if (navigator.geolocation) {
            //         navigator.geolocation.getCurrentPosition(setGoogleMap, function(err) {
            //             console.log('getCurrentPosition err:' + err);
            //         });
            //     } else {
            //         console.log('geolocation api err');
            //     }
            // }

            $scope.setGoogleMap = function() {
                console.log('set google map');
                // var currentLatLng = new google.maps.LatLng(position.coords.latitude, position.coords.longitude);
                var mapOptions = {
                    center: new google.maps.LatLng(23.787701, 120.959473),
                    zoom: 7,
                    mapTypeId: google.maps.MapTypeId.ROADMAP
                };
                map = new google.maps.Map(document.getElementById("map_canvas"), mapOptions);

                var marker = new google.maps.Marker({
                    position: new google.maps.LatLng(23.787701, 120.959473),
                    map: map,
                    title: 'I\'m a marker'
                });

                google.maps.event.addListener(map, 'click', function(event) {
                    $scope.$apply(function() {
                        photo.lat = event.latLng.lat();
                        photo.lng = event.latLng.lng();
                        marker.setPosition(new google.maps.LatLng(event.latLng.lat(), event.latLng.lng()))
                    });
                });
            }
            $scope.setGoogleMap();

            $scope.geocode = function() {
                if ($scope.address) {
                    geocoder.geocode({
                        'address': $scope.address
                    }, function(results, status) {
                        if (status == google.maps.GeocoderStatus.OK) {
                            map.setCenter(results[0].geometry.location);                            
                        } else {
                            alert('Geocode was not successful for the following reason: ' + status);
                        }
                    });
                }
            }
        }
    ])
})();