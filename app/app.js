let mymodule = angular.module("simon", ["ui.router", "ui.bootstrap", "ngMaterial", "ngAnimate", "ngAria"]);
mymodule.config(["$stateProvider", "$locationProvider", "$httpProvider", function ($stateProvider, $locationProvider, $httpProvider) {
    $httpProvider.defaults.useXDomain = true;
    $locationProvider.html5Mode(true);
    $stateProvider.state("home", {
        url: "/",
        templateUrl: "/app/home/home.html",
        controller: "homeController",
        menuItem: true
    });
    $stateProvider.state("portfolio", {
        url: "/portfolio",
        templateUrl: "/app/portfolio/portfolio.html",
        controller: "portfolioController",
        // menuItem:true
    });
    $stateProvider.state("contact", {
        url: "/contact",
        templateUrl: "/app/contact/contact.html",
        controller: "contactController",
        menuItem: true
    });
}]);
mymodule.controller("appController", function ($scope) {
    $scope.currentNavItem = 'home';
});
angular.element(() => angular.bootstrap(document, ["simon"]));