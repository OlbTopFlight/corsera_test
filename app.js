(function () {
  'use strict';

  angular.module('LunchCheck', [])
      .controller('LunchCheckController', LunchCheckController);

  LunchCheckController.$inject = ['$scope'];

  function LunchCheckController($scope) {
      $scope.message = '';

      $scope.checkLunch = function () {
          // Split the comma-separated items and remove empty items
          var items = $scope.lunchItems ? $scope.lunchItems.split(',').filter(item => item.trim() !== '') : [];

          if (items.length === 0) {
              $scope.message = 'Please enter data first';
          } else if (items.length <= 3) {
              $scope.message = 'Enjoy!';
          } else {
              $scope.message = 'Too much!';
          }
      };
  }
})();
