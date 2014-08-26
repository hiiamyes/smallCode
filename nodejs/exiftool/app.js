var cp = require('child_process');
var readline = require('readline');

var rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

rl.question('What action?\n\
	1:show keywords\n\
	2:show geo\n\
	3:add keyword\n\
	4:remove keyword\n', function(answer) {
    switch (answer) {
        case '1':
            cp.exec('exiftool -keywords photo.jpg', function(err, stdout, stderr) {
                console.log(stdout);
            });
            break;
        case '2':
            cp.exec('exiftool -GPSPosition photo.jpg', function(err, stdout, stderr) {
                console.log(stdout);
            });
            break;
        case '3':
            rl.question('keywords:', function(keyword) {
                cp.exec('exiftool -keywords+=' + keyword + ' photo.jpg', function(err, stdout, stderr) {
                    console.log(stdout);
                });
            });
            break;
        case '4':

            break;
    }
    rl.close();
});