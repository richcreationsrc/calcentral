(function(angular) {
  'use strict';

  /**
   * Campus controller
   */
  angular.module('calcentral.controllers').controller('CampusController', function($routeParams, $scope, apiService, campusLinksFactory) {

    campusLinksFactory.getLinks($routeParams.category).then(function(data) {
      //copying all data into $scope variable
      angular.extend($scope, data);

      if (data.currentTopCategory) {
         // Set the page title
        var title = 'Campus - ' + data.currentTopCategory;
        apiService.util.setTitle(title);
      }
    });


  });

 /* function ContactController($scope) {
    $scope.contacts = ["hi@email.com", "hello@email.com"];

    $scope.add = function() {
      $scope.contacts.push($scope.newcontact);
      $scope.newcontact = "";
      }
  };
  */

  /**var myApp = angular.module('calcentral.controllers');

  myApp.controller('CampusController', function($routeParams, $scope, apiService, campusLinksFactory) {

    campusLinksFactory.getLinks($routeParams.category).then(function(data) {
      //copying all data into $scope variable
      angular.extend($scope, data);

      if (data.currentTopCategory) {
         // Set the page title
        var title = 'Campus - ' + data.currentTopCategory;
        apiService.util.setTitle(title);
      }
    });

  function Ctrl($scope) {
    $scope.name = 'Whirled';
  };



*/


})(window.angular);
