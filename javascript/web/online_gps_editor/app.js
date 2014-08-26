var express = require('express')
var app = express()
var cp = require('child_process');
var bodyParser = require('body-parser');

// configure app to use bodyParser()
// this will let us get the data from a POST
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

//
app.use(express.static(__dirname));

app.get('/', function(req, res) {
    res.sendFile(__dirname + '/index.html');
});

app.get('/api/gps', function(req, res) {
    cp.exec('exiftool -GPSPosition img/photo.jpg', function(err, stdout, stderr) {
        var stdout_splited = stdout.split(' ');
        var lat =
            parseFloat(stdout_splited[22]) +
            parseFloat(stdout_splited[24].split('\'')[0] / 60) +
            parseFloat(stdout_splited[25].split('\"')[0] / 3600);
        var lng =
            parseFloat(stdout_splited[27]) +
            parseFloat(stdout_splited[29].split('\'')[0] / 60) +
            parseFloat(stdout_splited[30].split('\"')[0] / 3600);
        console.log(lat);
        console.log(lng);
        res.send({
            'lat': lat,
            'lng': lng
        });
    });
});

app.post('/api/gps', function(req,res){
	console.log(req.body);
});

var port = 3000;
app.listen(port, function() {
    console.log("Listening on " + port);
});