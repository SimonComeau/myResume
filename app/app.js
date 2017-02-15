let mymodule = angular.module("simon", ["ui.router", "ui.bootstrap", "ngMaterial", "ngAnimate", "ngAria"]);
mymodule.config(["$locationProvider", "$httpProvider", function ($locationProvider, $httpProvider) {
    $httpProvider.defaults.useXDomain = true;
    $locationProvider.html5Mode(true);
}]);
mymodule.controller("appController", function ($scope) {
    $scope.currentNavItem = 'home';
});
angular.element(() => angular.bootstrap(document, ["simon"]));