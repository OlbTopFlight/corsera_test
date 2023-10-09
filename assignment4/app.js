angular.module('MenuApp', ['ui.router'])
    .config(Config);

Config.$inject = ['$stateProvider', '$urlRouterProvider'];
function Config($stateProvider, $urlRouterProvider) {
    // Configure the default route (if no other route matches)
    $urlRouterProvider.otherwise('/');

    // Configure your states
    $stateProvider
        .state('home', {
            url: '/',
            template: '<h1>Welcome to our Restaurant</h1>'
        })
        .state('categories', {
            url: '/categories',
            component: 'categories',
            resolve: {
                // Define resolves for data that needs to be fetched before the state is activated
                categoriesData: ['MenuDataService', function (MenuDataService) {
                    return MenuDataService.getAllCategories()
                        .then(function (response) {
                            return response.data;
                        });
                }]
            }
        })
        .state('items', {
            url: '/items/{categoryShortName}',
            component: 'items',
            resolve: {
                // Define resolves for data that needs to be fetched before the state is activated
                itemsData: ['$stateParams', 'MenuDataService', function ($stateParams, MenuDataService) {
                    return MenuDataService.getItemsForCategory($stateParams.categoryShortName)
                        .then(function (response) {
                            return response.data.menu_items;
                        });
                }]
            }
        });
}
