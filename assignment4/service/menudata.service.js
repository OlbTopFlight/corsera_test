// menudata.service.js
(function () {
    angular.module('data')
        .service('MenuDataService', MenuDataService);

    MenuDataService.$inject = ['$http'];
    function MenuDataService($http) {
        var service = this;
        var response = response;


        service.getAllCategories = function () {
            return $http({
                method: 'GET',
                url: 'https://coursera-jhu-default-rtdb.firebaseio.com/categories.json'
                .then(function(response){
                    console.log(response.data);
                    return response.data;
                })
            });
        };

        service.getItemsForCategory = function (categoryShortName) {
            return $http({
                method: 'GET',
                url: 'https://coursera-jhu-default-rtdb.firebaseio.com/menu_items/' + categoryShortName + '.json'
                .then(function(response){
                    console.log(response.data);
                    return response.data; 
                })   
            });
        };
    }
})();
