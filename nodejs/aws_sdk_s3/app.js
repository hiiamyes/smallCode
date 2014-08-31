var aws = require('aws-sdk');
var readline = require('readline');
var fs = require('fs');

var rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

aws.config.loadFromPath('config.json');

var s3 = new aws.S3();

rl.question('action:', function(answer) {
    switch (answer) {
        case '1':
            createBucket();
            break;
        case '2':
            deleteBucket();
            break;
        case '3':
            uploadPhoto();
            break;
        case '4':
            listPhoto();
            break;
        case '5':
            deletePhoto();
            break;
		case '6':
			savePhoto();
			break;
    }
});

function createBucket() {
    s3.createBucket({
        Bucket: 'hiiamyestestbbb'
    }, function(err, data) {
        if (err) {
            console.log(err);
        } else {
            console.log('bucket created');
        }
    });
}

function deleteBucket() {
    var params = {
        Bucket: 'hiiamyestestbbb'
    };
    s3.deleteBucket(params, function(err, data) {
        if (err) {
            console.log(err);
        } else {
            console.log('bucket deleted');
        }
    });
}

function uploadPhoto() {
    fs.readFile('photo.JPG', function(err, data) {
        var params = {
            Bucket: 'hiiamyestestbbb',
            Key: 'photo1',
            Body: data,
            ContentType: 'image/jpeg'
        };
        s3.putObject(params, function(err, data) {
            if (err) {
                console.log('err' + err);
            } else {
                console.log('success' + data);
            }
        });
    });
}

function listPhoto() {
    var params = {
        Bucket: 'hiiamyestestbbb'
    };
    s3.listObjects(params, function(err, data) {
        if (err) {
            console.log('err' + err);
        } else {
            console.log(data);
        }
    });
}

function deletePhoto() {
    var params = {
        Bucket: 'hiiamyestestbbb',
        Key: 'photo1'
    };
    s3.deleteObject(params, function(err, data) {
        if (err) {
            console.log('err' + err);
        } else {
            console.log(data);
        }
    });
}

function savePhoto(){
	var params = {
		Bucket: 'hiiamyestestbbb',
		Key: 'photo1'
	}
	s3.getObject(params, function(err, data){
		if(err){
			console.log('err'+err);
		}else{
			console.log(data);
			fs.writeFile('savePhoto.jpg', data.Body, function(err){
				if(err) throw err;
				console.log('saved');
			});
		}		
	});
}







