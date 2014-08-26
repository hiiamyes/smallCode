(function() {
    var app = angular.module('gps_editor', []);

    app.controller('GPSEditorController', ['$scope', '$http',
        function($scope, $http) {

            var photo = {};
            $scope.photo = photo;

            var geocoder = new google.maps.Geocoder();
            var map;

            photo.url = 'img/photo.jpg';

            $http({
                method: 'GET',
                url: '/api/gps'
            }).success(function(data, status, headers, config) {

                var mapOptions = {
                    center: (data !== {}) ? new google.maps.LatLng(data.lat, data.lng) : new google.maps.LatLng(23.787701, 120.959473),
                    zoom: 7,
                    mapTypeId: google.maps.MapTypeId.ROADMAP
                };
                map = new google.maps.Map(document.getElementById("map_canvas"), mapOptions);

                if (data !== {}) {
                    photo.lat = data.lat;
                    photo.lng = data.lng;
                    var marker = new google.maps.Marker({
                        position: new google.maps.LatLng(photo.lat, photo.lng),
                        map: map,
                        title: 'I\'m a marker'
                    });
                };

                google.maps.event.addListener(map, 'click', function(event) {
                    $scope.$apply(function() {
                        photo.lat = event.latLng.lat();
                        photo.lng = event.latLng.lng();
                        marker.setPosition(new google.maps.LatLng(event.latLng.lat(), event.latLng.lng()))
                        $http.post('/api/gps', photo)
                            .success(function(status) {
                                console.log(status);
                            })
                            .error(function(status) {
                                console.log('err')
                            });
                    });
                });

            }).error(function(data, status, headers, config) {
                console.log('err');
            });


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