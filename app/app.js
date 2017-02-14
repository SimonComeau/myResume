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
    $stateProvider.state("messages", {
        url: "/contact/messages",
        templateUrl: "/app/contact/messageList.html",
        controller: "contactController",
        menuItem: true,
        requiresAuthentication: true
    });
    $stateProvider.state("messageDetails", {
        templateUrl: "/app/contact/messageDetails.html",
        controller: "contactController",
        requiresAuthentication: true
    });
    $stateProvider.state("login", {
        url: "/login",
        templateUrl: "/app/login/login.html",
        controller: "loginController",
        menuItem: true
    })
}]);
mymodule.controller("appController", function ($scope) {
    $scope.currentNavItem = 'home';
});
angular.element(() => angular.bootstrap(document, ["simon"]));