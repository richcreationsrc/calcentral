(function(angular) {
  'use strict';

  /**
   * Campus controller
   */
  angular.module('calcentral.controllers').controller('locationsMenuController', function($scope, $http) {

    var loadLocations = function() {
      $http.get('/dummy/json/locations.json').success(function(data) {
        angular.extend($scope, data);
      });
    };

    loadLocations();
  });
})(window.angular);
