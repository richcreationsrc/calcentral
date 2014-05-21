(function(angular) {
  'use strict';

  /**
   * Campus controller
   */
  angular.module('calcentral.controllers').controller('cal1cardBalanceController', function($routeParams, $scope, apiService, campusLinksFactory) {

/**    campusLinksFactory.getLinks($routeParams.category).then(function(data) {
      //copying all data into $scope variable
      angular.extend($scope, data);

      if (data.currentTopCategory) {
         // Set the page title
        var title = 'Campus - ' + data.currentTopCategory;
        apiService.util.setTitle(title);
      }
    });**/

    $scope.totalValue = 10;
    $scope.errmsg = "You have no more meal points to donate!";

    $scope.addMealPoints = function(totalValue) {
      //console.log("DOES IT GET HERE??");
      $scope.totalValue = $scope.totalValue + 10;
      return $scope.totalValue;
    };

    $scope.donateMealPoints = function(totalValue) {
      if(totalValue <= 0) {
        return alert($scope.errmsg);
      }

      else {
        $scope.totalValue = $scope.totalValue - 10;
        return $scope.totalValue;
      }
    };
  });
})(window.angular);
