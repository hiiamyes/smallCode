
var cp = require('child_process');

cp.exec('exiftool photo.jpg', function(err, stdout, stderr) {
  console.log(stdout);
});