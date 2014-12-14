var testApp = angular.module('testApp',['ngRoute']);

testApp.config(function($routeProvider){
	$routeProvider
	.when('/secretpage' ,{
	templateUrl: "templates/secretpage.html",
	resolve:{
		"check":function(accessFac,$location){   //function to be resolved, accessFac and $location Injected
			if(accessFac.checkPermission()){    //check if the user has permission -- This happens before the page loads
				
			}else{
				$location.path('/');				//redirect user to home if it does not have permission.
				alert("You don't have access here");
			}
		}
	}
	})
	
	.when('/commonpage' ,{
	templateUrl: "templates/commonpage.html"
	})

	.when('/' ,{
	templateUrl: "templates/home.html"
	});
});


testApp.factory('accessFac',function(){
	var obj = {}
	this.access = false;
	obj.getPermission = function(){    //set the permission to true
		this.access = true;
	}
	obj.checkPermission = function(){
		return this.access;				//returns the users permission level 
	}
	return obj;
});

testApp.controller('testCtrl',function($scope,accessFac){
	$scope.getAccess = function(){
		accessFac.getPermission();       //call the method in acccessFac to allow the user permission.
	}
})