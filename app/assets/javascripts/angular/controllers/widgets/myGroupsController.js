(function(angular) {
  'use strict';

  /**
   * My Groups controller
   */
  angular.module('calcentral.controllers').controller('MyGroupsController', function($http, $routeParams, $scope, apiService) {

    var getMyGroups = function() {
      $http.get('/api/my/groups').success(function(data) {

        //when load up live data, call feedLoaded function to check and add data to $scope object
        apiService.updatedFeeds.feedLoaded(data);
        angular.extend($scope, data);
      });
    };

    $scope.$on('calcentral.api.updatedFeeds.updateServices', function(event, services) {
      if (services && services['MyGroups::Merged']) {
        getMyGroups();
      }
    });
    getMyGroups();
  });

})(window.angular);
