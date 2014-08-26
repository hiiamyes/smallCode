(function(){

 var app = angular.module('comic_reader', []);

 app.controller('ComicController', ['$scope', '$http', function($scope, $http){

	 $scope.getComic = function(){
	 $http({
		headers: {'Access-Control-Allow-Origin':'*'},
		method: 'GET',
		url: $scope.url
	}).
	 success(function(data, status, headers, config) {
console.log('success');		 
}).
	 error(function(data, status, headers, config) {
console.log(headers);
console.log('fail');		 
});
	 };

	 }]);
})();
