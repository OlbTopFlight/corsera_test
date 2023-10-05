(function () {
   // 'use strict';

    angular.module('NarrowItDownApp', [])
        .controller('NarrowItDownController', NarrowItDownController)
        .service('MenuSearchService', MenuSearchService)
        .directive('foundItems', FoundItemsDirective);

    NarrowItDownController.$inject = ['MenuSearchService'];
    function NarrowItDownController(MenuSearchService) {
        var menu = this;
        menu.searchTerm = ''; 
        menu.found = [];

        menu.narrowItDown = function () {
            /*if (menu.searchTerm.trim() === '') {

                menu.found = [];
            } else {
                */
                MenuSearchService.getMatchedMenuItems(menu.searchTerm)
                    .then(function (foundItems) {
                        menu.found = foundItems;
                    });
          //  }
        };

        menu.removeItem = function (index) {
            menu.found.splice(index, 1);
        };
    }

    MenuSearchService.$inject = ['$http'];
    function MenuSearchService($http) {
        var service = this;

        service.getMatchedMenuItems = function (searchTerm) {
            return $http({
                method: 'GET',
                url: 'https://coursera-jhu-default-rtdb.firebaseio.com/menu_items.json'
            }).then(function (response) {
                var foundItems = [];
                var menuItems = response.data;

                for (var i = 0; i < menuItems.length; i++) {
                    var menuItem = menuItems[i];
                    if (menuItem.description.toLowerCase().includes(searchTerm.toLowerCase())) {
                        foundItems.push(menuItem);
                    }
                }
                return foundItems;
            });
        };
    }

    function FoundItemsDirective() {
        var ddo = {
            restrict: 'AE',
            templateUrl: 'foundItems.html',
            scope: {
                foundItems: '<',
              //foundItems: '=',
                onRemove: '&'
            }
        };

        return ddo;
    }

})();