(function () {
    'use strict';

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
            console.log(menu.searchTerm);
           if (menu.searchTerm.trim() === '') {
                //console.log("menu.searchTerm");
                menu.found = [];
            } else {
                
                console.log(menu.searchTerm);
                MenuSearchService.getMatchedMenuItems(menu.searchTerm)
                    .then(function (foundItems) {
                        menu.found = foundItems;
                        //console.log(menu.serchTerm);
                    });
        };
    }
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
                console.log(menuItems);

                for (var i = 0; i < menuItems.length; i++) {

                    for(var j = 0; j <menuItems.length; j++){
                        var menuItem = menuItems[i];
                        //console.log(menuItems[i]);
                        //if (menuItem.description.toLowerCase().includes(searchTerm.toLowerCase())) {
                          //  foundItems.push(menuItem);
                            //console.log(foundItems);
                        //}
                    }
                }
                
                return foundItems;
            });
        };
    }

    function FoundItemsDirective() {
        var ddo = {
            restrict: 'A',
            templateUrl: 'foundItems.html',
            scope: {
                foundItems: '<',
                myTitle: '@title',
                onRemove: '&'
            }
        };

        return ddo;
    }
    
})();