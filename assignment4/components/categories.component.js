// categories.component.js
(function () {
    angular.module('MenuApp')
        .component('categories', {
            templateUrl: 'categories/categories.template.html',
            bindings: {
                categories: '<'
            }
        });
})();
