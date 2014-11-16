app.controller('MainCtrl',  ["$scope", "PostMessageService", function($scope, PostMessageService) {
	$scope.testString = "Hello! by angular iframe extension";
	$scope.testList = ["apple", "banana", "tomato", 1221321, 2321321321313, 1.231213];
	$scope.index = 0;
	$scope.click = function() {
		$scope.index += 1;
	}

	PostMessageService.init("myport");

	PostMessageService.action("exampleService", {username: "marco-p", psw: "1234"})
	.done(function(data){
		console.log("SUCCESS service response ", data)
	},
	function(data){
		console.log("ERROR service response ", data)
	});

	PostMessageService.action("exampleService", {username: "simone-p", psw: "1234"})
	.done(function(data){
		console.log("ksadpasdsa ", data)
	},
	function(data){
		console.log("ioasjdoasj ", data)
	});


	PostMessageService.action("exampleService", {username: "beppe-p", psw: "1234"})
	.done(function(data){
		console.log("----------> ", data)
	},
	function(data){
		console.log("---------> ", data)
	});
}]);