// author: yes
// 1. Use Picasa first to set geolocation for photos.
// 2. Use this file to read geolocation info in the exif.

var readline = require('readline');
var gm = require('gm');
var imageMagick = gm.subClass({
    imageMagick: true
});

var rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

rl.question("photo name? ", function(photo_name) {

    imageMagick(photo_name).identify(
        '%[EXIF:GPSLatitude];%[EXIF:GPSlongitude]',
        function(err, data) {
            if (err) {

                console.log(err);

            } else {

                console.log("EXIF's GPSlongitude & GPSLatitude: %s", data);

                var latlngDMS = data.split(';');
                var latDMS = latlngDMS[0].split(',');
                var lngDMS = latlngDMS[1].split(',');

                var latDD =
                    exifGPSStr2Num(latDMS[0]) +
                    exifGPSStr2Num(latDMS[1]) / 60 +
                    exifGPSStr2Num(latDMS[2]) / 3600;
                var lngDD =
                    exifGPSStr2Num(lngDMS[0]) +
                    exifGPSStr2Num(lngDMS[1]) / 60 +
                    exifGPSStr2Num(lngDMS[2]) / 3600;
                console.log('latDD: ' + latDD);
                console.log('lngDD: ' + lngDD);
            }
            rl.close();
        });
});

function exifGPSStr2Num(str) {
    numerator = str.split('/')[0];
    denominator = str.split('/')[1];
    return numerator / denominator;
}