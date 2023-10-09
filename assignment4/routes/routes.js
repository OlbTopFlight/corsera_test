// routes.js
(function () {
    angular.module('MenuApp')
        .config(RoutesConfig);

    RoutesConfig.$inject = ['$stateProvider', '$urlRouterProvider'];
    function RoutesConfig($stateProvider, $urlRouterProvider) {
        $urlRouterProvider.otherwise('/');

        $stateProvider
            .state('home', {
                url: '/',
                template: '<h1>Welcome to our Restaurant</h1>'
            })
            .state('categories', {
                url: '/categories',
                template: '<h1> cat</h1>'
                //template: '<categories categories="categories"></categories>',
                //resolve: {
                 //   categories: ['MenuDataService', function (MenuDataService) {
                  //      return MenuDataService.getAllCategories()
                   //         .then(function (response) {
                    //            return response.data;
                    //        });
                   // }]
              //  }
            })
            .state('items', {
                url: '/items',
               // url: '/items/{categoryShortName}',
                template: "<h2> item</h2>"
                //    template: '<items items="items"></items>',
            //    resolve: {
            //        items: ['$stateParams', 'MenuDataService', function ($stateParams, MenuDataService) {
            //            return MenuDataService.getItemsForCategory($stateParams.categoryShortName)
             //               .then(function (response) {
              //                  return response.data.menu_items;
               //             });
              //      }]
             //   }
            });
    }
})();
