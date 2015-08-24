angular.module('starter.controllers', ['ionic', 'firebase'])

.controller('MapCtrl', ['$scope', '$firebase', '$ionicPopup', function($scope,$firebase, $ionicPopup){
	$scope.user = {};
	$scope.saveDetails = function(){
		var lat  = $scope.user.latitude;
		var lgt  = $scope.user.longitude;
		var des  = $scope.user.desc;
		// Code to write to firebase
		var firebaseObj = new Firebase("https://postman.firebaseio.com/MapDetails");
		var fb = $firebase(firebaseObj);

		// writing data to the firebase
		fb.$push({
		    latitude: lat,
		    longitude: lgt,
		    description: des
		}).then(function(ref) {
		    $scope.user = {};
		    $scope.showAlert();
		}, function(error) {
		    console.log("Error:", error);
		});
		$scope.showAlert = function(){
			$ionicPopup	= 'iMapApp',
			template = 'Your location has been saved!'
		};

	};
}])

.directive('map', function() {
    return {
        restrict: 'A',
        link:function(scope, element, attrs){
          // init variable for google maps
          var zValue = scope.$eval(attrs.zoom);
          var lat = scope.$eval(attrs.lat);
          var lng = scope.$eval(attrs.lng);

          // Google maps configuration
          var myLatlng = new google.maps.LatLng(lat,lng);
          var mapOptions = {
                zoom: zValue,
                center: myLatlng
            };
          var map = new google.maps.Map(element[0],mapOptions);
          var marker = new google.maps.Marker({
			    position: myLatlng,
			    map: map,
			    draggable:true
			  });
		google.maps.event.addListener(marker, 'dragend', function(evt){
				scope.$parent.user.latitude = evt.latLng.lat();
			    scope.$parent.user.longitude = evt.latLng.lng();
			    scope.$apply();
		        console.log('Current Latitude:',evt.latLng.lat(),'Current Longitude:',evt.latLng.lng());
		});


        }
    }; 
});