(function(angular) {
  'use strict';

  /**
   * Campus controller
   */
  angular.module('calcentral.controllers').controller('locationsMenuController', function($routeParams, $scope, $http) {

    $scope.loadLocations = function() {
      $http.get('/dummy/json/locations.json').success(function(data) {
        angular.extend($scope, data);
      });

      $scope.value = 'closest'; //set a default value for dropdown when page first loads
      $scope.showHide = true; //this will allow the initial message to show; once set to false, it will disappear
    };

    $scope.updateSelectedLocations = function(value, locations) {
      $scope.showHide = false;
      $scope.selectedLocations = [];

      for (var i = 0; i < value; i++) {
        $scope.selectedLocations.push(locations[i]);
      }

      return $scope.selectedLocations;
    };
$scope.loadLocations();
  });
})(window.angular);
