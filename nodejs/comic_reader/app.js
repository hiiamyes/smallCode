var http = require('http');

//var jsdom = require('jsdom');

http.get('http://comic.sfacg.com/HTML/YingHun/505/', function(res){
	console.log('statusCode: ' + res.statusCode);
	res.on('data', function(chunk){
		var chunkString = chunk.toString();
		var index = chunkString.indexOf('curPic');
console.log(chunk.toString());
//		console.log(chunkString.split('curPic')[0]);
//		console.log(chunkString.split('curPic')[1]);
	});
}).on('error', function(e){
	console.log('error: '+e.message);
});

