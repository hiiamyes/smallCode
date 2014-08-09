
// author: yes

var fs = require('fs');
var path = require('path');
var gm = require('gm').subClass({
    imageMagick: true
});
var sqlite3 = require('sqlite3').verbose();

var db = new sqlite3.Database('app.sqlite');
db.run("create table if not exists photo (_id integer primary key, date text, keyword text, latitude text, longitude text)");

fs.readdir('img/', function(err, files) {
    if (err) {
        console.log('fs err: ' + err);
    } else {    	
        for (var i = 0; i < files.length; i++) {        	
            if (path.extname(files[i]).toUpperCase() == '.JPG') {
                gm('img/' + files[i]).identify(
                    '%[EXIF:DateTimeOriginal]*%[IPTC:2:25]*%[EXIF:GPSLatitude]*%[EXIF:GPSlongitude]',
                    function(err, data) {
                        if (err) {
                            console.log('gm err:' + err);
                        } else {
                            var datas = data.split('*');
                            var date = datas[0];
                            // var keyword = datas[1].split(';');
                            var keyword = datas[1];
                            var latitude = exifLatLngDMSStringToDDInt(datas[2]);
                            var longitude = exifLatLngDMSStringToDDInt(datas[3]);

                            db.run('insert into photo (date,keyword,latitude,longitude) values (?,?,?,?)', date, keyword, latitude, longitude);
                        }
                    });
            }
        }
    }
});

function exifLatLngDMSStringToDDInt(LatLngDMSString) {
    var DMS = LatLngDMSString.split(',');
    var D = DMS[0].split('/');
    var M = DMS[1].split('/');
    var S = DMS[2].split('/');
    return D[0] / D[1] + M[0] / M[1] / 60 + S[0] / S[1] / 3600;
}